// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import {
//   Plus,
//   Users,
//   Receipt,
//   TrendingUp,
//   DollarSign,
//   Map,
// } from "lucide-react";
// import { formatCurrency } from "@/lib/utils";
// import LoadingSpinner from "@/components/loading-spinner";
// import Navbar from "@/components/navbar";
// import { toast } from "sonner";
// import Link from "next/link";
// import CreateGroupDialog from "@/components/create-group-dialog";
// import AddMemberDialog from "@/components/add-member-dialog";
// import AddExpenseDialog from "@/components/add-expense-dialog";
// import AiTripPlanner from "@/components/ai-trip-planner";
// import { AiTripPlannerButton } from "@/components/animated-login-button";

// interface DashboardStats {
//   totalGroups: number;
//   totalExpenses: number;
//   totalOwed: number;
//   totalOwing: number;
//   expenseCount: number;
//   recentExpenses?: Expense[];
// }

// interface Group {
//   _id: string;
//   name: string;
//   description?: string;
//   members: {
//     user: {
//       _id: string;
//       name: string;
//       email: string;
//       image?: string;
//     };
//     amount: number;
//     joinedAt: string;
//   }[];
//   memberCount?: number;
//   totalExpenses: number;
//   createdAt: string;
//   expenses?: Expense[];
// }

// interface Expense {
//   _id: string;
//   description: string;
//   amount: number;
//   paidBy: {
//     _id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
//   group: string;
//   createdAt: string;
// }

// export default function Dashboard() {
//   console.log("this is dashboard page");
//   const { data: session, status } = useSession();
//   const [stats, setStats] = useState<DashboardStats>({
//     totalGroups: 0,
//     totalExpenses: 0,
//     totalOwed: 0,
//     totalOwing: 0,
//     expenseCount: 0,
//   });
//   const [groups, setGroups] = useState<Group[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showCreateGroup, setShowCreateGroup] = useState(false);
//   const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [showAddExpense, setShowAddExpense] = useState(false);
//   const [showAiTripPlanner, setShowAiTripPlanner] = useState(false);

//   useEffect(() => {
//     if (status === "loading" || isLoading) {
//       setIsLoading(true);
//     } else if (status === "authenticated") {
//       fetchDashboardData();
//     }
//   }, [status]);

//   const fetchDashboardData = async () => {
//     try {
//       const [statsResponse, groupsResponse] = await Promise.all([
//         fetch("/api/dashboard/stats"),
//         fetch("/api/groups"),
//       ]);

//       if (statsResponse.ok) {
//         const statsData = await statsResponse.json();
//         setStats(statsData);
//       }

//       if (groupsResponse.ok) {
//         const groupsData = await groupsResponse.json();

//         // For each group, fetch the latest expenses
//         const groupsWithExpenses = await Promise.all(
//           groupsData.map(async (group: Group) => {
//             try {
//               const expensesResponse = await fetch(
//                 `/api/groups/${group._id}/expenses`
//               );
//               if (expensesResponse.ok) {
//                 const expensesData = await expensesResponse.json();
//                 // Add the latest 3 expenses to each group
//                 return {
//                   ...group,
//                   expenses: expensesData.slice(0, 3),
//                 };
//               }
//               return group;
//             } catch (error) {
//               console.error(
//                 `Error fetching expenses for group ${group._id}:`,
//                 error
//               );
//               return group;
//             }
//           })
//         );

//         setGroups(groupsWithExpenses);
//       } else {
//         const errorData = await groupsResponse.json();
//         console.error("Groups API error:", errorData);
//         toast.error("Failed to load groups");
//       }
//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (status === "loading" || isLoading) {
//     return <LoadingSpinner size="w-24 h-24" />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <Navbar />

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               Welcome back, {session?.user?.name}!
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 w-[100%]">
//               Here's an overview of your expenses and groups.
//             </p>
//           </div>
//           <AiTripPlannerButton
//             onClick={() => setShowAiTripPlanner(!showAiTripPlanner)}
//           />
//         </div>

//         {showAiTripPlanner && (
//           <Card className="mb-8 border-2 border-primary/20 shadow-lg">
//             <CardContent className="p-0">
//               <AiTripPlanner />
//             </CardContent>
//           </Card>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <Card className="border-none shadow-lg">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Total Groups
//               </CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalGroups}</div>
//             </CardContent>
//           </Card>

//           <Card className="border-none shadow-lg">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Total Expenses
//               </CardTitle>
//               <Receipt className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {formatCurrency(stats.totalExpenses)}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-none shadow-lg">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-green-600">
//                 You're Owed
//               </CardTitle>
//               <TrendingUp className="h-4 w-4 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">
//                 {formatCurrency(stats.totalOwed)}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-none shadow-lg">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-red-600">
//                 You Owe
//               </CardTitle>
//               <DollarSign className="h-4 w-4 text-red-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-red-600">
//                 {formatCurrency(stats.totalOwing)}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Groups Section */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Your Groups
//           </h2>
//           <Button onClick={() => setShowCreateGroup(true)}>
//             <Plus className="h-4 w-4 mr-2" />
//             Create Group
//           </Button>
//         </div>

//         {!isLoading && groups.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {groups.map((group, index) => {
//               const isLatest = index === 0;

//               return (
//                 <Link
//                   href={`/group/${group._id}`}
//                   key={group._id}
//                   className="block transition-transform hover:scale-[1.01]"
//                 >
//                   <Card
//                     className={`relative w-full min-h-[220px] p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col items-center text-center ${
//                       isLatest ? "ring-2 ring-purple-500" : ""
//                     }`}
//                   >
//                     {/* New Group Badge */}
//                     {isLatest && (
//                       <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full z-10">
//                         New group
//                       </span>
//                     )}

//                     <CardHeader className="items-center p-0">
//                       <CardTitle className="text-xl sm:text-2xl mb-1">
//                         {group.name}
//                       </CardTitle>
//                       <CardDescription className="text-base text-muted-foreground">
//                         {group.description || "No description"}
//                       </CardDescription>
//                     </CardHeader>

//                     <CardContent className="space-y-2 pt-4">
//                       <div className="text-base font-medium">
//                         Members: {group.memberCount || group.members.length}
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         {group.members && group.members.length > 0 ? (
//                           group.members.map((member, idx) => {
//                             return (
//                               <div
//                                 key={idx}
//                                 className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
//                               >
//                                 {member.user && member.user.name ? (
//                                   <>
//                                     <div className="flex items-center gap-2">
//                                       <Avatar className="h-6 w-6">
//                                         <AvatarImage src={member.user.image} />
//                                         <AvatarFallback>
//                                           {member.user.name.charAt(0)}
//                                         </AvatarFallback>
//                                       </Avatar>
//                                       <span className="font-medium text-gray-700 dark:text-gray-200">
//                                         {member.user.name}
//                                       </span>
//                                     </div>
//                                     <span className="text-gray-500 dark:text-gray-400 font-medium">
//                                       ₹{(member.amount || 0).toFixed(2)}
//                                     </span>
//                                   </>
//                                 ) : (
//                                   <span className="text-gray-400 italic w-full text-center">
//                                     Member info unavailable
//                                   </span>
//                                 )}
//                               </div>
//                             );
//                           })
//                         ) : (
//                           <div className="text-gray-500 italic text-sm text-center py-2">
//                             No members added yet.
//                           </div>
//                         )}
//                       </div>
//                       <div className="text-base font-medium">
//                         Total Expenses: {formatCurrency(group.totalExpenses)}
//                       </div>

//                       {/* Recent Expenses */}
//                       {group.expenses && group.expenses.length > 0 ? (
//                         <div className="mt-2">
//                           <h4 className="text-sm font-semibold mb-1">
//                             Recent Expenses:
//                           </h4>
//                           <div className="space-y-1">
//                             {group.expenses.map((expense) => (
//                               <div
//                                 key={expense._id}
//                                 className="flex justify-between items-center text-sm py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <Avatar className="h-5 w-5">
//                                     <AvatarImage src={expense.paidBy?.image} />
//                                     <AvatarFallback>
//                                       {expense.paidBy?.name?.charAt(0) || "?"}
//                                     </AvatarFallback>
//                                   </Avatar>
//                                   <span className="text-gray-700 dark:text-gray-200 truncate max-w-[100px]">
//                                     {expense.description || "Expense"}
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-col items-end">
//                                   <span className="font-medium">
//                                     {formatCurrency(expense.amount)}
//                                   </span>
//                                   <span className="text-xs text-gray-500">
//                                     {new Date(
//                                       expense.createdAt
//                                     ).toLocaleDateString()}
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-sm text-gray-500 italic mt-2">
//                           No recent expenses
//                         </div>
//                       )}

//                       <div className="text-sm text-muted-foreground">
//                         Created:{" "}
//                         {new Date(group.createdAt).toLocaleDateString()}
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
//                         <Button
//                           className="w-full"
//                           variant="default"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setSelectedGroupId(group._id);
//                             setShowAddExpense(true);
//                           }}
//                         >
//                           Add Expenses
//                         </Button>
//                         <Button
//                           className="w-full"
//                           variant="outline"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setSelectedGroupId(group._id);
//                             setShowAddMember(true);
//                           }}
//                         >
//                           Add Members
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               );
//             })}
//           </div>
//         ) : !isLoading && groups.length === 0 ? (
//           <Card className="border-none shadow-lg">
//             <CardContent className="flex flex-col items-center justify-center py-16">
//               <Users className="h-16 w-16 text-muted-foreground mb-4" />
//               <h3 className="text-xl font-semibold mb-2">No groups yet</h3>
//               <p className="text-muted-foreground text-center mb-6">
//                 Create your first group to start splitting expenses with friends
//                 and family.
//               </p>
//               <Button onClick={() => setShowCreateGroup(true)}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Create Your First Group
//               </Button>
//             </CardContent>
//           </Card>
//         ) : null}

//         <CreateGroupDialog
//           open={showCreateGroup}
//           onOpenChange={setShowCreateGroup}
//           onGroupCreated={fetchDashboardData}
//         />

//         {selectedGroupId && (
//           <>
//             <AddMemberDialog
//               open={showAddMember}
//               onOpenChange={(open) => {
//                 setShowAddMember(open);
//                 if (!open) setSelectedGroupId(null); // clear on close
//               }}
//               groupId={selectedGroupId}
//               onMemberAdded={fetchDashboardData}
//             />

//             <AddExpenseDialog
//               open={showAddExpense}
//               onOpenChange={(open) => {
//                 setShowAddExpense(open);
//                 if (!open) setSelectedGroupId(null); // clear on close
//               }}
//               groupId={selectedGroupId}
//               onExpenseAdded={fetchDashboardData}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Users,
  Receipt,
  TrendingUp,
  DollarSign,
} from "lucide-react"; // Removed Map as it's not used directly here
import { formatCurrency } from "@/lib/utils";
import LoadingSpinner from "@/components/loading-spinner";
import Navbar from "@/components/navbar";
import { toast } from "sonner";
import Link from "next/link";
import CreateGroupDialog from "@/components/create-group-dialog";
import AddMemberDialog from "@/components/add-member-dialog";
import AddExpenseDialog from "@/components/add-expense-dialog";
// import AiTripPlanner from "@/components/ai-trip-planner"; // Ensure this component exists and is correctly implemented
import { AiTripPlannerButton } from "@/components/animated-login-button"; // Ensure this component exists
import AiTripPlanner from "@/components/ai-trip-planner";

// --- Interfaces for better type safety ---
interface DashboardStats {
  totalGroups: number;
  totalExpenses: number;
  totalOwed: number;
  totalOwing: number;
  expenseCount: number;
  recentExpenses?: Expense[]; // Unused in this file, but good for type safety
}

interface Group {
  _id: string;
  name: string;
  description?: string;
  members: {
    user: {
      _id: string;
      name: string;
      email: string;
      image?: string;
    };
    amount: number;
    joinedAt: string;
  }[];
  memberCount?: number; // Optional as it can be derived from members.length
  totalExpenses: number;
  createdAt: string;
  expenses?: Expense[]; // Recent expenses for the group
}

interface Expense {
  _id: string;
  description: string;
  amount: number;
  paidBy: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  group: string;
  createdAt: string;
}

// --- Main Dashboard Component ---
export default function Dashboard() {
  console.log("this is dashboard page"); // Keep for initial debugging if needed
  const { data: session, status } = useSession(); // NextAuth.js session hook

  // State for dashboard data
  const [stats, setStats] = useState<DashboardStats>({
    totalGroups: 0,
    totalExpenses: 0,
    totalOwed: 0,
    totalOwing: 0,
    expenseCount: 0,
  });
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Manages loading state for the entire dashboard

  // State for dialogs
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAiTripPlanner, setShowAiTripPlanner] = useState(false);
 

  // --- Fetch data on component mount or session status change ---
  useEffect(() => {
    // Only attempt to fetch data if not already loading and session is authenticated
    if (status === "loading") {
      setIsLoading(true); // Keep loading state true while session is loading
    } else if (status === "authenticated") {
      fetchDashboardData(); // Fetch data once authenticated
    } else if (status === "unauthenticated") {
      // Handle unauthenticated state, e.g., redirect to login
      setIsLoading(false); // Stop loading if unauthenticated (and no redirect configured)
      // You might want to add a redirect here if not already handled by middleware or NextAuth.js
      // useRouter().push("/auth/signin");
    }
  }, [status]); // Re-run when session status changes

  // --- Data fetching function ---
  const fetchDashboardData = async () => {
    setIsLoading(true); // Start loading before fetching
    try {
      // Fetch stats and groups concurrently
      const [statsResponse, groupsResponse] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/groups"),
      ]);

      // Handle stats response
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      } else {
        const errorData = await statsResponse.json();
        console.error("Dashboard stats API error:", errorData);
        toast.error(`Failed to load dashboard stats: ${errorData.message || ''}`);
      }

      // Handle groups response
      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();

        // Fetch expenses for each group concurrently using Promise.all
        const groupsWithExpenses = await Promise.all(
          groupsData.map(async (group: Group) => {
            try {
              const expensesResponse = await fetch(
                `/api/groups/${group._id}/expenses`
              );
              if (expensesResponse.ok) {
                const expensesData = await expensesResponse.json();
                // Add the latest 3 expenses to each group
                return {
                  ...group,
                  expenses: expensesData.slice(0, 3), // Get only the first 3
                };
              } else {
                console.warn(
                  `Failed to load expenses for group ${group._id}: ${expensesResponse.statusText}`
                );
                return group; // Return group without expenses if fetch fails
              }
            } catch (error) {
              console.error(
                `Error fetching expenses for group ${group._id}:`,
                error
              );
              return group; // Return group without expenses on network error
            }
          })
        );
        setGroups(groupsWithExpenses);
      } else {
        const errorData = await groupsResponse.json();
        console.error("Groups API error:", errorData);
        toast.error("Failed to load groups", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
    } finally {
      setIsLoading(false); // Always set loading to false after attempt
    }
  };

  // --- Render Loading Spinner if data is still loading ---
  if (status === "loading" || isLoading) {
    return <LoadingSpinner size="w-24 h-24" />;
  }

  // --- Main Dashboard Layout ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {session?.user?.name || "User"}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 w-[100%]">
              Here's an overview of your expenses and groups.
            </p>
          </div>
          {/* Ensure AiTripPlannerButton is functional */}
          <AiTripPlannerButton
            onClick={() => setShowAiTripPlanner(!showAiTripPlanner)}
          />
        </div>

        {/* AI Trip Planner Section */}
        {showAiTripPlanner && (
          <Card className="mb-8 border-2 border-primary/20 shadow-lg">
            <CardContent className="p-0">
              {/* Ensure AiTripPlanner component is imported and functional */}
              <AiTripPlanner /> 
              {/* <p className="p-4 text-center text-gray-500">AI Trip Planner component would be here.</p> */}
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Groups Card */}
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGroups}</div>
            </CardContent>
          </Card>

          {/* Total Expenses Card */}
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats.totalExpenses)}
              </div>
            </CardContent>
          </Card>

          {/* You're Owed Card */}
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">You're Owed</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalOwed)}
              </div>
            </CardContent>
          </Card>

          {/* You Owe Card */}
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">You Owe</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(stats.totalOwing)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Groups
          </h2>
          <Button onClick={() => setShowCreateGroup(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Display Groups or No Groups Message */}
        {!isLoading && groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group, index) => {
              const isLatest = index === 0; // Highlight the latest group

              return (
                <Link
                  href={`/group/${group._id}`}
                  key={group._id}
                  className="block transition-transform hover:scale-[1.01]"
                >
                  <Card
                    className={`relative w-full min-h-[220px] p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col items-center text-center ${
                      isLatest ? "ring-2 ring-purple-500" : "" // Visual cue for new group
                    }`}
                  >
                    {/* New Group Badge */}
                    {isLatest && (
                      <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full z-10">
                        New group
                      </span>
                    )}

                    <CardHeader className="items-center p-0">
                      <CardTitle className="text-xl sm:text-2xl mb-1">
                        {group.name}
                      </CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        {group.description || "No description"}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-2 pt-4">
                      <div className="text-base font-medium">
                        Members: {group.memberCount || group.members.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {group.members && group.members.length > 0 ? (
                          group.members.map((member, idx) => {
                            // Only render if member.user exists and has a name
                            if (!member.user || !member.user.name) {
                              return (
                                <div key={idx} className="text-gray-400 italic w-full text-center py-1">
                                  Member info unavailable
                                </div>
                              );
                            }
                            return (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.user.image} />
                                    <AvatarFallback>
                                      {member.user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {member.user.name}
                                  </span>
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 font-medium">
                                  ₹{(member.amount || 0).toFixed(2)}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-gray-500 italic text-sm text-center py-2">
                            No members added yet.
                          </div>
                        )}
                      </div>
                      <div className="text-base font-medium">
                        Total Expenses: {formatCurrency(group.totalExpenses)}
                      </div>

                      {/* Recent Expenses for the group */}
                      {group.expenses && group.expenses.length > 0 ? (
                        <div className="mt-2">
                          <h4 className="text-sm font-semibold mb-1">
                            Recent Expenses:
                          </h4>
                          <div className="space-y-1">
                            {group.expenses.map((expense) => (
                              <div
                                key={expense._id}
                                className="flex justify-between items-center text-sm py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={expense.paidBy?.image} />
                                    <AvatarFallback>
                                      {expense.paidBy?.name?.charAt(0) || "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-gray-700 dark:text-gray-200 truncate max-w-[100px]">
                                    {expense.description || "Expense"}
                                  </span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="font-medium">
                                    {formatCurrency(expense.amount)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(
                                      expense.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic mt-2">
                          No recent expenses
                        </div>
                      )}

                      <div className="text-sm text-muted-foreground">
                        Created:{" "}
                        {new Date(group.createdAt).toLocaleDateString()}
                      </div>

                      {/* Action Buttons for Group */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
                        <Button
                          className="w-full"
                          variant="default"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigating to /group/:groupId
                            setSelectedGroupId(group._id);
                            setShowAddExpense(true);
                          }}
                        >
                          Add Expenses
                        </Button>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigating to /group/:groupId
                            setSelectedGroupId(group._id);
                            setShowAddMember(true);
                          }}
                        >
                          Add Members
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : !isLoading && groups.length === 0 ? (
          // No Groups Message
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No groups yet</h3>
              <p className="text-muted-foreground text-center mb-6">
                Create your first group to start splitting expenses with friends
                and family.
              </p>
              <Button onClick={() => setShowCreateGroup(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Group
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {/* Modals/Dialogs */}
        <CreateGroupDialog
          open={showCreateGroup}
          onOpenChange={setShowCreateGroup}
          onGroupCreated={fetchDashboardData} // Refresh data after group creation
        />

        {selectedGroupId && ( // Only render if a group is selected for the dialogs
          <>
            <AddMemberDialog
              open={showAddMember}
              onOpenChange={(open) => {
                setShowAddMember(open);
                if (!open) setSelectedGroupId(null); // Clear selected group on dialog close
              }}
              groupId={selectedGroupId}
              onMemberAdded={fetchDashboardData} // Refresh data after member added
            />

            <AddExpenseDialog
              open={showAddExpense}
              onOpenChange={(open) => {
                setShowAddExpense(open);
                if (!open) setSelectedGroupId(null); // Clear selected group on dialog close
              }}
              groupId={selectedGroupId}
              onExpenseAdded={fetchDashboardData} // Refresh data after expense added
            />
          </>
        )}
      </div>
    </div>
  );
}