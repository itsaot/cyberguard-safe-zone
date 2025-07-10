
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { isAdmin, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="cg-container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Shield className="text-cyberguard-blue h-8 w-8" />
          <Link to="/" className="text-xl font-semibold text-cyberguard-blue">
            CyberGuard
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-cyberguard-blue transition-colors">
            Home
          </Link>
          <Link to="/forum" className="text-gray-700 hover:text-cyberguard-blue transition-colors">
            Forum
          </Link>
          <Link to="/report-incident" className="text-gray-700 hover:text-cyberguard-blue transition-colors">
            Report Incident
          </Link>
          {isAdmin ? (
            <Link to="/dashboard" className="text-gray-700 hover:text-cyberguard-blue transition-colors">
              Dashboard
            </Link>
          ) : null}
        </div>
        
        <div className="md:hidden">
          <Button variant="outline" size="sm">Menu</Button>
        </div>
        
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/report-incident">
            <Button className="cg-button-primary">Report Now</Button>
          </Link>
          
          {isAdmin ? (
            <Button 
              variant="outline" 
              className="flex items-center gap-1 text-gray-700" 
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/admin">
              <Button 
                variant="outline" 
                className="flex items-center gap-1 text-gray-700"
              >
                <LogIn className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
