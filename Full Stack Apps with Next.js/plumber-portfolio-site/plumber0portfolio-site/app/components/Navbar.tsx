import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg dark:shadow-xl dark:shadow-blue-900/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <span className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110">
              💧
            </span>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-700 transition-all duration-300">
              PlumPro
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex gap-2 lg:gap-8 text-base lg:text-lg font-medium">
            <li>
              <Link
                href="/"
                className="relative px-2 py-2 text-gray-700 dark:text-gray-300 group"
              >
                <span className="transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Home
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="relative px-2 py-2 text-gray-700 dark:text-gray-300 group"
              >
                <span className="transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  About
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="relative px-2 py-2 text-gray-700 dark:text-gray-300 group"
              >
                <span className="transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Projects
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="relative px-2 py-2 text-gray-700 dark:text-gray-300 group"
              >
                <span className="transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Contact
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <details className="group">
              <summary className="flex items-center justify-center w-10 h-10 cursor-pointer font-bold text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                ☰
              </summary>
              <div className="absolute top-16 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:shadow-blue-900/20 p-4 min-w-48 animate-fadeInUp">
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
