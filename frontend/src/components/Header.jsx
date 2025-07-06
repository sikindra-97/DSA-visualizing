// src/components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Make sure this path is correct

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">DSA Visualizer</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/array" className="hover:text-blue-200">Array</Link>
          <Link to="/sorting" className="hover:text-blue-200">Sorting</Link>
          <Link to="/linkedlist" className="hover:text-blue-200">LinkedList</Link>
          <Link to="/queue" className="hover:text-blue-200">Queue</Link>
          <Link to="/stack" className="hover:text-blue-200">Stack</Link>
          <Link to="/searching" className="hover:text-blue-200">Searching</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="hover:text-blue-200">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-2">
          <Link to="/" className="block text-white">Home</Link>
          <Link to="/array" className="block text-white">Array</Link>
          <Link to="/sorting" className="block text-white">Sorting</Link>
          <Link to="/linkedlist" className="block text-white">LinkedList</Link>
          <Link to="/queue" className="block text-white">Queue</Link>
          <Link to="/stack" className="block text-white">Stack</Link>
          <Link to="/searching" className="block text-white">Searching</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 px-3 py-2 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block text-white">Login</Link>
              <Link to="/register" className="block text-white">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
