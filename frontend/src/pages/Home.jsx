import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import Ratelimited from "../components/Ratelimited";
import api from "../lib/axios";
import toast from "react-hot-toast";

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (!token) {
      // Guest view: don't fetch notes from protected API
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes: ");
        console.log(error);
        if(error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
          setLoading(false);
        }
      };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <Ratelimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-ghost py-10">Loading...</div>}

        {!isAuthenticated && !loading && (
          <div className="text-center py-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Welcome to Noboard</h2>
            <p className="text-gray-400 mb-6">Sign in to create and manage your private notes.</p>
            <div className="flex justify-center gap-4">
              <a href="/login" className="btn btn-primary">Login</a>
              <a href="/signup" className="btn btn-secondary">Sign up</a>
            </div>
          </div>
        )}

        {isAuthenticated && !isRateLimited && (
          <>
            {loading && <div className="text-center text-ghost py-10">Loading notes...</div>}

            {notes.length === 0 && !loading && <NotesNotFound />}

            {notes.length > 0 && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
};
export default Home