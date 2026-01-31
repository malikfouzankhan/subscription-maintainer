import { logoutUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-semibold text-lg">
          SubTrack
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-black"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
