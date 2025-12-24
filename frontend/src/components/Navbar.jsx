import { Link, useNavigate } from "react-router";
import { PlusIcon, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-ghost font-mono tracking-tight">Noboard</h1>
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Link to={'/create'} className="btn btn-secondary">
                  <PlusIcon className="size-5"/>
                  <span>New Note</span>
                </Link>
                <button className="btn btn-ghost" onClick={handleLogout} title="Logout">
                  <LogOut />
                </button>
              </>
            ) : (
              <>
                <Link to={'/login'} className="btn btn-secondary">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar