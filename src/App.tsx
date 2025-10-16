import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout";
import { ThemeProvider } from "./context/theme-provider";
import HisHomePage from "./pages/his-dashboard";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes>
            <Route path="/" element={<HisHomePage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
