import React from "react";
import Couple from "/mempelai/1.jpg";
import GradientText from "../GradientText/GradientText";
import RotatingText from "../RotatingText/RotatingText";

const Buka = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={Couple}
          alt="Couple background"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      <div className="absolute inset-0 flex gap-2 sm:gap-5 md:gap-[20px] flex-col content-center items-center justify-end z-10 text-white pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-8">
        <GradientText
          colors={[
            "#1E1E1E",
            "#4A4A4A",
            "#808080",
            "#A9A9A9",
            "#D3D3D3",
            "#FFFFFF",
          ]}
          animationSpeed={5}
          showBorder={false}
          className="text-3xl md:text-5xl font-bold text-center font-head"
        >
          Undangan Pernikahan
        </GradientText>
        <RotatingText
          texts={["Pengantin Pria", "&", "Pengantin Wanita", "&"]}
          mainClassName="text-2xl md:text-4xl text-white font-nama overflow-hidden justify-center"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          staggerDuration={0.05}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={4500}
        />
        <div className="space-y-1 p-3 sm:p-4 md:p-5 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-gray-500/30 text-white flex flex-col justify-center items-center rounded-2xl">
          <div className="text-xs sm:text-sm font-bold text-center font-utama">
            Kepada Yth.
          </div>
          <span className="text-base sm:text-lg text-center font-utama">
            Bapak/Ibu/saudara/i
          </span>
        </div>

        <button
          id="buka_undangan"
          className="border border-white hover:bg-white text-white hover:text-black font-semibold px-6 sm:px-7 md:px-8 py-1 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg rounded-full transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl animate-pulse hover:animate-none flex items-center"
        >
          Buka Undangan
        </button>
      </div>
    </>
  );
};

export default Buka;
