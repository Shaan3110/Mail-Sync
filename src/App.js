import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CrmDashboard from "./pages/CrmDashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ProfilesPage from "./pages/ProfilesPage";
import ScrumsPage from "./pages/ScrumsPage";
import TicketPage from "./pages/TicketPage";
import GenerateMailPage from "./pages/GenerateMailPage";
import FaqPage from "./pages/FaqPage";
import LoginPage from "./pages/LoginPage";
import RequestAccessPage from "./pages/RequestAccessPage";

const App = () => {

  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
                <Routes>
                  {/* <Route exact path="/" element={<Home />} /> */}
                  <Route exact path="/auth/login" element={<LoginPage />} />
                  <Route
                    exact
                    path="/auth/request/access"
                    element={<RequestAccessPage />}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <CrmDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/dashboard/view/mails"
                    element={
                      <ProtectedRoute>
                        <TicketPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/dashboard/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/dashboard/scrums"
                    element={
                      <ProtectedRoute>
                        <ScrumsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/dashboard/generate"
                    element={
                      <ProtectedRoute>
                        <GenerateMailPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/dashboard/faq"
                    element={
                      <ProtectedRoute>
                        <FaqPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
