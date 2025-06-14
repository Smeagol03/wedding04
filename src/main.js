// Get URL parameters for guest name
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("to");
document.getElementById("namaTamu").textContent = guestName
  ? guestName
  : "Bapak/Ibu/Saudara/i";

// aos
AOS.init({
  duration: 1000, // Durasi animasi
  easing: "ease-in-out", // Jenis easing animasi
  once: true, // Hanya jalankan sekali
});

//   countdown timer
simplyCountdown(".my-countdown", {
  year: 2025, // Tahun target
  month: 11, // Bulan target [1-12]
  day: 28, // Tanggal target [1-31]
  hours: 0,
  minutes: 0,
  seconds: 0,

  words: {
    days: { root: "Hari", lambda: (root, n) => root },
    hours: { root: "Jam", lambda: (root, n) => root },
    minutes: { root: "Menit", lambda: (root, n) => root },
    seconds: { root: "Detik", lambda: (root, n) => root },
  },
  plural: false, // Tidak gunakan bentuk jamak
  inline: false,
  inlineSeparator: ", ",
  inlineClass: "simply-countdown-inline",
  enableUtc: false,
  refresh: 1000,
  sectionClass: "simply-section",
  amountClass: "simply-amount",
  wordClass: "simply-word",
  zeroPad: false,
  removeZeroUnits: false,
  countUp: false,
  onEnd: () => {},
  onStop: () => {},
  onResume: () => {},
  onUpdate: (params) => {},
});
