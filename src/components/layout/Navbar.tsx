
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Code, 
  LogIn, 
  UserPlus, 
  CreditCard,
  FileText,
  Book 
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Code className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">CodeLearn</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/courses" className="border-transparent text-gray-500 hover:text-primary px-3 py-5 text-sm font-medium">
                Cours
              </Link>
              <Link to="/pricing" className="border-transparent text-gray-500 hover:text-primary px-3 py-5 text-sm font-medium">
                Tarifs
              </Link>
              <Link to="/certifications" className="border-transparent text-gray-500 hover:text-primary px-3 py-5 text-sm font-medium">
                Certifications
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Inscription
              </Link>
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/courses" className="text-gray-500 hover:text-primary block px-3 py-2 text-base font-medium">
              Cours
            </Link>
            <Link to="/pricing" className="text-gray-500 hover:text-primary block px-3 py-2 text-base font-medium">
              Tarifs
            </Link>
            <Link to="/certifications" className="text-gray-500 hover:text-primary block px-3 py-2 text-base font-medium">
              Certifications
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/login" className="flex items-center justify-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </Link>
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link to="/signup" className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Inscription
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
