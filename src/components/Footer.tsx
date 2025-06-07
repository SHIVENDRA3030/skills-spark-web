
import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FooterContent {
  company_name: string;
  description: string;
  copyright_text: string;
  quick_links: Array<{ label: string; href: string }>;
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const Footer = () => {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    company_name: "CSED",
    description: "Empowering the next generation of entrepreneurs through innovation, skill development, and community building.",
    copyright_text: "© 2024 Center for Skills and Entrepreneurship Development. All rights reserved.",
    quick_links: [
      { label: "About Us", href: "#about" },
      { label: "Events", href: "#events" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    social_links: {}
  });

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    const { data, error } = await supabase
      .from('footer_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setFooterContent({
        company_name: data.company_name || footerContent.company_name,
        description: data.description || footerContent.description,
        copyright_text: data.copyright_text || footerContent.copyright_text,
        quick_links: data.quick_links || footerContent.quick_links,
        social_links: data.social_links || footerContent.social_links
      });
    }
  };

  const socialIcons = [
    { icon: Facebook, key: 'facebook', label: "Facebook" },
    { icon: Twitter, key: 'twitter', label: "Twitter" },
    { icon: Instagram, key: 'instagram', label: "Instagram" },
    { icon: Linkedin, key: 'linkedin', label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {footerContent.company_name}
              </span>
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              {footerContent.description}
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => {
                const href = footerContent.social_links[social.key as keyof typeof footerContent.social_links];
                if (!href) return null;
                
                return (
                  <a
                    key={index}
                    href={href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerContent.quick_links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">Programs</h4>
            <ul className="space-y-3">
              <li>
                <a href="/programs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Startup Incubation
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Mentorship Program
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Workshops
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Pitch Competitions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              {footerContent.copyright_text}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
