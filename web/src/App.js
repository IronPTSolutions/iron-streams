import { NavBar } from "./components";
import { Routes, Route } from 'react-router-dom';
import { DiscoverScreen, CreateStreamScreen } from "./screens";

function App() {
  return (
    <>
      <NavBar />
      
      <div className="container py-3">
        <Routes>
          <Route path='/' element={<DiscoverScreen />} />
          <Route path='/create-stream' element={<CreateStreamScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
