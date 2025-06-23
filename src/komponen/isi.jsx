import Pria from "/mempelai/5.jpg";
import Wanita from "/mempelai/6.jpg";
import ShinyText from "../ShinyText/ShinyText";

const Isi = () => {
  return (
    <section id="isi" className="bg-black text-white py-20">
      <div className="container mx-auto px-5 md:px-12">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="font-head text-2xl md:text-4xl mb-8">
            Assalamu'alaikum Wr. Wb.
          </h2>
          <ShinyText
            text="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
            menyelenggarakan acara pernikahan kami. Merupakan suatu kehormatan
            dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
            untuk memberikan doa restu."
            disabled={false}
            speed={3}
            className="text-sm md:text-lg max-w-2xl mb-8 font-utama"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-20 md:gap-0 items-center">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-gold">
              <img
                src={Pria}
                alt="Groom"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-head text-2xl mb-2">Ahmad Fulan</h3>
            <p className="text-gray-300">Putra dari Bpk. Lorem & Ibu Ipsum</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-gold">
              <img
                src={Wanita}
                alt="Bride"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-head text-2xl mb-2">Fulanah</h3>
            <p className="text-gray-300">
              Putri dari Bpk. Dolor & Ibu Sit Amet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Isi;
