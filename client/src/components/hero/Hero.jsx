import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const blobRefs = useRef([]);
  const chatBubbleRefs = useRef([]);

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Background blob animations
      blobRefs.current.forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? 30 : -20,
          y: i % 2 === 0 ? -40 : 30,
          duration: 10 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Chat bubble animations
      chatBubbleRefs.current.forEach((bubble, i) => {
        gsap.from(bubble, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: i * 0.2,
          ease: "back.out(1.7)",
        });
      });

      // Hero text animations
      gsap.from(".hero-title span", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.1,
      });

      gsap.from(".hero-users", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.4,
      });

      // Feature card animations
      gsap.utils.toArray(".feature-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "back.out(1.2)",
        });
      });

      // Chat window animation
      gsap.from(".chat-window", {
        scrollTrigger: {
          trigger: ".chat-window",
          start: "top bottom",
          toggleActions: "play none none none",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // CTA section animation
      gsap.from(".cta-section", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Floating animation for chat window
      gsap.to(".chat-window", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Hover effects for buttons
      const buttons = gsap.utils.toArray(".hover-effect");
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Hover effects for feature cards
      const cards = gsap.utils.toArray(".feature-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.3,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            duration: 0.3,
          });
        });
      });
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden relative"
    >
      {/* Animated background elements */}
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="fixed -top-20 -left-20 w-96 h-96 bg-indigo-100 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"
      ></div>
      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="fixed -bottom-20 -right-20 w-96 h-96 bg-purple-100 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"
      ></div>
      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="fixed top-1/2 right-1/4 w-64 h-64 bg-pink-100 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"
      ></div>

      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-10"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                <span className="hero-title block">
                  <span className="inline-block text-indigo-600">Smarter</span>
                </span>
                <span className="hero-title block">
                  <span className="inline-block">connections,</span>
                </span>
                <span className="hero-title block">
                  <span className="inline-block">better conversations</span>
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg hero-subtitle">
                ChatiFy transforms how you communicate with everyone in your
                life - from colleagues to family. Enjoy seamless, fun
                interactions with our intuitive platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center font-medium shadow-lg hover:shadow-xl hover-effect"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/demo"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-center font-medium hover-effect"
                >
                  Live Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center hero-users">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((item) => (
                    <img
                      key={item}
                      src={`https://randomuser.me/api/portraits/${
                        item % 2 === 0 ? "women" : "men"
                      }/${item + 20}.jpg`}
                      className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 transition-transform duration-300"
                      alt="User"
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    Join <span className="font-semibold">10,000+</span> happy
                    users
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600 ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative max-w-md mx-auto chat-window">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-transform duration-300 hover:shadow-2xl">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                      chatify.com/demo
                    </div>
                  </div>
                  <div className="p-4">
                    <div
                      ref={(el) => (chatBubbleRefs.current[0] = el)}
                      className="flex items-start mb-4"
                    >
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        className="w-10 h-10 rounded-full mr-3 hover:rotate-6 transition-transform"
                        alt="User"
                      />
                      <div className="bg-gray-100 p-3 rounded-lg max-w-xs hover:scale-105 transition-transform">
                        <p className="text-gray-800">
                          Hey team! Just wanted to share the new design mockups
                          🎨
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Sarah - 2:34 PM
                        </p>
                      </div>
                    </div>
                    <div
                      ref={(el) => (chatBubbleRefs.current[1] = el)}
                      className="flex items-start justify-end mb-4"
                    >
                      <div className="bg-indigo-600 text-white p-3 rounded-lg max-w-xs hover:scale-105 transition-transform">
                        <p>Looks amazing! The color scheme is perfect 👌</p>
                        <p className="text-xs text-indigo-100 mt-1">
                          You - 2:36 PM
                        </p>
                      </div>
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        className="w-10 h-10 rounded-full ml-3 hover:-rotate-6 transition-transform"
                        alt="User"
                      />
                    </div>
                    <div
                      ref={(el) => (chatBubbleRefs.current[2] = el)}
                      className="flex items-start mb-4"
                    >
                      <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        className="w-10 h-10 rounded-full mr-3 hover:rotate-6 transition-transform"
                        alt="User"
                      />
                      <div className="bg-gray-100 p-3 rounded-lg max-w-xs hover:scale-105 transition-transform">
                        <p className="text-gray-800">
                          I've added the files to the shared drive. Let me know
                          your thoughts!
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Mike - 2:38 PM
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="w-full bg-gray-50 rounded-full py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:scale-[1.02] transition-transform"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <button className="text-gray-400 hover:text-indigo-600 hover:scale-125 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-indigo-600 hover:scale-125 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <button className="text-indigo-600 hover:scale-125 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Powerful features for better conversations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ChatiFy comes packed with everything you need to communicate
                effectively
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-indigo-600 hover:scale-125 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  ),
                  title: "Real-time messaging",
                  description:
                    "Instant message delivery with read receipts and typing indicators.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-indigo-600 hover:scale-125 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "Video & voice calls",
                  description:
                    "High quality video and audio calls with screen sharing.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-indigo-600 hover:scale-125 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  ),
                  title: "Organized channels",
                  description:
                    "Create channels for different topics, projects or teams.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-indigo-600 hover:scale-125 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  ),
                  title: "End-to-end encryption",
                  description:
                    "Your conversations are secure and private by default.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-indigo-600 hover:scale-125 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  ),
                  title: "Custom themes",
                  description:
                    "Personalize your chat experience with custom colors.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-indigo-600 hover:scale-125 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  ),
                  title: "File sharing",
                  description:
                    "Share files of any type with built-in previews.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition feature-card border border-gray-100 hover:border-indigo-100"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 cta-section bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your communication?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams and individuals who communicate better
              with ChatiFy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition font-medium shadow-lg hover-effect hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <Link
                to="/demo"
                className="px-8 py-3 border border-white text-white rounded-lg hover:bg-indigo-700 transition font-medium hover-effect"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Hero;
