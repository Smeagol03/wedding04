import React, { useEffect, useState } from "react";
import Couple from "/mempelai/1.jpg";
import GradientText from "../reactbits/GradientText/GradientText";
import RotatingText from "../reactbits/RotatingText/RotatingText";

const Buka = () => {
  // State untuk melacak status musik dan tampilan
  const [isMuted, setIsMuted] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Referensi untuk audio player
  const audioRef = React.useRef(null);

  // Effect untuk menangani refresh halaman dan gulir ke atas
  useEffect(() => {
    // Matikan scroll diawal muat halaman
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll ke atas saat pertama kali dimuat
    window.scrollTo(0, 0);

    // Reset status undangan
    setIsInvitationOpen(false);

    const handleUnload = () => {
      // Stop musik jika ada
      if (audioRef?.current?.pause) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  // Effect untuk menonaktifkan scroll dan mengatur audio
  useEffect(() => {
    // Menonaktifkan scroll
    document.body.style.overflow = "hidden";

    // Membuat elemen audio
    audioRef.current = new Audio("/musik.mp3");
    audioRef.current.loop = true; // Mengatur musik untuk diputar berulang

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Fungsi untuk menangani klik tombol "Buka Undangan"
  const handleOpenInvitation = () => {
    // Mengaktifkan scroll
    document.body.style.overflow = "auto";

    // Menggulir ke section dengan id="isi"
    const isiSection = document.getElementById("isi");
    if (isiSection) {
      isiSection.scrollIntoView({ behavior: "smooth" });
    }

    // Memutar musik
    if (audioRef.current) {
      // Menambahkan event listener untuk mengatasi kebijakan autoplay browser
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented by browser policy:", error);
          // Menampilkan pesan atau UI untuk meminta interaksi pengguna jika diperlukan
        });
      }
    }

    // Mengubah state untuk menampilkan kontrol audio
    setIsInvitationOpen(true);
  };

  // Fungsi untuk mematikan/menghidupkan suara
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Komponen untuk kontrol audio
  const AudioControl = () => {
    if (!isInvitationOpen) return null;

    return (
      <div
        className="fixed bottom-5 right-5 z-50 bg-black/30 backdrop-blur-sm p-2 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-black/50"
        onClick={toggleMute}
      >
        {isMuted ? (
          // Ikon untuk audio muted
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              clipRule="evenodd"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          // Ikon untuk audio playing
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Kontrol Audio */}
      <AudioControl />

      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={Couple}
          alt="Couple background"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      <div className="absolute inset-0 flex gap-2 sm:gap-5 md:gap-[20px] flex-col content-center items-center justify-end z-10 text-white pb-14 md:pb-16 px-4 sm:px-6 md:px-8">
        <GradientText
          colors={["#FFFFFF", "#808080", "#FFFFFF"]}
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
          rotationInterval={4000}
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
          onClick={handleOpenInvitation}
        >
          Buka Undangan
        </button>
      </div>
    </>
  );
};

export default Buka;
