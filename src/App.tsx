import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import HisHomePage from "./pages/his-dashboard";
import FormTemplate from "./components/FormTemplate";
import HospitalSpinner from "./components/HospitalSpinner";
import DocumentsPage from "./pages/Documents";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes>
            <Route path="/" element={<HisHomePage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/patients" element={<FormTemplate />} />
            <Route
              path="/practitioners"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                  <HospitalSpinner size={100} />
                </div>
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
