import { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarContent {
  logo_text: string;
  logo_url: string;
  navigation_items: NavItem[];
  cta_text: string;
  cta_link: string;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const [navbarContent, setNavbarContent] = useState<NavbarContent>({
    logo_text: "CSED",
    logo_url: "",
    navigation_items: [
      { label: "Home", href: "/" },
      { label: "About", href: "#about" },
      { label: "Events", href: "/events" },
      { label: "Programs", href: "/programs" },
      { label: "Gallery", href: "/gallery" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "#contact" }
    ],
    cta_text: "Join Us",
    cta_link: "/auth"
  });

  useEffect(() => {
    fetchNavbarContent();
  }, []);

  const fetchNavbarContent = async () => {
    const { data, error } = await supabase
      .from('navbar_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      // Safely convert navigation_items from Json to NavItem[]
      let navigationItems: NavItem[] = navbarContent.navigation_items;
      
      if (Array.isArray(data.navigation_items)) {
        navigationItems = data.navigation_items
          .filter((item: any) => item && typeof item === 'object' && item.label && item.href)
          .map((item: any) => ({
            label: String(item.label),
            href: String(item.href)
          }));
      }

      setNavbarContent({
        logo_text: data.logo_text || "CSED",
        logo_url: data.logo_url || "",
        navigation_items: navigationItems,
        cta_text: data.cta_text || "Join Us",
        cta_link: data.cta_link || "/auth"
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border-b border-gray-200/20 dark:border-slate-700/20 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {navbarContent.logo_url ? (
                <img src={navbarContent.logo_url} alt={navbarContent.logo_text} className="h-8 w-auto" />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {navbarContent.logo_text}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navbarContent.navigation_items.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50/10 dark:hover:bg-blue-900/10"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50/10 dark:hover:bg-blue-900/10"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Auth Buttons and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to={navbarContent.cta_link}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {navbarContent.cta_text}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg mt-2 shadow-lg border border-gray-200/20 dark:border-slate-700/20">
              {navbarContent.navigation_items.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              {user ? (
                <div className="pt-2 border-t border-gray-200">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to={navbarContent.cta_link}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {navbarContent.cta_text}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
