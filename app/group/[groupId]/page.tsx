"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Receipt,
  DollarSign,
  Calendar,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import LoadingSpinner from "@/components/loading-spinner";
import Navbar from "@/components/navbar";
import { toast } from "sonner";
import Link from "next/link";
import AddMemberDialog from "@/components/add-member-dialog";
import AddExpenseDialog from "@/components/add-expense-dialog";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

interface Member {
  user: User;
  amount: number;
  joinedAt: string;
}

interface Expense {
  _id: string;
  description: string;
  amount: number;
  paidBy: User;
  createdAt: string;
  splitType: "equal" | "custom";
  splitDetails: {
    user: User;
    amount: number;
    isPaid: boolean;
  }[];
}

interface Settlement {
  from: User;
  to: User;
  amount: number;
}

interface Group {
  _id: string;
  name: string;
  description?: string;
  createdBy: User;
  members: Member[];
  totalExpenses: number;
  createdAt: string;
  expenses?: Expense[];
  settlements?: Settlement[];
}

export default function GroupDetails() {
  const { groupId } = useParams();
  const { data: session, status } = useSession();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const fetchGroupDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/groups/${groupId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }

        const data = await response.json();
        setGroup(data);
      } catch (error) {
        console.error("Error fetching group details:", error);
        toast.error("Failed to load group details", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId, status]);

  const handleAddMember = async () => {
    setShowAddMemberDialog(true);
  };

  const handleAddExpense = async () => {
    setShowAddExpenseDialog(true);
  };

  const handleMemberAdded = async () => {
    const response = await fetch(`/api/groups/${groupId}`);
    if (response.ok) {
      const data = await response.json();
      setGroup(data);
      toast.success("Member added successfully");
    }
  };

  const handleExpenseAdded = async () => {
    const response = await fetch(`/api/groups/${groupId}`);
    if (response.ok) {
      const data = await response.json();
      setGroup(data);
      toast.success("Expense added successfully");
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner size="w-24 h-24" />;
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Not authenticated</h1>
        <p className="mt-2">Please sign in to view this page</p>
        <Link href="/auth/signin">
          <Button className="mt-4">Sign In</Button>
        </Link>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Group not found</h1>
        <p className="mt-2">
          The group you're looking for doesn't exist or you don't have access
        </p>
        <Link href="/dashboard">
          <Button className="mt-4">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{group.name}</h1>
        </div>

        {group.description && (
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {group.description}
          </p>
        )}

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Receipt className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">
                  {formatCurrency(group.totalExpenses)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">
                  {group.members.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Per Person (Avg)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">
                  {formatCurrency(
                    group.totalExpenses / (group.members.length || 1)
                  )}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-500" />
                <span className="text-md font-medium">
                  {new Date(group.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button onClick={handleAddExpense}>
            <Plus className="mr-1 h-4 w-4" /> Add Expense
          </Button>
          <Button variant="outline" onClick={handleAddMember}>
            <Plus className="mr-1 h-4 w-4" /> Add Member
          </Button>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="balances">Balances</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Group Members</CardTitle>
                <CardDescription>
                  All members in this group and their contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.members.map((member) => (
                    <div
                      key={member.user._id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          {member.user.image ? (
                            <AvatarImage
                              src={member.user.image}
                              alt={member.user.name}
                            />
                          ) : (
                            <AvatarFallback>
                              {member.user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-medium">{member.user.name}</p>
                          <p className="text-sm text-gray-500">
                            {member.user.email || ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full justify-end ">
                        <Badge
                          className="text-sm font-semibold"
                          variant={member.amount > 0 ? "success" : "secondary"}
                        >
                          {formatCurrency(member.amount)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>All expenses in this group</CardDescription>
              </CardHeader>
              <CardContent>
                {group.expenses && group.expenses.length > 0 ? (
                  <div className="space-y-4">
                    {group.expenses.map((expense) => (
                      <div key={expense._id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-xl">
                              {expense.description || "Expense"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Paid by {expense.paidBy.name} on{" "}
                              {new Date(expense.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-sm font-semibold"
                          >
                            {formatCurrency(expense.amount)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Receipt className="mb-2 h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium">No expenses yet</h3>
                    <p className="text-sm text-gray-500">
                      Add your first expense to get started
                    </p>
                    <Button
                      onClick={handleAddExpense}
                      className="mt-4"
                      variant="outline"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add Expense
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Balance Summary</CardTitle>
                <CardDescription>Who owes whom in this group</CardDescription>
              </CardHeader>
              <CardContent>
                {group.settlements && group.settlements.length > 0 ? (
                  <div className="space-y-4">
                    {group.settlements.map((settlement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            {settlement.from.image ? (
                              <AvatarImage
                                src={settlement.from.image}
                                alt={settlement.from.name}
                              />
                            ) : (
                              <AvatarFallback>
                                {settlement.from.name?.charAt(0) || "U"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="text-sm ml-2 font-extrabold">
                            {" "}
                            {settlement.from.name}
                          </div>

                          <span className="mx-4 text-sm">Should pay to</span>
                          <Avatar className="h-6 w-6">
                            {settlement.to.image ? (
                              <AvatarImage
                                src={settlement.to.image}
                                alt={settlement.to.name}
                              />
                            ) : (
                              <AvatarFallback>
                                {settlement.to.name?.charAt(0) || "U"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="text-sm ml-2 mr-4 font-extrabold">
                            {settlement.to.name}
                          </div>
                        </div>
                        <Badge>{formatCurrency(settlement.amount)}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <DollarSign className="mb-2 h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium">
                      No balances to settle
                    </h3>
                    <p className="text-sm text-gray-500">
                      All expenses are settled or no expenses yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {showAddMemberDialog && (
        <AddMemberDialog
          groupId={group._id}
          open={showAddMemberDialog}
          onOpenChange={setShowAddMemberDialog}
          onMemberAdded={handleMemberAdded}
        />
      )}

      {showAddExpenseDialog && (
        <AddExpenseDialog
          groupId={group._id}
          open={showAddExpenseDialog}
          onOpenChange={setShowAddExpenseDialog}
          onExpenseAdded={handleExpenseAdded}
        />
      )}
    </div>
  );
}
