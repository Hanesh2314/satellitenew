import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Satellite3D from "@/components/Satellite3D";
import AboutUsEditor from "@/components/AboutUsEditor";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
