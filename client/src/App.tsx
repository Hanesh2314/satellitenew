import { Router, Route } from "wouter";
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

function AppRoutes() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/confirmation" component={ConfirmationPage} />
      <Route path="/departments">
        {(params) => <DepartmentSelectionPage {...params} />}
      </Route>
      <Route path="/department/:id">
        {(params) => <DepartmentDetailsPage id={params.id} />}
      </Route>
      <Route path="/apply/:department">
        {(params) => <ApplicationFormPage department={params.department} />}
      </Route>
      <Route path="/admin" component={AdminPanelPage} />
      <Route path="/:rest*" component={NotFound} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen relative">
          <StarBackground />
          <AppRoutes />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
