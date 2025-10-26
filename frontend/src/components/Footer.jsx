import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import codexlogo from "../../public/images/codexlogo.jpeg";

const Footer = () => {
  return (
    <motion.footer
      className="bg-green-900 text-white py-10 px-6 md:px-16 lg:px-24 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Logo & Description */}
        <div className="text-center md:text-left">
          <motion.h2
            className="text-3xl font-extrabold text-green-300 animate-pulse"
            whileHover={{ textShadow: "0px 0px 8px rgba(34, 197, 94, 1)" }}
          >
            Virtual Herbal Garden
          </motion.h2>
          <p className="text-gray-300 mt-2 max-w-md">
            Explore the rich world of medicinal plants with 3D models, virtual tours, and in-depth knowledge at your fingertips.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2 underline">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Categories", path: "/categories" },
              { name: "HerbaCure", path: "/herba" },
              { name: "Quiz", path: "/quiz" },
              { name: "About", path: "/about" },
            ].map((link, index) => (
              <motion.li
                key={index}
                className="hover:text-green-400 transition duration-300 cursor-pointer relative"
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  to={link.path}
                  className="hover:underline"
                >
                  {link.name}
                </Link>
                <motion.div
                  className="w-0 h-1 bg-green-400 mx-auto mt-1"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2 underline">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: FaFacebookF, link: "https://www.facebook.com" },
              { icon: FaTwitter, link: "https://www.twitter.com" },
              { icon: FaInstagram, link: "https://www.instagram.com" },
              { icon: FaLinkedin, link: "https://www.linkedin.com" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 10, color: "#22c55e" }}
                transition={{ type: "spring", stiffness: 200 }}
                aria-label={`Follow us on ${["Facebook", "Twitter", "Instagram", "LinkedIn"][index]}`}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="mt-12 mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg overflow-hidden border border-green-200"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 md:p-8">
            {/* Logo Section */}
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={codexlogo}
                className="h-20 w-auto object-contain rounded-lg shadow-md"
                alt="CodeX Logo"
              />
            </motion.div>

            {/* Copyright - Now Centered */}
            <motion.p
              className="text-sm text-green-800 mb-6 font-medium text-center"
              whileHover={{ color: "#065f46" }}
              transition={{ duration: 0.2 }}
            >
              &copy; 2025 CodeX Squad. All rights reserved.
            </motion.p>

            {/* Team Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Mohammad Umar",
                  role: "Full Stack Developer & Team Leader",
                  emoji: "👨‍💻",
                  color: "bg-green-100"
                },
                {
                  name: "Divyanshu Kushwaha",
                  role: "Full Stack Developer",
                  emoji: "💻",
                  color: "bg-teal-100"
                },
                {
                  name: "Saral Singh",
                  role: "Backend Developer",
                  emoji: "⚙️",
                  color: "bg-emerald-100"
                },
                {
                  name: "Hradyansh Dosar",
                  role: "Content & Research Analyst",
                  emoji: "📚",
                  color: "bg-lime-100"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className={`${member.color} rounded-lg p-4 border border-green-200`}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: member.color.replace('100', '200')
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{member.emoji}</span>
                    <div className="text-left">
                      <h4 className="font-semibold text-green-900">{member.name}</h4>
                      <p className="text-sm text-green-700">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <motion.p
              className="text-xs text-green-600 mt-6 pt-4 border-t border-green-200 font-medium text-center"
              whileHover={{ color: "#047857" }}
              transition={{ duration: 0.2 }}
            >
              Crafted with ❤️ for Nature's Cure project
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

    </motion.footer>
  );
};

export default Footer;