import { NavBar } from "./components";
import { Routes, Route } from "react-router-dom";
import { DiscoverScreen, CreateStreamScreen, LoginScreen } from "./screens";
import { useState } from "react";

function App() {
  return (
    <>
      <NavBar />

      <div className="container py-3">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<DiscoverScreen />} />
          <Route path="/create-stream" element={<CreateStreamScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
