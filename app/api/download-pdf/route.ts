// I:\New folder-Splits\app\api\download-pdf\route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  // Basic validation for UUID format
  if (!id || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    return new NextResponse("Invalid PDF identifier format.", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "temp", `${id}.pdf`);

  try {
    // Check if file exists before attempting to read
    await fs.access(filePath); 
    const fileBuffer = await fs.readFile(filePath);

    // It's generally better to clean up after the file has been successfully sent,
    // but in a serverless function, the lifecycle might be tricky.
    // For now, keeping it here. Consider a scheduled cleanup if files persist.
    await fs.unlink(filePath).catch(err => console.error(`Failed to delete temp file: ${filePath}`, err));
    
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="trip-plan.pdf"`);
    headers.set('Content-Length', fileBuffer.byteLength.toString()); // Important for proper download

    return new NextResponse(fileBuffer, { status: 200, headers });

  } catch (error) {
    console.error(`PDF download error for ID ${id}:`, error);
    // Return 404 if the file isn't found
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        return new NextResponse("PDF not found.", { status: 404 });
    }
    return new NextResponse("An error occurred while trying to download the PDF.", { status: 500 });
  }
}