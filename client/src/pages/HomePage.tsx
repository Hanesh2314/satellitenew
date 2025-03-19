import { useCallback, useState, useEffect } from "react";
import { useLocation } from "wouter";
import Satellite3D from "@/components/Satellite3D";
import AboutUsEditor from "@/components/AboutUsEditor";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HomePage = () => {
  const [, navigate] = useLocation();
  const [glowIntensity, setGlowIntensity] = useState(1);
  
  // Animation effect for the button glow
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.5 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinTeam = useCallback(() => {
    navigate("/confirmation");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-stellar-dark text-white relative">
      <StarBackground />
      
      <div className="container mx-auto px-4 py-10 z-10 relative">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              RESEARCH SATELLITE TEAM
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Join our mission to design and build cutting-edge satellite technology
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={handleJoinTeam}
              className="bg-stellar-blue hover:bg-stellar-blue/90 text-white px-8 py-3 rounded-full text-lg"
              style={{
                boxShadow: `0 0 ${glowIntensity * 20}px ${glowIntensity * 10}px rgba(66, 153, 225, 0.6)`
              }}
            >
              Join Our Team
            </Button>
          </motion.div>

          <div className="mt-12 w-full max-w-4xl">
            <Satellite3D />
          </div>

          <div className="mt-16">
            <AboutUsEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
