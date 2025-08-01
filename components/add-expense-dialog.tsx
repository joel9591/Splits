import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Member {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
}

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  onExpenseAdded: () => void;
}

export default function AddExpenseDialog({
  open,
  onOpenChange,
  groupId,
  onExpenseAdded,
}: AddExpenseDialogProps) {
  const [form, setForm] = useState({ paidBy: "", amount: "", description: "" });
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch group members when dialog opens
  useEffect(() => {
    if (open && groupId) {
      fetchGroupMembers();
    }
  }, [open, groupId]);

  const fetchGroupMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/groups/${groupId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.members && Array.isArray(data.members)) {
          setMembers(data.members);
        }
      } else {
        toast.error("Failed to load group members", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching group members:", error);
      toast.error("An error occurred while loading members", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (value: string) => {
    setForm({ ...form, paidBy: value });
  };

  const handleSubmit = async () => {
    if (!form.paidBy || !form.amount) {
      toast.error("Paid by and amount are required", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
      return;
    }

    try {
      const res = await fetch(`/api/groups/${groupId}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Expense added successfully!");
        setForm({ paidBy: "", amount: "", description: "" }); // Reset form
        onExpenseAdded();
        onOpenChange(false);
      } else {
        toast.error(data.message || "Failed to add expense.", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("An error occurred while adding the expense", {
          icon: "❌",
          style: {
            color: "#dc2626",
          },
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paidBy">Paid By</Label>
            <Select
              value={form.paidBy}
              onValueChange={handleSelectChange}
              disabled={isLoading || members.length === 0}
            >
              <SelectTrigger id="paidBy" className="w-full">
                <SelectValue placeholder="Select member who paid" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem 
                    key={member.user._id} 
                    value={member.user.name}
                  >
                    {member.user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {members.length === 0 && !isLoading && (
              <p className="text-sm text-muted-foreground">No members found in this group</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              name="amount"
              type="number"
              onChange={handleChange}
              value={form.amount}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              name="description"
              onChange={handleChange}
              value={form.description}
            />
          </div>
          
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-2"
            disabled={isLoading || !form.paidBy || !form.amount}
          >
            Add Expense
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
