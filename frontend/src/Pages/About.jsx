import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

const About = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 90, translateZ: -50 }, // Added translateZ for depth
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      translateZ: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variants for feature cards with enhanced 3D effect
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.95, rotateX: 60, translateZ: -100 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      translateZ: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotateY: 15,
      rotateX: 10,
      translateZ: 20, // Added depth on hover
      boxShadow: "0 8px 30px rgba(0, 128, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  // Variants for team cards with enhanced 3D effect
  const teamVariants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.9, translateZ: -100 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      translateZ: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      rotateY: 20,
      rotateX: 15,
      translateZ: 30, // Added depth on hover
      transition: { duration: 0.3 },
    },
  };

  // Variants for CTA button with enhanced 3D effect
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -90, translateZ: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      translateZ: 0,
      transition: { duration: 0.6, type: "spring", bounce: 0.5 },
    },
    hover: {
      scale: 1.15,
      rotateY: 15,
      rotateX: 10,
      translateZ: 40, // Added depth for prominence
      boxShadow: "0 8px 30px rgba(0, 128, 0, 0.3)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.9, translateZ: 0 },
  };

  // Marquee animation for plants
  const marqueeVariants = {
    animate: {
      x: [-1400, 0], // Adjusted for wider scroll
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Faster for liveliness
          ease: "linear",
        },
      },
    },
  };

  // Refs for scroll-triggered animations
  const sihRef = useRef(null);
  const missionRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);
  const marqueeRef = useRef(null);

  // useInView hooks
  const sihInView = useInView(sihRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const marqueeInView = useInView(marqueeRef, { once: false, margin: "-100px" });

  // Scroll progress for parallax and 3D effects
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 5]); // Subtle 3D rotation

  // Medicinal plants for marquee (including Jamun)
  const plants = [
    "Jamun",
    "Tulsi",
    "Aloe Vera",
    "Neem",
    "Ashwagandha",
    "Giloy",
    "Brahmi",
    "Amla",
    "Shatavari",
    "Turmeric",
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-12 md:px-20 lg:px-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1000 }} // Enable 3D perspective
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-green-500 origin-left z-50"
        style={{ scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]), width: "100%" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-green-800 mb-8 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05, color: "#166534", rotateX: 10, translateZ: 20 }}
          transition={{ duration: 0.3 }}
        >
          About Nature's Cure
        </motion.h1>

        {/* Introduction */}
        <motion.p
          className="text-gray-700 text-lg leading-relaxed mb-12 text-justify md:text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Nature's Cure (Virtual Herbal Garden) is an innovative platform designed to spread awareness about
          the healing power of medicinal plants used in AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha,
          and Homeopathy). With interactive 3D visuals, educational content, and engaging quizzes, we bring
          the wonders of traditional herbal knowledge to your fingertips—virtually!
        </motion.p>

        {/* Marquee Section */}
        <motion.div
          ref={marqueeRef}
          className="mb-12 overflow-hidden py-4 bg-green-100 rounded-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={marqueeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{ rotateX: rotateParallax }} // Subtle 3D tilt on scroll
        >
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            variants={marqueeVariants}
            animate="animate"
          >
            {[...plants, ...plants].map((plant, index) => (
              
                <motion.div
                  className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-green-700 font-semibold text-sm shadow-sm cursor-pointer"
                  whileHover={{
                    scale: 1.15,
                    rotateY: 15,
                    translateZ: 20,
                    backgroundColor: "#166534",
                    color: "#fff",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="text-green-500"
                    initial={{ rotateZ: -360 }}
                    animate={{ rotateZ: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    🌿
                  </motion.span>
                  {plant}
                </motion.div>
             
            ))}
          </motion.div>
        </motion.div>

        {/* SIH Context Section */}
        <motion.div
          ref={sihRef}
          className="mb-12 bg-white p-6 rounded-xl shadow-lg border border-green-100 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={sihInView ? "visible" : "hidden"}
          style={{ y: yParallax, rotateX: rotateParallax }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-green-300 rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.h2
            className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ scale: 1.05, color: "#166534", rotateX: 10, translateZ: 20 }}
          >
            🌱 An Idea Nurtured at Smart India Hackathon
          </motion.h2>
          <motion.p
            className="text-gray-600 text-justify leading-relaxed"
            variants={itemVariants}
          >
            Nature's Cure was developed as part of the{" "}
            <a
              href="https://www.sih.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Smart India Hackathon (SIH) 2024
            </a>
            , under the problem statement (ID: 1555) by the{" "}
            <strong>Ministry of AYUSH</strong> and the{" "}
            <strong>All India Institute of Ayurveda (AIIA)</strong>. Our challenge was to create a Virtual
            Herbal Garden that offers an interactive, educational, and immersive experience, showcasing the
            diverse medicinal plants of AYUSH. We're proud to contribute to promoting traditional Indian
            herbal knowledge through cutting-edge technology!
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          ref={missionRef}
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 10, color: "#166534", rotateX: 10, translateZ: 20 }}
            transition={{ duration: 0.3 }}
          >
            🌿 Our Mission
          </motion.h2>
          <motion.p
            className="text-gray-600 text-justify leading-relaxed max-w-3xl"
            variants={itemVariants}
          >
            To preserve and promote the rich heritage of Indian medicinal plants by making their knowledge
            accessible to all. Through a digital platform, we aim to educate, engage, and inspire users to
            explore the therapeutic potential of herbs in a fun and immersive way.
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          ref={featuresRef}
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 10, color: "#166534", rotateX: 10, translateZ: 20 }}
            transition={{ duration: 0.3 }}
          >
            ✨ What We Offer
          </motion.h2>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600"
            variants={containerVariants}
          >
            {[
              {
                text: "Interactive 3D Models of Medicinal Plants",
                desc: "Rotate, zoom, and explore realistic plant models.",
              },
              {
                text: "Detailed Plant Information",
                desc: "Learn botanical names, medicinal uses, and cultivation methods.",
              },
              {
                text: "Engaging Quizzes",
                desc: "Test your herbal knowledge with fun challenges.",
              },
              {
                text: "Virtual Tours",
                desc: "Guided tours on themes like immunity and skin care (coming soon).",
              },
              {
                text: "Search & Filter Options",
                desc: "Easily find plants by use, region, or type.",
              },
              {
                text: "Multilingual Support",
                desc: "Access content in multiple languages (coming soon).",
              },
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 bg-green-50 p-4 rounded-lg transition relative"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <motion.span
                  className="text-green-500"
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  🌿
                </motion.span>
                <div>
                  <strong>{feature.text}</strong>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Team Section */}
        <motion.div
          ref={teamRef}
          variants={containerVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 10, color: "#166534", rotateX: 10, translateZ: 20 }}
            transition={{ duration: 0.3 }}
          >
            👨‍💻 Meet Our Team
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              { name: "Mohammad Umar", role: "Full Stack Developer & Team Leader" },
              { name: "Divyanshu Kushwaha", role: "Full Stack Developer" },
              { name: "Saral Singh", role: "Backend Developer" },
              { name: "Hradyansh Dosar", role: "Content & Research Analyst" },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md text-center border border-green-100 relative overflow-hidden"
                variants={teamVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <motion.div
                  className="absolute inset-0 bg-green-50 opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-16 h-16 mx-auto mb-2 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {member.name.charAt(0)}
                </motion.div>
                <h3 className="text-gray-800 font-semibold">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          className="mt-12 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-gray-700 mb-4 text-lg"
            variants={itemVariants}
          >
            Ready to explore the world of medicinal plants like Jamun and more? Start your journey with
            Nature's Cure!
          </motion.p>
          <Link to="/">
            <motion.button
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              variants={ctaVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;