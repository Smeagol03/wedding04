import React from "react";
import CircularGallery from "../reactbits/CircularGallery/CircularGallery";

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-t from-black via-gray-600 to-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-head font-bold text-white mb-4">
            Our Love Journey
          </h2>
          <p className="font-utama text-white max-w-2xl mx-auto">
            Mengabadikan momen-momen berharga dalam perjalanan kami, dari
            pertemuan pertama hingga perjalanan indah ke depan. Setiap foto
            menyimpan kenangan istimewa.
          </p>
        </div>
        {/* taruh gallery disini */}
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
          <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} />
        </div>
        <div className="text-center mt-12">
          <a href="#countdown">
            <button className="text-white text-sm md:text-lg md:font-bold border-2 border-white px-4 py-1 md:px-8 md:py-3 rounded-full hover:bg-white hover:text-black font-utama transition-colors duration-300">
              Menuju Acara
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
