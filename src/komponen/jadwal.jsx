import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaRing,
  FaGlassCheers,
} from "react-icons/fa";
import { MdLocationOn, MdDateRange, MdAccessTime } from "react-icons/md";
import Aurora from "../reactbits/Aurora/Aurora";

const Jadwal = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={1}
          amplitude={0.2}
          speed={1.5}
        />
        {/* <div className="absolute -top-36 -left-24 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse opacity-10"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl animate-pulse opacity-10"></div>
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse opacity-10"></div> */}
      </div>

      <div className="container relative mx-auto px-4 py-10 text-white z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 font-head">Jadwal Acara</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto font-utama">
            Kami mengundang Anda untuk berbagi momen bahagia dalam perayaan
            cinta kami
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group border border-white/20 font-utama">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-purple-600/80 opacity-10 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-full mr-4">
                      <FaRing className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold font-head">
                      Akad Nikah
                    </h3>
                  </div>
                  <span className="bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Sakral
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-full mr-4">
                      <MdDateRange className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Tanggal</p>
                      <p className="text-white font-semibold text-sm">
                        24 Juli 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-full mr-4">
                      <MdAccessTime className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Waktu</p>
                      <p className="text-white font-semibold text-sm">
                        08:00 - 10:00 WIB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-full mr-4">
                      <MdLocationOn className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Lokasi</p>
                      <p className="text-white font-semibold text-sm">
                        Masjid Agung
                      </p>
                      <p className="text-white/70 text-sm">
                        Jl. Pemuda No. 123, Jakarta Pusat
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 flex items-center justify-center group-hover:bg-white/30">
                  <FaMapMarkerAlt className="mr-2" /> Lihat Lokasi
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group border border-white/20 font-utama">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-600/80 opacity-10 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-full mr-4">
                      <FaGlassCheers className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold font-head">
                      Resepsi
                    </h3>
                  </div>
                  <span className="bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Perayaan
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-full mr-4">
                      <MdDateRange className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Tanggal</p>
                      <p className="text-white font-semibold text-sm">
                        24 Juli 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-full mr-4">
                      <MdAccessTime className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Waktu</p>
                      <p className="text-white font-semibold text-sm">
                        11:00 - 15:00 WIB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-full mr-4">
                      <MdLocationOn className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Lokasi</p>
                      <p className="text-white font-semibold text-sm">
                        Grand Ballroom Hotel Mulia
                      </p>
                      <p className="text-white/70 text-sm">
                        Jl. Asia Afrika No. 456, Jakarta Selatan
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 flex items-center justify-center group-hover:bg-white/30">
                  <FaMapMarkerAlt className="mr-2" /> Lihat Lokasi
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center font-utama">
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-12 bg-white/30"></div>
            <FaHeart className="mx-4 text-pink-500 animate-pulse" />
            <div className="h-px w-12 bg-white/30"></div>
          </div>
          <p className="mt-6 text-white/80 italic max-w-lg mx-auto">
            "Kehadiran dan doa restu Anda merupakan hadiah terindah bagi kami"
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center mx-auto">
              <FaCalendarAlt className="mr-2" /> Tambahkan ke Kalender
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jadwal;
