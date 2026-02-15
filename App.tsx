import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, Redirect } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { SupportProvider } from "@/contexts/SupportContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import FAQ from "@/pages/FAQ";
import ElitePlanDetails from "@/pages/ElitePlanDetails";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import Overview from "@/pages/Dashboard/Overview";
import Invest from "@/pages/Dashboard/Invest";
import Deposit from "@/pages/Dashboard/Deposit";
import Withdraw from "@/pages/Dashboard/Withdraw";
import Profile from "@/pages/Dashboard/Profile";
import WalletPage from "@/pages/Dashboard/Wallet";
import UserSupport from "@/pages/Dashboard/Support";
import AdminLogin from "@/pages/Admin/AdminLogin";
import AdminOverview from "@/pages/Admin/AdminOverview";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminDeposits from "@/pages/Admin/AdminDeposits";
import AdminWithdrawals from "@/pages/Admin/AdminWithdrawals";
import AdminCMS from "@/pages/Admin/AdminCMS";
import AdminSupport from "@/pages/Admin/AdminSupport";
import AdminSettings from "@/pages/Admin/AdminSettings";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ThemeManager } from "@/components/ThemeManager";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import LiveChat from "@/components/LiveChat";

// Use hash-based routing (/#/)
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/:page">
          {(params) => (
            <AdminLayout>
              {params.page === "overview" && <AdminOverview />}
              {params.page === "users" && <AdminUsers />}
              {params.page === "deposits" && <AdminDeposits />}
              {params.page === "withdrawals" && <AdminWithdrawals />}
              {params.page === "cms" && <AdminCMS />}
              {params.page === "support" && <AdminSupport />}
              {params.page === "settings" && <AdminSettings />}
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin">
          <Redirect to="/admin/login" />
        </Route>

        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/faq" component={FAQ} />
        <Route path="/plans/elite" component={ElitePlanDetails} />
        <Route path="/about" component={About} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/contact" component={Contact} />
        <Route path="/register" component={Register} />

        {/* Dashboard Routes (Nested inside Layout) */}
        <Route path="/dashboard/:page">
          {(params) => (
            <DashboardLayout>
              {params.page === "overview" && <Overview />}
              {params.page === "invest" && <Invest />}
              {params.page === "deposit" && <Deposit />}
              {params.page === "withdraw" && <Withdraw />}
              {params.page === "profile" && <Profile />}
              {params.page === "wallet" && <WalletPage />}
              {params.page === "support" && <UserSupport />}
            </DashboardLayout>
          )}
        </Route>
        
        {/* Redirect root dashboard to overview */}
        <Route path="/dashboard">
          <Redirect to="/dashboard/overview" />
        </Route>

        {/* Fallback */}
        <Route>
           <div className="text-white text-center pt-20">الصفحة غير موجودة - <a href="/" className="text-primary">العودة للرئيسية</a></div>
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <SettingsProvider>
            <AuthProvider>
              <AdminProvider>
                <SupportProvider>
                  <Toaster position="top-center" />
                  <ThemeManager />
                  <AppRouter />
                  <LiveChat />
                </SupportProvider>
              </AdminProvider>
            </AuthProvider>
          </SettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
