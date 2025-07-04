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

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  onMemberAdded: () => void;
}

export default function AddMemberDialog({
  open,
  onOpenChange,
  groupId,
  onMemberAdded,
}: AddMemberDialogProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", upi: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const res = await fetch(`/api/groups/${groupId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Member added successfully!");
      onMemberAdded();
      onOpenChange(false);
    } else {
      toast.error("Failed to add member.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Name *" name="name" onChange={handleChange} value={form.name} />
          <Input placeholder="Email" name="email" onChange={handleChange} value={form.email} />
          <Input placeholder="Phone Number" name="phone" onChange={handleChange} value={form.phone} />
          <Input placeholder="UPI ID" name="upi" onChange={handleChange} value={form.upi} />
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
