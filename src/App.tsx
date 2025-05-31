
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/index";

const App = () => {
  return (
    <div className="bg-white min-h-screen" dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
