"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    upiId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone number are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Member added successfully!");
        onMemberAdded();
        onOpenChange(false);
        setForm({ name: "", phone: "", email: "", upiId: "" });
      } else {
        toast.error(data.message || "Failed to add member.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            placeholder="Email (optional)"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            placeholder="UPI ID (optional)"
            name="upiId"
            value={form.upiId}
            onChange={handleChange}
          />

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding Member..." : "Add Member"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
