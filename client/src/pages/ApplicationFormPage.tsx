import { useState, useEffect } from "react";
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
import { useCustomToast } from "@/hooks/useToast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactInfo: z.string().min(5, "Contact information is required")
    .refine(
      (value) => {
        // Basic validation for email or phone number
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
  const toast = useCustomToast();
  const departmentInfo = department ? getDepartmentById(department) : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactInfo: "",
      branch: "",
      year: "",
      experience: "",
      department: department || "",
      resumeFileName: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await apiRequest.post("/applications", data);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
        variant: "success"
      });
      navigate("/confirmation");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "error"
      });
    }
  };

  if (!departmentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Department Not Found</h2>
          <Button onClick={() => navigate("/departments")}>
            Return to Departments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Form fields implementation */}
      </form>
    </Form>
  );
};

export default ApplicationFormPage;
