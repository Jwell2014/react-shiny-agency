import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Homes from "./pages/Homes";
import Survey from "./pages/Survey";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";
import Result from "./pages/Result";
import Freelance from "./pages/Freelance";
import Footer from "./components/Footer";
import GlobalStyle from "./utils/styles/globalStyle";
import FreelanceDetail from "./pages/FreelanceDetail";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/results" element={<Result />} />
        <Route path="/freelances" element={<Freelance />} />
        <Route path="/freelances/:id" element={<FreelanceDetail />} />
        <Route path="/survey/:questionId" element={<Survey />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
