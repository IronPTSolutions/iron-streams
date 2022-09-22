import { NavBar } from "./components";
import { Routes, Route } from 'react-router-dom';
import { DiscoverScreen } from "./screens";

function App() {
  return (
    <>
      <NavBar />
      
      <div className="container py-3">
        <Routes>
          <Route path='/' element={<DiscoverScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
