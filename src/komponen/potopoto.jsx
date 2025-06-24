import React from "react";

const items = [
  {
    id: "1",
    img: "/mempelai/1.jpg",
  },
  {
    id: "2",
    img: "/mempelai/2.jpg",
  },
  {
    id: "3",
    img: "/mempelai/3.jpg",
  },
  {
    id: "4",
    img: "/mempelai/4.jpg",
  },
  {
    id: "5",
    img: "/mempelai/5.jpg",
  },
  {
    id: "6",
    img: "/mempelai/6.jpg",
  },
  {
    id: "7",
    img: "/mempelai/7.jpg",
  },
  {
    id: "8",
    img: "/mempelai/8.jpg",
  },
  {
    id: "9",
    img: "/mempelai/9.jpg",
  },
];

const Poto = () => {
  return (
    <section
      id="poto"
      className="relative py-8 bg-gradient-to-b from-black to-purple-900"
    >
      <div className="container mx-auto px-4 font-utama">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-head">
            Our Gallery
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <img
                src={item.img}
                alt={`Mempelai ${item.id}`}
                className="w-full h-60 object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Poto;
