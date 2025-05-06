
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

const Navbar = () => {
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
          <Link to="/report" className="text-gray-700 hover:text-cyberguard-blue transition-colors">
            Report Incident
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-cyberguard-blue transition-colors">
            Dashboard
          </Link>
        </div>
        
        <div className="md:hidden">
          <Button variant="outline" size="sm">Menu</Button>
        </div>
        
        <div className="hidden md:block">
          <Link to="/report">
            <Button className="cg-button-primary">Report Now</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
