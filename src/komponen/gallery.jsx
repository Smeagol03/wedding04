import React from "react";
import CircularGallery from "../reactbits/CircularGallery/CircularGallery";

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-t from-gray-700 via-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-head font-bold text-white mb-4">
            Our Love Journey
          </h2>
          <p className="font-utama text-white max-w-2xl mx-auto">
            Capturing precious moments of our story together, from the first
            meeting to the beautiful journey ahead. Every picture holds a
            special memory of our love.
          </p>
        </div>
        {/* taruh gallery disini */}
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
          <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} />
        </div>
        <div className="text-center mt-12">
          <button className="text-white text-sm md:text-lg md:font-bold border-2 border-white px-4 py-1 md:px-8 md:py-3 rounded-full hover:bg-white hover:text-black font-utama transition-colors duration-300">
            Menuju Acara
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
