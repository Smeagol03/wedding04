import React, { useState, useEffect } from "react";
import Particles from "../reactbits/Particles/Particles";

const HitungMundur = ({ tanggalAcara = "2024-12-31T00:00:00" }) => {
  const [waktuTersisa, setWaktuTersisa] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  // State untuk menandai apakah acara sudah dimulai
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    // Menambahkan flag untuk mencegah memory leak
    let isMounted = true;

    const hitungSelisihWaktu = () => {
      const sekarang = new Date().getTime();
      const targetWaktu = new Date(tanggalAcara).getTime();
      const selisih = targetWaktu - sekarang;

      if (selisih > 0) {
        if (isMounted) {
          setWaktuTersisa({
            hari: Math.floor(selisih / (1000 * 60 * 60 * 24)),
            jam: Math.floor(
              (selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            menit: Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60)),
            detik: Math.floor((selisih % (1000 * 60)) / 1000),
          });
        }
      } else {
        if (isMounted) {
          setWaktuTersisa({ hari: 0, jam: 0, menit: 0, detik: 0 });
          setIsRunning(false); // Acara sudah dimulai
        }
      }
    };

    hitungSelisihWaktu(); // Panggil sekali untuk menghindari delay tampilan awal
    const interval = setInterval(hitungSelisihWaktu, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [tanggalAcara]);

  // Fungsi untuk menambahkan padding nol pada angka di bawah 10
  const formatAngka = (angka) => {
    return angka < 10 ? `0${angka}` : angka;
  };

  return (
    <section
      id="countdown"
      className="py-16 md:py-24 relative overflow-hidden min-h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/80 to-black"></div>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={400}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={30}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-head font-bold text-white mb-4 animate-fade-in-down">
            Menuju Hari Bahagia
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-pink-500 to-yellow-500 mx-auto mb-6 animate-width-expand"></div>
          <p className="text-white/80 font-utama max-w-2xl mx-auto text-sm md:text-base animate-fade-in">
            Kami menantikan kehadiran Anda pada momen spesial pernikahan kami.
            Tandai kalender Anda dan bersiaplah untuk merayakan cinta bersama
            kami.
          </p>
        </div>

        {isRunning ? (
          <div className="flex justify-center items-center flex-wrap gap-2 md:gap-6 mx-auto">
            {/* Unit Hari */}
            <div className="flex flex-col items-center text-center font-utama transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 p-4 shadow-lg mb-2 backdrop-blur-sm border border-white/10">
                <div className="text-lg font-bold text-white drop-shadow-md md:text-5xl">
                  {formatAngka(waktuTersisa.hari)}
                </div>
              </div>
              <div className="text-sm text-white uppercase tracking-wider font-medium md:text-lg">
                Hari
              </div>
            </div>

            {/* Unit Jam */}
            <div className="flex flex-col items-center text-center font-utama transform hover:scale-105 transition-transform duration-300 animate-fade-in">
              <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 p-4 shadow-lg mb-2 backdrop-blur-sm border border-white/10">
                <div className="text-lg font-bold text-white drop-shadow-md md:text-5xl">
                  {formatAngka(waktuTersisa.jam)}
                </div>
              </div>
              <div className="text-sm text-white uppercase tracking-wider font-medium md:text-lg">
                Jam
              </div>
            </div>

            {/* Unit Menit */}
            <div className="flex flex-col items-center text-center font-utama transform hover:scale-105 transition-transform duration-300 animate-fade-in">
              <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 p-4 shadow-lg mb-2 backdrop-blur-sm border border-white/10">
                <div className="text-lg font-bold text-white drop-shadow-md md:text-5xl">
                  {formatAngka(waktuTersisa.menit)}
                </div>
              </div>
              <div className="text-sm text-white uppercase tracking-wider font-medium md:text-lg">
                Menit
              </div>
            </div>

            {/* Unit Detik */}
            <div className="flex flex-col items-center text-center font-utama transform hover:scale-105 transition-transform duration-300 animate-fade-in">
              <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 p-4 shadow-lg mb-2 backdrop-blur-sm border border-white/10">
                <div className="text-lg font-bold text-white drop-shadow-md md:text-5xl">
                  {formatAngka(waktuTersisa.detik)}
                </div>
              </div>
              <div className="text-sm text-white uppercase tracking-wider font-medium md:text-lg">
                Detik
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 max-w-4xl mx-auto text-center animate-fade-in">
            <div className="text-3xl md:text-4xl font-utama font-bold text-white mb-4 animate-fade-in-down">
              Acara Telah Dimulai!
            </div>
            <div className="h-0.5 w-24 bg-gradient-to-r from-pink-500 to-yellow-500 mx-auto mb-6 animate-width-expand"></div>
            <p className="text-white/80 font-utama mb-8 max-w-2xl mx-auto">
              Terima kasih atas partisipasi dan doa Anda untuk momen bahagia
              kami. Kami harap Anda menikmati momen spesial ini bersama kami.
            </p>
            <div className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 p-px rounded-full transform hover:scale-105 transition-all duration-300">
              <button className="bg-black/80 hover:bg-black/60 transition-colors duration-300 text-white py-3 px-8 rounded-full inline-block">
                Lihat Galeri Foto
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 p-px rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg">
            <a
              href={`https://www.google.com/calendar/render?action=TEMPLATE&text=Acara+Pernikahan&dates=${tanggalAcara
                .replace(/[-:]/g, "")
                .replace("T", "/")}Z&details=Lokasi+acara+dan+detail+lainnya`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/80 hover:bg-black/60 transition-colors duration-300 text-white py-3 px-8 rounded-full inline-block font-utama font-medium"
            >
              Tambahkan ke Kalender
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HitungMundur;
