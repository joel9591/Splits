import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  if (!form.paidBy || !form.amount) {
    toast.error("Paid by and amount are required");
    return;
  }

  const res = await fetch(`/api/groups/${groupId}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (res.ok) {
    toast.success("Expense added!");
    onExpenseAdded();
    onOpenChange(false);
  } else {
    toast.error(data.message || "Failed to add expense.");
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Paid By"
            name="paidBy"
            onChange={handleChange}
            value={form.paidBy}
          />
          <Input
            placeholder="Amount"
            name="amount"
            type="number"
            onChange={handleChange}
            value={form.amount}
          />
          <Input
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={form.description}
          />
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
