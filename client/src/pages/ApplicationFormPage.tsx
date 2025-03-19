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
  const { showToast } = useCustomToast();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const departmentInfo = getDepartmentById(department);

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

  useEffect(() => {
    if (!departmentInfo) {
      navigate("/departments");
    }
  }, [departmentInfo, navigate]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Create a FormData object to handle the file
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      // Add resume file if available
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
      
      await apiRequest("POST", "/api/applications", data);
      
      showToast("Application submitted successfully!");
      
      // Reset form
      form.reset();
      setSelectedFileName(null);
      setResumeFile(null);
      
      // Redirect to home page after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      showToast("Failed to submit application. Please try again.", "error");
    }
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      setSelectedFileName(file.name);
      setResumeFile(file);
      form.setValue("resumeFileName", file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 py-12 page-transition active">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-star-white mb-4">Application Form</h2>
        {departmentInfo && (
          <p className="text-xl text-stellar-yellow font-medium">
            Selected Department: {departmentInfo.name}
          </p>
        )}
      </div>

      <div className="w-full max-w-2xl bg-deep-blue bg-opacity-70 p-8 rounded-xl backdrop-filter backdrop-blur-lg border border-satellite-blue border-opacity-50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-star-white text-lg font-bold">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-3 bg-space-black bg-opacity-50 rounded-lg border border-satellite-blue focus:border-stellar-yellow text-white"
                      placeholder="Enter your full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-star-white text-lg font-bold">Contact Information</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-3 bg-space-black bg-opacity-50 rounded-lg border border-satellite-blue focus:border-stellar-yellow text-white"
                      placeholder="Enter your email or phone number"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400">
                    Please provide either an email address or phone number where we can reach you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-star-white text-lg font-bold">Branch & Department</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-3 bg-space-black bg-opacity-50 rounded-lg border border-satellite-blue focus:border-stellar-yellow text-white"
                      placeholder="e.g., Electrical Engineering"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-star-white text-lg font-bold">Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-3 bg-space-black bg-opacity-50 rounded-lg border border-satellite-blue focus:border-stellar-yellow text-white">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-star-white text-lg font-bold">Work Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full px-4 py-3 bg-space-black bg-opacity-50 rounded-lg border border-satellite-blue focus:border-stellar-yellow text-white"
                      placeholder="Describe your relevant experience"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <label className="block text-star-white text-lg font-bold">Resume Upload</label>
              <div
                className={`w-full h-32 border-2 border-dashed ${
                  isDragging ? "border-stellar-yellow" : "border-satellite-blue"
                } rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-stellar-yellow transition-colors p-4`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("resume")?.click()}
              >
                <i className="fas fa-cloud-upload-alt text-2xl text-satellite-blue mb-2"></i>
                <p className="text-center text-gray-300">
                  Drag & drop your resume here or click to browse
                </p>
                {selectedFileName && (
                  <p className="text-stellar-yellow mt-2">{selectedFileName}</p>
                )}
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </div>
            </div>

            <input
              type="hidden"
              name="department"
              value={department}
              {...form.register("department")}
            />

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="bg-stellar-yellow hover:bg-yellow-600 text-deep-blue font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
              >
                Submit Application
                <i className="fas fa-paper-plane ml-2"></i>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApplicationFormPage;
