import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        {token
          ? "You have no notes. Create your first note to start your journey."
          : "Sign in to create and manage your private notes."}
      </p>
      {token ? (
        <Link to="/create" className="btn btn-primary">
          Create Your First Note
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign up</Link>
        </div>
      )}
    </div>
  );
};
export default NotesNotFound;