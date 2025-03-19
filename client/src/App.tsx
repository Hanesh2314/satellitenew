import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import DepartmentSelectionPage from "@/pages/DepartmentSelectionPage";
import DepartmentDetailsPage from "@/pages/DepartmentDetailsPage";
import ApplicationFormPage from "@/pages/ApplicationFormPage";
import AdminPanelPage from "@/pages/AdminPanelPage";
import NotFound from "@/pages/not-found";
import StarBackground from "@/components/StarBackground";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/departments" element={<DepartmentSelectionPage />} />
      <Route path="/department/:id" element={<DepartmentDetailsPage />} />
      <Route path="/apply/:department" element={<ApplicationFormPage />} />
      <Route path="/admin" element={<AdminPanelPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen relative">
          <StarBackground />
          <Router />
          <Toaster />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
