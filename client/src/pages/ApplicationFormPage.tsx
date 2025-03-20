import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getDepartmentById } from "@/lib/satelliteUtils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactInfo: z.string().min(5, "Contact information is required")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      { message: "Please enter a valid email or phone number" }
    ),
  branch: z.string().min(2, "Branch & Department must be at least 2 characters"),
  year: z.string().min(1, "Please select your year"),
  experience: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  resumeFileName: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationFormPage = () => {
  const { department } = useParams<{ department: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: department || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Your form submission logic here
      toast({
        title: "Success",
        description: "Application submitted successfully!",
      });
      navigate("/confirmation");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Rest of your component code...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Your form fields */}
      </form>
    </Form>
  );
};

export default ApplicationFormPage;
