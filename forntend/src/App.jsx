import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Achievements from './pages/Achievements';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { CSSD, ModularOT, SkillLabs, PneumaticSystem } from './pages/ServicePages';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/services/cssd" element={<CSSD />} />
        <Route path="/services/modular" element={<ModularOT />} />
        <Route path="/services/skill-labs" element={<SkillLabs />} />
        <Route path="/services/pneumatic" element={<PneumaticSystem />} />
      </Routes>
    </BrowserRouter>
  );
}
