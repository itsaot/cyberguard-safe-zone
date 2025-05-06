
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyberguard-gray py-8 mt-auto">
      <div className="cg-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="text-cyberguard-blue h-6 w-6" />
              <span className="text-lg font-semibold text-cyberguard-blue">CyberGuard</span>
            </div>
            <p className="text-cyberguard-dark-gray text-sm max-w-xs">
              Protecting students from cyberbullying through early detection, 
              intervention, and education.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-cyberguard-dark-gray mb-4">Quick Links</h3>
            <ul className="text-cyberguard-dark-gray space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-cyberguard-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-cyberguard-blue transition-colors">
                  Report Incident
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyberguard-blue transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-cyberguard-dark-gray mb-4">Resources</h3>
            <ul className="text-cyberguard-dark-gray space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-cyberguard-blue transition-colors">
                  Anti-Bullying Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyberguard-blue transition-colors">
                  Online Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyberguard-blue transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-cyberguard-dark-gray">
          &copy; {new Date().getFullYear()} CyberGuard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
