import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/delivery.json";
import { Typewriter } from "react-simple-typewriter";
import { Autoplay } from "swiper/modules";
const About = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center px-4 py-10">
      <div className="max-w-4xl w-full flex flex-col gap-8 items-center">
        {/* Image at the top */}
        <Lottie className="" animationData={animation} loop={true} />

        {/* Text below */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            <Typewriter
              words={["About Us"]}
              loop={true} 
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={100}
            />
          </h1>
          <p className="text-base-content text-lg leading-relaxed mb-3">
            Welcome to <span className="font-semibold">FoodShare</span> — a
            platform dedicated to reducing food waste and helping communities.
            We connect donors with surplus food to people who need it.
          </p>
          <p className="text-base-content text-lg leading-relaxed">
            Our mission is to build a bridge between generosity and need,
            ensuring no good food goes to waste. Join us in making a difference
            today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
