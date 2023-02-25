import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Homes from "./pages/Homes";
import Survey from "./pages/Survey";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";
import Result from "./pages/Result";
import Freelance from "./pages/Freelance";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/result" element={<Result />} />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/survey/:questionId" element={<Survey />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
