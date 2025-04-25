
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // In a real app, this would come from an auth context/hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-jobportal-purple">JobMatch</Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-jobportal-purple transition-colors">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-jobportal-purple transition-colors">Jobs</Link>
          <Link to="/about" className="text-gray-700 hover:text-jobportal-purple transition-colors">About</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-jobportal-purple transition-colors">Dashboard</Link>
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(false)}
                className="border-jobportal-purple text-jobportal-purple hover:bg-jobportal-purple hover:text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-jobportal-purple text-jobportal-purple hover:bg-jobportal-purple hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-jobportal-purple hover:bg-jobportal-darkpurple text-white">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-6 py-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-jobportal-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-700 hover:text-jobportal-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-jobportal-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-jobportal-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="border-jobportal-purple text-jobportal-purple hover:bg-jobportal-purple hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-jobportal-purple text-jobportal-purple hover:bg-jobportal-purple hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    className="w-full bg-jobportal-purple hover:bg-jobportal-darkpurple text-white"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
