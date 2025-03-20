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
import { useToast } from "@/hooks/use-toast"; // Updated import

// ... rest of your imports and form schema ...

const ApplicationFormPage = () => {
  const { department } = useParams<{ department: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast(); // Use the hook

  // ... rest of your component logic ...

  const onSubmit = async (data: FormValues) => {
    try {
      // Your form submission logic
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
        variant: "default",
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

  // ... rest of your component code ...
};

export default ApplicationFormPage;
