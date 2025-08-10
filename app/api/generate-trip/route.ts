import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// Remove fs import as we won't be writing to disk
// import { promises as fs } from "fs";
// import path from "path";
import { v4 as uuidv4 } from "uuid";
import connectDB from '@/lib/mongodb';
import Trip from "@/models/Trip";
import User from "@/models/User";
import { TripPlan, ITripDocument, ApiResponse } from "@/lib/types"; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const body = await req.json();
    const {
      prompt,
      startDate,
      endDate,
      members,
      startLocation,
      endLocation,
      tripType,
      budget,
      customBudgetAmount,
    } = body;

    if (!prompt || !startDate || !endDate || !members || !startLocation || !endLocation || !tripType || !budget) {
      return NextResponse.json({ error: "Missing required trip details." }, { status: 400 });
    }

    // Add budget information to the prompt
    let budgetInfo = "";
    if (budget === "low") {
      budgetInfo = "This is a low budget trip. Please suggest economical options.";
    } else if (budget === "medium") {
      budgetInfo = "This is a medium budget trip. Please suggest moderately priced options.";
    } else if (budget === "high") {
      budgetInfo = "This is a high budget trip. Please suggest premium options.";
    } else if (budget === "custom") {
      budgetInfo = `This trip has a custom budget of Rs. ${customBudgetAmount}. Please suggest options within this budget.`;
    }

    const detailedPrompt = `
      Please act as an expert trip planner. Generate a detailed trip plan based on the following user request.
      User request: "${prompt}"
      Trip Details:
      - Start Location: ${startLocation}
      - Destination: ${endLocation}
      - Start Date: ${startDate}
      - End Date: ${endDate}
      - Number of People: ${members}
      - Trip Type: ${tripType}
      - Budget: ${budgetInfo}

      Your response MUST be a valid JSON object. Return EXACTLY 10 items for each category: placesToVisit, hotelsOnTheWay, restaurantsOnTheWay, fuelStopsOnTheWay. Do not include any text before or after the JSON object.
      The JSON object must follow this exact structure:
      {
        "tripTitle": "A creative and catchy title for the trip, like 'An Adventurous 5-Day Journey from Mumbai to Goa'",
        "placesToVisit": [
          {
            "name": "Name of the tourist place",
            "description": "A brief, engaging description (2-3 sentences).",
            "link": "A valid Google Maps URL for the location."
          }
        ],
        "hotelsOnTheWay": [
          {
            "name": "Hotel Name",
            "location": "City or specific address",
            "price": "Estimated price per night in INR, e.g., 'Rs. 4500/night'."
          }
        ],
        "restaurantsOnTheWay": [
          {
            "name": "Restaurant Name",
            "location": "City or specific address, mention if it's known for a specific cuisine."
          }
        ],
        "fuelStopsOnTheWay": [
          {
            "name": "Fuel Pump Name (e.g., 'Indian Oil')",
            "location": "General location, like 'On NH48 near Kolhapur'."
          }
        ],
        "estimatedCost": "A total estimated cost for the trip in INR for ${members} people, including travel, food, and accommodation. Provide it as a string, like 'Rs. 50,000 - Rs. 60,000'."
      }

      IMPORTANT: DO NOT include any photoUrl fields in the response. Do not include any image URLs.
    `;

    const result = await model.generateContent(detailedPrompt);
    const responseText = result.response.text();
    
    let tripPlan: TripPlan;
    try {
        const jsonMatch = responseText.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        let rawJsonString = responseText;

        if (jsonMatch && jsonMatch[1]) {
            rawJsonString = jsonMatch[1];
        } else {
            const firstBrace = responseText.indexOf('{');
            const lastBrace = responseText.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                rawJsonString = responseText.substring(firstBrace, lastBrace + 1);
            }
        }
        
        const cleanedJsonString = rawJsonString.trim();

        console.log("Attempting to parse JSON:\n", cleanedJsonString);
        
        tripPlan = JSON.parse(cleanedJsonString);

        if (tripPlan.estimatedCost) {
            tripPlan.estimatedCost = tripPlan.estimatedCost.replace(/₹/g, 'Rs. ');
        }
        tripPlan.hotelsOnTheWay = tripPlan.hotelsOnTheWay.map(hotel => ({
            ...hotel,
            price: hotel.price.replace(/₹/g, 'Rs. ')
        }));

        // Remove any photoUrl fields if they exist
        if (tripPlan.placesToVisit) {
          tripPlan.placesToVisit = tripPlan.placesToVisit.map(place => {
            const { photoUrl, ...rest } = place;
            return rest;
          });
        }

    } catch (parseError) {
        console.error("Failed to parse Gemini response:", parseError);
        console.error("Raw response from Gemini:", responseText);
        return NextResponse.json({ error: "Failed to parse trip plan from AI response. The AI may have returned an invalid format. Check server logs for raw response." }, { status: 500 });
    }

    // Generate PDF in memory instead of writing to disk
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let y = height - 50;

    const drawText = (text: string, fontType: any, size: number, x: number, currentY: number, maxWidth = width - 100) => {
        const lines = [];
        let currentLine = '';
        const words = text.split(' ');
        for (const word of words) {
            const testLine = currentLine === '' ? word : currentLine + ' ' + word;
            const textWidth = fontType.widthOfTextAtSize(testLine, size);
            if (textWidth < maxWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        for (const line of lines) {
            page.drawText(line, { x, y: currentY, font: fontType, size, color: rgb(0, 0, 0) });
            currentY -= (size + 5);
        }
        return currentY;
    };

    y = drawText(tripPlan.tripTitle, boldFont, 24, 50, y);
    y -= 20;

    y = drawText("Places to Visit", boldFont, 18, 50, y);
    y -= 10;
    for (const place of tripPlan.placesToVisit) {
        y = drawText(`- ${place.name}: ${place.description}`, font, 12, 60, y);
        y = drawText(`  Link: ${place.link}`, font, 10, 60, y);
        y -= 10;
        if (y < 100) {
            page = pdfDoc.addPage();
            y = height - 50;
        }
    }
    y -= 15;

    y = drawText("Recommended Hotels", boldFont, 18, 50, y);
    y -= 10;
    for (const hotel of tripPlan.hotelsOnTheWay) {
        y = drawText(`- ${hotel.name} (${hotel.location}) - ${hotel.price}`, font, 12, 60, y);
        y -= 10;
        if (y < 100) {
            page = pdfDoc.addPage();
            y = height - 50;
        }
    }
    y -= 15;

    y = drawText("Top Restaurants", boldFont, 18, 50, y);
    y -= 10;
    for (const restaurant of tripPlan.restaurantsOnTheWay) {
        y = drawText(`- ${restaurant.name} (${restaurant.location})`, font, 12, 60, y);
        y -= 10;
        if (y < 100) {
            page = pdfDoc.addPage();
            y = height - 50;
        }
    }
    y -= 15;

    y = drawText("Fuel Stops", boldFont, 18, 50, y);
    y -= 10;
    for (const fuelStop of tripPlan.fuelStopsOnTheWay) {
        y = drawText(`- ${fuelStop.name} - ${fuelStop.location}`, font, 12, 60, y);
        y -= 10;
        if (y < 100) {
            page = pdfDoc.addPage();
            y = height - 50;
        }
    }
    y -= 15;

    y = drawText("Estimated Cost", boldFont, 18, 50, y);
    y -= 10;
    y = drawText(tripPlan.estimatedCost, font, 12, 60, y);

    const pdfBytes = await pdfDoc.save();
    
    // Generate a unique ID for the PDF
    const pdfId = uuidv4();
    // Create a URL for the PDF (this will be stored in the database)
    const pdfUrl = `/api/trips/${pdfId}/pdf`;

    // Save the trip with the PDF URL and budget information
    const newTrip = new Trip({
        ...tripPlan,
        budget,
        customBudgetAmount: budget === 'custom' ? customBudgetAmount : undefined,
        createdBy: user._id, 
        pdfUrl: pdfUrl,
        pdfData: Buffer.from(pdfBytes), // Convert Uint8Array to Buffer
    });
    
    await newTrip.save();

    return NextResponse.json({
        tripPlan: tripPlan,
        pdfId: pdfId,
        pdfUrl: pdfUrl,
        _id: newTrip._id.toString(),
        createdBy: newTrip.createdBy.toString(), 
        createdAt: newTrip.createdAt.toISOString(), 
        updatedAt: newTrip.updatedAt.toISOString(), 
    } as ApiResponse); 

  } catch (error) {
    console.error("Error in generate-trip API:", error);
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message || "An internal server error occurred." }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}