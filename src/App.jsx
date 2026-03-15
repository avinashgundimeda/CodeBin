import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/header";
import Home from "./Pages/home";
import Docs from "./Pages/docs";
import Contact from "./Pages/contact";
import Editor from "./Pages/editor";
import Login from "./Pages/login";

function App() {
  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;