// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mainMenu = document.getElementById("mainMenu");

if (hamburger && mainMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// Countdown registration deadline
const deadline = new Date("2026-06-30T16:59:59Z").getTime(); // 23:59 WIB

function updateCountdown() {
  const now = Date.now();
  const distance = deadline - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// PPDB form validation
const ppdbForm = document.getElementById("ppdbForm");
const formMessage = document.getElementById("formMessage");

if (ppdbForm && formMessage) {
  ppdbForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!ppdbForm.checkValidity()) {
      formMessage.textContent = "Mohon lengkapi data dengan benar sebelum mengirim formulir.";
      formMessage.style.color = "#b91c1c";
      ppdbForm.reportValidity();
      return;
    }

    formMessage.textContent =
      "Pendaftaran berhasil dikirim. Tim admin akan menghubungi Anda melalui WhatsApp/email.";
    formMessage.style.color = "#166534";
    ppdbForm.reset();
  });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

if (contactForm && contactMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactMessage.textContent = "Mohon isi semua kolom kontak dengan benar.";
      contactMessage.style.color = "#b91c1c";
      contactForm.reportValidity();
      return;
    }

    contactMessage.textContent = "Pesan Anda telah terkirim. Terima kasih telah menghubungi kami.";
    contactMessage.style.color = "#166534";
    contactForm.reset();
  });
}

// News detail
const newsData = {
  1: {
    title: "MPLS Tahun Ajaran 2026/2027 Resmi Dibuka",
    content:
      "Kegiatan MPLS berlangsung selama tiga hari dengan agenda pengenalan lingkungan sekolah, tata tertib, program akademik, serta penguatan nilai akhlakul karimah. Orang tua dapat memantau jadwal kegiatan melalui kanal informasi sekolah.",
  },
  2: {
    title: "Tim Olimpiade Sains Raih Juara Tingkat Kabupaten",
    content:
      "Prestasi ini diraih melalui pembinaan intensif oleh tim guru bidang sains. Sekolah berkomitmen terus mengembangkan potensi siswa pada kompetisi akademik tingkat regional hingga nasional.",
  },
  3: {
    title: "Jadwal Tes Seleksi Gelombang 1 Diumumkan",
    content:
      "Peserta yang telah melengkapi berkas dapat mengikuti tes sesuai sesi yang ditentukan panitia. Informasi detail lokasi ruang tes dan ketentuan hadir dikirim melalui WhatsApp resmi sekolah.",
  },
};

const detail = document.getElementById("newsDetail");
const newsTitle = document.getElementById("newsTitle");
const newsContent = document.getElementById("newsContent");

if (detail && newsTitle && newsContent) {
  document.querySelectorAll("[data-news]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-news");
      const data = newsData[id];
      if (!data) return;

      newsTitle.textContent = data.title;
      newsContent.textContent = data.content;
      detail.hidden = false;
      detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

// Simple chatbot
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatBody = document.getElementById("chatBody");

const botReplies = {
  "cara daftar":
    "Silakan buka menu PPDB > Formulir Pendaftaran, lengkapi data, lalu kirim. Setelah itu tim kami akan verifikasi berkas dan menghubungi Anda.",
  jadwal:
    "Pendaftaran Gelombang 1 dibuka 1 Maret - 30 Juni 2026. Tes seleksi diadakan setiap Sabtu sesuai jadwal dari panitia.",
  lokasi:
    "Sekolah beralamat di Jalan Wiratama Nomor 30, Desa Kedungjaya, Kecamatan Kedawung, Kabupaten Cirebon.",
};

if (chatToggle && chatPanel && chatBody) {
  chatToggle.addEventListener("click", () => {
    chatPanel.hidden = !chatPanel.hidden;
  });

  document.querySelectorAll(".chat-actions button").forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.dataset.question;
      const user = document.createElement("div");
      user.className = "user-msg";
      user.textContent = question;
      chatBody.appendChild(user);

      const bot = document.createElement("div");
      bot.className = "bot-msg";
      bot.textContent = botReplies[question] || "Maaf, pertanyaan belum tersedia.";
      chatBody.appendChild(bot);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  });
}

// Light reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
