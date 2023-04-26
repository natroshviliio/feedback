import Rate from "./components/Rate";
import Questions from "./components/admin/Questions";
import ThankYou from "./components/ThankYou";
import Statistic from "./components/admin/Statistic";
import "./components/Style/style.css";
import Admin from "./components/admin/Admin";
import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import "../node_modules/bpg-nino-mtavruli-book/css/bpg-nino-mtavruli-book.min.css";
import "../node_modules/bpg-arial/css/bpg-arial.min.css";
import AddQuestions from "./components/AddQuestions";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      localStorage.setItem("loggedIn", false);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/rate"
            element={
              <Rate
                setCurrentIndex={setCurrentIndex}
                currentIndex={currentIndex}
              />
            }
          />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/Statistic" element={<Statistic />} />
          <Route path="/questions" element={<AddQuestions />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
