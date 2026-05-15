import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-gray-950 dark:to-black text-white mt-16 md:mt-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Company Info */}
          <div className="animate-fadeInUp">
            <Link
              href="/"
              className="flex items-center gap-2 group mb-4 transition-transform duration-300 hover:scale-105"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                💧
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                PlumPro
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional plumbing services with 15+ years of excellence.
            </p>
          </div>

          {/* Services */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Residential Plumbing
                </span>
              </li>
              <li>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Commercial Services
                </span>
              </li>
              <li>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Emergency Repairs
                </span>
              </li>
              <li>
                <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Maintenance Plans
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <span>→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <span>→</span> About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <span>→</span> Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <span>→</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <p className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                <span className="text-lg">📞</span> (555) 123-4567
              </p>
              <p className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                <span className="text-lg">📧</span> info@plumpro.com
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">📍</span>
                <span>123 Main St, City, ST 12345</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 md:my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm text-center md:text-left animate-fadeInUp">
            &copy; {currentYear} PlumPro Services. All rights reserved.
          </p>
          <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
              aria-label="Facebook"
            >
              <span className="text-lg">f</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
              aria-label="Twitter"
            >
              <span className="text-lg">𝕏</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
              aria-label="Instagram"
            >
              <span className="text-lg">📷</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
              aria-label="LinkedIn"
            >
              <span className="text-lg">in</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
