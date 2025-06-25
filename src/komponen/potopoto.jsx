import { EmojiPicker } from "frimousse";
import { useState } from "react";

// Komponen EmojiCounter untuk menampilkan emoji dengan counter
export function EmojiCounter() {
  // State untuk menyimpan emoji yang tersedia
  const [emojiCounts, setEmojiCounts] = useState({
    "❤️": 0,
    "👍": 0,
    "👏": 0,
    "🎉": 0,
    "😍": 0,
    "🥰": 0,
  });

  // State untuk menampilkan animasi dan pesan
  const [lastClicked, setLastClicked] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [lastEmojiClicked, setLastEmojiClicked] = useState(null);

  // Pesan yang akan ditampilkan saat emoji diklik
  const messages = {
    "❤️": "Terima kasih atas cintanya!",
    "👍": "Terima kasih atas dukungannya!",
    "👏": "Terima kasih atas apresiasinya!",
    "🎉": "Mari rayakan bersama!",
    "😍": "Terima kasih atas kebahagiaannya!",
    "🥰": "Terima kasih atas kasih sayangnya!",
    reset: "Semua reaksi telah direset!",
  };

  // State untuk animasi pop
  const [popEmoji, setPopEmoji] = useState(null);

  // State untuk waktu terakhir reset dan klik
  const [lastResetTime, setLastResetTime] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(null);

  // Fungsi untuk menampilkan pesan saat emoji diklik (tanpa menambah hitungan)
  const incrementCount = (emoji) => {
    // Tampilkan pesan (tanpa batas waktu)
    setLastClicked(emoji);
    setMessageText(messages[emoji]);
    setShowMessage(true);
    setLastEmojiClicked(emoji);
    setLastClickTime(new Date().toLocaleTimeString());

    // Animasi pop
    setPopEmoji(emoji);
    setTimeout(() => {
      setPopEmoji(null);
    }, 300);

    // Tambahkan emoji yang melayang
    addFloatingEmoji(emoji);
  };

  // Fungsi untuk mereset semua hitungan emoji
  const resetAllCounts = () => {
    // Reset emojiCounts ke nilai awal
    const resetCounts = {
      "❤️": 0,
      "👍": 0,
      "👏": 0,
      "🎉": 0,
      "😍": 0,
      "🥰": 0,
    };
    setEmojiCounts(resetCounts);

    // Tampilkan pesan reset
    setMessageText(messages.reset);
    setShowMessage(true);
    setLastResetTime(new Date().toLocaleTimeString());
    setLastClicked(null);
  };

  // State untuk emoji yang melayang
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  // Fungsi untuk menambahkan emoji yang melayang
  const addFloatingEmoji = (emoji) => {
    const id = Date.now();
    const newEmoji = {
      id,
      emoji,
      left: Math.random() * 80 + 10, // Posisi horizontal acak (10-90%)
    };

    setFloatingEmojis((prev) => [...prev, newEmoji]);

    // Menghapus emoji setelah animasi selesai
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-3">
        {Object.entries(emojiCounts).map(([emoji, count], index) => (
          <button
            key={emoji}
            onClick={() => incrementCount(emoji)}
            className={`flex flex-col items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-md ${
              popEmoji === emoji ? "animate-[pop_0.3s_ease-out]" : ""
            }`}
          >
            <span className="text-2xl mb-1">{emoji}</span>
          </button>
        ))}
      </div>

      {/* Tombol reset */}
      <div className="mt-4 text-center">
        {Object.values(emojiCounts).some((count) => count > 0) && (
          <button
            onClick={resetAllCounts}
            className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20 shadow-md transition-all duration-300 hover:bg-white/15 hover:scale-105 text-white text-xs flex items-center gap-1 mx-auto"
          >
            <span className="text-xs">🔄</span> Reset Semua Reaksi
          </button>
        )}
      </div>

      {/* Emoji yang melayang */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingEmojis.map((item) => (
          <div
            key={item.id}
            className="absolute bottom-0 text-2xl animate-[floatUp_2s_ease-out_forwards]"
            style={{ left: `${item.left}%` }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Pesan feedback */}
      {showMessage && (
        <div className="mt-4 text-center animate-[fadeIn_0.3s_ease-out_forwards]">
          <p className="text-white bg-white/10 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-white/20 shadow-md">
            {messageText}
          </p>
        </div>
      )}
    </div>
  );
}

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
      className="relative py-8 bg-gradient-to-b from-black to-purple-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 font-utama z-20 relative">
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

        {/* Emoji Counter Section */}
        <div className="mt-12 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white font-head">
              Berikan Reaksi Anda
            </h3>
            <p className="text-white/70 mt-2">
              Klik emoji untuk menambahkan reaksi
            </p>
          </div>
          <EmojiCounter />
        </div>
      </div>
    </section>
  );
};

export default Poto;
