import { useState } from "react";

import { Route, Routes } from "react-router-dom";

 import { ToastContainer, toast } from 'react-toastify';

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navbar from "./Components/Navbar";
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/My-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
