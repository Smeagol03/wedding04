import { useState, useEffect } from "react";
import { database } from "./firebase";
import {
  ref,
  push,
  set,
  onValue,
  serverTimestamp,
  remove,
} from "firebase/database";

const Komentar = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    isSuccess: false,
    message: "",
  });

  // Fungsi untuk memformat waktu
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fungsi untuk membersihkan log keamanan yang sudah lama
  const cleanupSecurityLogs = () => {
    try {
      const logs = JSON.parse(localStorage.getItem("securityLog") || "[]");

      if (logs.length === 0) return;

      // Hapus log yang lebih dari 7 hari
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const filteredLogs = logs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate >= sevenDaysAgo;
      });

      localStorage.setItem("securityLog", JSON.stringify(filteredLogs));
    } catch (error) {
      console.error("Error cleaning up security logs:", error);
    }
  };

  // Fungsi untuk menghapus komentar (untuk admin)
  const handleDeleteComment = async (commentId) => {
    if (
      !commentId ||
      !window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")
    ) {
      return;
    }

    try {
      // Referensi ke komentar yang akan dihapus
      const commentRef = ref(database, `komentar_react/${commentId}`);

      // Hapus komentar
      await remove(commentRef);

      // Catat aktivitas penghapusan di log keamanan
      logSuspiciousAttempt("Admin menghapus komentar", { commentId });

      // Tampilkan notifikasi sukses
      setSubmitStatus({
        show: true,
        isSuccess: true,
        message: "Komentar berhasil dihapus",
      });
      setTimeout(
        () => setSubmitStatus({ show: false, isSuccess: false, message: "" }),
        3000
      );
    } catch (error) {
      console.error("Error deleting comment:", error);

      // Tampilkan notifikasi error
      setSubmitStatus({
        show: true,
        isSuccess: false,
        message: "Gagal menghapus komentar: " + error.message,
      });
      setTimeout(
        () => setSubmitStatus({ show: false, isSuccess: false, message: "" }),
        3000
      );
    }
  };

  // Fungsi untuk mengekspor log keamanan (untuk admin)
  const exportSecurityLogs = () => {
    try {
      const logs = JSON.parse(localStorage.getItem("securityLog") || "[]");

      if (logs.length === 0) {
        alert("Tidak ada log keamanan untuk diekspor.");
        return;
      }

      // Buat file untuk diunduh
      const dataStr = JSON.stringify(logs, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `security-logs-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Error exporting security logs:", error);
      alert("Gagal mengekspor log keamanan.");
    }
  };

  // Mengambil data komentar dari Firebase dan membersihkan log lama
  useEffect(() => {
    // Ambil data komentar dari Firebase
    const commentsRef = ref(database, "komentar_react");

    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      const commentsList = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          commentsList.push({
            id: key,
            ...data[key],
          });
        });

        // Urutkan komentar berdasarkan waktu (terbaru di atas)
        commentsList.sort((a, b) => b.timestamp - a.timestamp);
      }

      setComments(commentsList);
    });

    // Bersihkan log keamanan yang sudah lama
    cleanupSecurityLogs();

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Fungsi untuk sanitasi input
  const sanitizeInput = (input) => {
    if (typeof input !== "string") return "";

    // Menghapus tag HTML untuk mencegah XSS
    const sanitized = input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");

    return sanitized;
  };

  // Fungsi untuk mencegah NoSQL Injection
  const preventNoSQLInjection = (input) => {
    if (typeof input !== "string") return "";

    // Mencegah karakter khusus yang dapat digunakan untuk NoSQL Injection
    // Menghapus operator Firebase seperti '.', '$', '[', ']', '#', '/'
    const sanitized = input
      .replace(/\./g, "")
      .replace(/\$/g, "")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/#/g, "")
      .replace(/\//g, "");

    return sanitized;
  };

  // Fungsi untuk mencegah Command Injection
  const preventCommandInjection = (input) => {
    if (typeof input !== "string") return "";

    // Mencegah karakter yang dapat digunakan untuk Command Injection
    const sanitized = input
      .replace(/;/g, "")
      .replace(/\|/g, "")
      .replace(/&/g, "")
      .replace(/`/g, "");

    return sanitized;
  };

  // Deteksi konten berbahaya atau tidak pantas
  const detectInappropriateContent = (text) => {
    if (typeof text !== "string") return { isInappropriate: false, reason: "" };

    // Ubah ke lowercase untuk perbandingan yang tidak case-sensitive
    const lowerText = text.toLowerCase();

    // 1. Deteksi spam
    // Daftar kata kunci yang sering digunakan dalam spam
    const spamKeywords = [
      "casino",
      "lottery",
      "viagra",
      "cialis",
      "porn",
      "free money",
      "make money fast",
      "earn money online",
      "bitcoin investment",
      "forex trading",
      "cheap meds",
      "replica watches",
      "weight loss",
      "enlargement",
      "dating site",
    ];

    // Periksa apakah teks mengandung kata kunci spam
    for (const keyword of spamKeywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return { isInappropriate: true, reason: "spam", keyword };
      }
    }

    // Periksa terlalu banyak URL (indikasi spam)
    const urlCount = (lowerText.match(/(https?:\/\/[^\s]+)/g) || []).length;
    if (urlCount > 2) {
      return { isInappropriate: true, reason: "too_many_urls" };
    }

    // Periksa terlalu banyak karakter berulang (indikasi spam)
    const repeatedChars = /([a-zA-Z0-9])\1{4,}/;
    if (repeatedChars.test(lowerText)) {
      return { isInappropriate: true, reason: "repeated_chars" };
    }

    // 2. Deteksi kata-kata kasar atau tidak pantas
    // Daftar kata-kata kasar atau tidak pantas (disesuaikan dengan kebutuhan)
    const inappropriateWords = [
      "anjing",
      "bangsat",
      "brengsek",
      "kampret",
      "tolol",
      "goblok",
      "bodoh",
      "idiot",
      "sial",
      "bajingan",
      "kontol",
      "memek",
      "ngentot",
      "fuck",
      "shit",
      "damn",
      "bitch",
      "asshole",
      "bastard",
      "cunt",
    ];

    // Periksa apakah teks mengandung kata-kata kasar
    for (const word of inappropriateWords) {
      // Gunakan regex untuk mencocokkan kata utuh, bukan bagian dari kata lain
      const regex = new RegExp(`\\b${word}\\b`, "i");
      if (regex.test(lowerText)) {
        return {
          isInappropriate: true,
          reason: "inappropriate_language",
          word,
        };
      }
    }

    // 3. Deteksi konten sensitif
    // Daftar kata kunci sensitif (politik, SARA, dll)
    const sensitiveKeywords = [
      "politik",
      "agama",
      "ras",
      "suku",
      "etnis",
      "diskriminasi",
      "radikal",
      "teroris",
      "komunis",
      "fasisme",
      "nazi",
    ];

    // Periksa apakah teks mengandung kata kunci sensitif
    for (const keyword of sensitiveKeywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return { isInappropriate: true, reason: "sensitive_content", keyword };
      }
    }

    return { isInappropriate: false, reason: "" };
  };

  // Fungsi untuk menyensor kata-kata tidak pantas
  const censorInappropriateWords = (text) => {
    if (typeof text !== "string") return "";

    // Daftar kata-kata kasar atau tidak pantas
    const inappropriateWords = [
      "anjing",
      "bangsat",
      "brengsek",
      "kampret",
      "tolol",
      "goblok",
      "bodoh",
      "idiot",
      "sial",
      "bajingan",
      "kontol",
      "memek",
      "ngentot",
      "fuck",
      "shit",
      "damn",
      "bitch",
      "asshole",
      "bastard",
      "cunt",
    ];

    let censoredText = text;

    // Ganti kata-kata tidak pantas dengan sensor
    for (const word of inappropriateWords) {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      censoredText = censoredText.replace(regex, "*".repeat(word.length));
    }

    return censoredText;
  };

  // Validasi input
  const validateInput = (input, type) => {
    if (typeof input !== "string" || !input.trim()) {
      return { valid: false, message: `${type} tidak boleh kosong!` };
    }

    // Batasi panjang input
    const maxLength = type === "Nama" ? 50 : 500;
    if (input.length > maxLength) {
      return {
        valid: false,
        message: `${type} terlalu panjang (maksimal ${maxLength} karakter)`,
      };
    }

    // Validasi tambahan untuk nama (opsional)
    if (type === "Nama") {
      // Contoh: hanya huruf, angka, dan spasi yang diperbolehkan
      if (!/^[\p{L}\p{N}\s.,'-]+$/u.test(input)) {
        return {
          valid: false,
          message:
            "Nama hanya boleh berisi huruf, angka, dan beberapa karakter khusus",
        };
      }

      // Deteksi kata-kata tidak pantas pada nama
      const inappropriateCheck = detectInappropriateContent(input);
      if (inappropriateCheck.isInappropriate) {
        if (inappropriateCheck.reason === "inappropriate_language") {
          return {
            valid: false,
            message: "Nama mengandung kata yang tidak pantas",
          };
        } else if (inappropriateCheck.reason === "sensitive_content") {
          return { valid: false, message: "Nama mengandung konten sensitif" };
        }
      }
    }

    // Deteksi konten tidak pantas untuk pesan
    if (type === "Pesan") {
      const inappropriateCheck = detectInappropriateContent(input);
      if (inappropriateCheck.isInappropriate) {
        let message = "Pesan tidak dapat dikirim";

        switch (inappropriateCheck.reason) {
          case "spam":
            message = "Pesan terdeteksi sebagai spam";
            break;
          case "too_many_urls":
            message = "Pesan mengandung terlalu banyak URL";
            break;
          case "repeated_chars":
            message = "Pesan mengandung terlalu banyak karakter berulang";
            break;
          case "inappropriate_language":
            message = "Pesan mengandung kata yang tidak pantas";
            break;
          case "sensitive_content":
            message = "Pesan mengandung konten sensitif";
            break;
        }

        return { valid: false, message };
      }
    }

    return { valid: true, message: "" };
  };

  // Fungsi untuk mencatat upaya mencurigakan
  const logSuspiciousAttempt = (reason, inputData) => {
    try {
      // Ambil log yang sudah ada atau buat array baru jika belum ada
      const existingLog = JSON.parse(
        localStorage.getItem("securityLog") || "[]"
      );

      // Batasi jumlah log (simpan maksimal 50 entri)
      if (existingLog.length >= 50) {
        existingLog.shift(); // Hapus entri tertua
      }

      // Tambahkan entri baru
      existingLog.push({
        timestamp: new Date().toISOString(),
        reason: reason,
        inputData: inputData,
        userAgent: navigator.userAgent.substring(0, 100),
      });

      // Simpan kembali ke localStorage
      localStorage.setItem("securityLog", JSON.stringify(existingLog));
    } catch (error) {
      console.error("Error logging suspicious attempt:", error);
    }
  };

  // Mengirim komentar ke Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    const nameValidation = validateInput(name, "Nama");
    const messageValidation = validateInput(message, "Pesan");

    // Catat upaya mencurigakan jika validasi gagal
    if (!nameValidation.valid) {
      logSuspiciousAttempt(nameValidation.message, { name });
      setSubmitStatus({
        show: true,
        isSuccess: false,
        message: nameValidation.message,
      });
      setTimeout(
        () => setSubmitStatus({ show: false, isSuccess: false, message: "" }),
        3000
      );
      return;
    }

    if (!messageValidation.valid) {
      logSuspiciousAttempt(messageValidation.message, { message });
      setSubmitStatus({
        show: true,
        isSuccess: false,
        message: messageValidation.message,
      });
      setTimeout(
        () => setSubmitStatus({ show: false, isSuccess: false, message: "" }),
        3000
      );
      return;
    }

    // Deteksi pola mencurigakan tambahan
    if (name.length > 30 && message.length < 10) {
      logSuspiciousAttempt(
        "Pola mencurigakan: nama panjang dengan pesan pendek",
        { name, message }
      );
    }

    if (
      name.toLowerCase().includes("admin") ||
      name.toLowerCase().includes("administrator")
    ) {
      logSuspiciousAttempt("Mencoba menggunakan nama admin", { name });
    }

    setIsSubmitting(true);

    try {
      // Sanitasi input sebelum disimpan ke database
      // Terapkan beberapa lapisan keamanan
      let securedName = name;
      let securedMessage = message;

      // 1. Sanitasi untuk mencegah XSS
      securedName = sanitizeInput(securedName);
      securedMessage = sanitizeInput(securedMessage);

      // 2. Mencegah NoSQL Injection
      securedName = preventNoSQLInjection(securedName);

      // 3. Mencegah Command Injection
      securedName = preventCommandInjection(securedName);
      securedMessage = preventCommandInjection(securedMessage);

      // Jika setelah sanitasi nama menjadi kosong, gunakan nilai default
      if (!securedName.trim()) {
        securedName = "Tamu";
      }

      // Rate limiting - cek apakah pengguna sudah mengirim komentar dalam 30 detik terakhir
      const now = new Date().getTime();
      const lastSubmitTime = localStorage.getItem("lastCommentSubmitTime");

      if (lastSubmitTime && now - parseInt(lastSubmitTime) < 30000) {
        throw new Error("Mohon tunggu 30 detik sebelum mengirim komentar lagi");
      }

      // Sensor kata-kata tidak pantas sebelum menyimpan ke database
      const censoredName = censorInappropriateWords(securedName);
      const censoredMessage = censorInappropriateWords(securedMessage);

      const commentsRef = ref(database, "komentar_react");
      const newCommentRef = push(commentsRef);

      await set(newCommentRef, {
        name: censoredName,
        message: censoredMessage,
        timestamp: serverTimestamp(),
        clientTimestamp: Date.now(), // Timestamp dari client untuk backup
        userAgent: navigator.userAgent.substring(0, 100), // Simpan informasi browser untuk keamanan (dibatasi 100 karakter)
        censored:
          censoredName !== securedName || censoredMessage !== securedMessage, // Flag jika konten disensor
      });

      // Simpan waktu submit terakhir untuk rate limiting
      localStorage.setItem("lastCommentSubmitTime", now.toString());

      setName("");
      setMessage("");
      setSubmitStatus({
        show: true,
        isSuccess: true,
        message: "Terima kasih! Ucapan Anda telah terkirim.",
      });
      setTimeout(
        () => setSubmitStatus({ show: false, isSuccess: false, message: "" }),
        3000
      );
    } catch (error) {
      console.error("Error adding comment:", error);
      setSubmitStatus({
        show: true,
        isSuccess: false,
        message: error.message || "Gagal mengirim ucapan. Silakan coba lagi.",
      });
      setTimeout(
        () => setSubmitStatus({ show: false, isSuccess: false, message: "" }),
        3000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // State untuk menampilkan panel admin
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Fungsi munculin panel admin
  useEffect(() => {
    // Kode Konami: atas, atas, bawah, bawah, kiri, kanan, kiri, kanan, b, a
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const salahCheatHehe = (e) => {
      // Reset jika tombol yang ditekan tidak sesuai dengan kode
      if (e.key !== konamiCode[konamiIndex]) {
        konamiIndex = 0;
        return;
      }

      // Tingkatkan indeks jika tombol benar
      konamiIndex++;

      // Jika semua tombol sudah ditekan dengan benar, tampilkan panel admin
      if (konamiIndex === konamiCode.length) {
        setShowAdminPanel(true);
        konamiIndex = 0;
      }
    };

    // Tambahkan event listener
    window.addEventListener("keydown", salahCheatHehe);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", salahCheatHehe);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-red-500 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Panel Admin (tersembunyi secara default) */}
      {showAdminPanel && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Panel Admin</h3>
            <p className="text-sm">Akses terbatas hanya untuk admin</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportSecurityLogs}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Ekspor Log Keamanan
            </button>
            <button
              onClick={() => setShowAdminPanel(false)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-10">
        <h1 className="text-4xl font-bold text-white mb-10 font-head tracking-wide">
          Ucapan & Doa
        </h1>
      </div>
      {/* Comment Input Section */}
      <div className="relative max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-[1.01]">
        <div className="hidden md:flex absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 items-center justify-center text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-white font-head tracking-wide">
          Kirim Ucapan
        </h2>
        <form id="commentForm" className="space-y-6 font-utama text-sm">
          <div>
            <label htmlFor="name" className="block text-white/80 mb-3">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Nama"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-white/80 mb-3 text-lg"
            >
              Ucapan & Doa
            </label>
            <textarea
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Ucapan dan doa"
            ></textarea>
          </div>
          {submitStatus.show && (
            <div
              className={`p-3 rounded-lg text-white text-center ${
                submitStatus.isSuccess ? "bg-green-500/50" : "bg-red-500/50"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
            <span>{isSubmitting ? "Mengirim..." : "Kirim Ucapan"}</span>
          </button>
        </form>
      </div>

      {/* Comments Display Section */}
      <div className="relative max-w-2xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold mb-8 text-white font-head tracking-wide flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Ucapan Tamu
        </h2>

        {/* komen muncul disini */}
        <div
          id="komentarDisini"
          className="space-y-6 max-h-[500px] overflow-y-auto p-4 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar]:w-2"
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white/10 backdrop-blur-md px-3 py-6 rounded-2xl shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl"
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex flex-col items-start mb-4">
                      <div className="flex justify-between w-full">
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold text-white">
                            {comment.name}
                          </h3>
                          {comment.censored && (
                            <span className="ml-2 px-1 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                              Disensor
                            </span>
                          )}
                        </div>
                        {showAdminPanel && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-400 hover:text-red-300 text-sm ml-2"
                            title="Hapus komentar ini"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      <span className="text-white/60 text-sm">
                        {formatTime(comment.timestamp)}
                      </span>
                    </div>
                    <div className="relative">
                      <p
                        className="text-white/80 italic font-utama text-sm"
                        dangerouslySetInnerHTML={{
                          __html: comment.message
                            // Pastikan komentar yang ditampilkan sudah disanitasi
                            // Jika komentar lama belum disanitasi, lakukan sanitasi tambahan di sini
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            // Ubah URL menjadi link yang dapat diklik
                            .replace(
                              /(https?:\/\/[^\s]+)/g,
                              '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-pink-300 hover:underline">$1</a>'
                            )
                            // Ubah emoji text menjadi emoji sebenarnya
                            .replace(/:\)/g, "😊")
                            .replace(/:\(/g, "😢")
                            .replace(/<3/g, "❤️"),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-white/70 italic">
                Belum ada ucapan. Jadilah yang pertama memberikan ucapan!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Komentar;
