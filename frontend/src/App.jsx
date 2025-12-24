import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import LoginPage from "./components/loginpage";
import Signup from "./pages/Signup";
//import toast from "react-hot-toast";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return <div className="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
  [background:radial-gradient(150%_150%_at_50%_10%,#000_70%,#1a1a2e_100%)]" />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
      <Route path="/note/:id" element={<ProtectedRoute element={<Detail />} />} />
    </Routes>
  </div>;
};
export default App