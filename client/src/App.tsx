import { Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import DepartmentSelectionPage from "@/pages/DepartmentSelectionPage";
import DepartmentDetailsPage from "@/pages/DepartmentDetailsPage";
import ApplicationFormPage from "@/pages/ApplicationFormPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AdminPanelPage from "@/pages/AdminPanelPage";
import NotFoundPage from "@/pages/not-found";

function App() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/departments" component={DepartmentSelectionPage} />
      <Route path="/department/:id" component={DepartmentDetailsPage} />
      <Route path="/apply/:department" component={ApplicationFormPage} />
      <Route path="/confirmation" component={ConfirmationPage} />
      <Route path="/admin" component={AdminPanelPage} />
      <Route component={NotFoundPage} />
      <Toaster />
    </>
  );
}

export default App;
