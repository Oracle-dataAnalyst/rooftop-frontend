import { Route, Routes } from "react-router-dom";

import Chat from "../pages/Chat";
import Contact from "../pages/Contact";
import DataReference from "../pages/DataReference";
import Gseed from "../pages/Gseed";
import Home from "../pages/Home";
import ServiceIntro from "../pages/ServiceIntro";
import SimulationStep1 from "../pages/SimulationStep1";
import SimulationStep2 from "../pages/SimulationStep2";
import SimulationStep3 from "../pages/SimulationStep3";
import SimulationStep4 from "../pages/SimulationStep4";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<ServiceIntro />} />
      <Route path="/data" element={<DataReference />} />
      <Route path="/gseed" element={<Gseed />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/simulation/step-1" element={<SimulationStep1 />} />
      <Route path="/simulation/step-2" element={<SimulationStep2 />} />
      <Route path="/simulation/step-3" element={<SimulationStep3 />} />
      <Route path="/simulation/step-4" element={<SimulationStep4 />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
