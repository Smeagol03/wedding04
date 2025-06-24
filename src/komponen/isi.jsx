import Pria from "/mempelai/5.jpg";
import Wanita from "/mempelai/6.jpg";
import ShinyText from "../reactbits/ShinyText/ShinyText";
import Particles from "../reactbits/Particles/Particles";

const Isi = () => {
  return (
    <section id="isi" className="bg-black text-white py-20 relative">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={400}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>
      <div className="container mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="font-head font-bold text-2xl md:text-4xl mb-8">
            Assalamu'alaikum Wr. Wb.
          </h2>
          <ShinyText
            text="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
            menyelenggarakan acara pernikahan kami. Merupakan suatu kehormatan
            dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
            untuk memberikan doa restu."
            disabled={false}
            speed={3}
            className="text-[11px] md:text-lg max-w-2xl mb-8 font-utama"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-20 md:gap-36 items-center">
          <div className="flex flex-col items-center ml-0 md:ml-auto">
            <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-yellow-600">
              <img
                src={Pria}
                alt="Groom"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-head text-2xl mb-2">Ahmad Fulan</h3>
            <p className="text-gray-300 text-[11px] font-utama">
              Putra dari Bpk. Lorem & Ibu Ipsum
            </p>
          </div>

          <div className="flex flex-col items-center mr-0 md:mr-auto">
            <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-yellow-600">
              <img
                src={Wanita}
                alt="Bride"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-head text-2xl mb-2">Fulanah</h3>
            <p className="text-gray-300 text-[11px] font-utama">
              Putri dari Bpk. Dolor & Ibu Sit Amet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Isi;
