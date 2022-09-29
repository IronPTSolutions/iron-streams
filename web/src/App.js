import { NavBar } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { DiscoverScreen, CreateStreamScreen, LoginScreen } from "./screens";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <>
      <NavBar />

      <div className="container py-3">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <DiscoverScreen />
              </AuthGuard>
            }
          />
          <Route
            path="/create-stream"
            element={
              <AuthGuard>
                <CreateStreamScreen />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
