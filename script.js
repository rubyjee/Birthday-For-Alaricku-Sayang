// =========================================
// ALARICKU BIRTHDAY DIARY
// Edit judul, penyanyi, dan nama file lagu di bawah.
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // MENU MOBILE
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // ANIMASI AMPLOP DAN SURAT
  const envelope = document.getElementById("envelope");
  const openLetterBtn = document.getElementById("openLetterBtn");
  const letterHint = document.getElementById("letterHint");
  let letterOpened = false;

  openLetterBtn.addEventListener("click", () => {
    if (!letterOpened) {
      envelope.classList.add("open");
      openLetterBtn.disabled = true;
      openLetterBtn.textContent = "Opening your letter...";
      letterHint.textContent = "A little letter, written just for you...";

      window.setTimeout(() => {
        envelope.classList.add("letter-out");
        openLetterBtn.disabled = false;
        openLetterBtn.textContent = "Close the letter ♡";
        letterHint.textContent = "Take your time, love. Read every little word.";
        letterOpened = true;
      }, 850);
    } else {
      envelope.classList.remove("letter-out");

      window.setTimeout(() => {
        envelope.classList.remove("open");
      }, 250);

      openLetterBtn.textContent = "Open this letter ♡";
      letterHint.textContent = "You can open it again whenever you want.";
      letterOpened = false;
    }
  });

  // KEJUTAN INTERAKTIF
  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseMessage = document.getElementById("surpriseMessage");

  surpriseBtn.addEventListener("click", () => {
    const willShow = surpriseMessage.hidden;
    surpriseMessage.hidden = !willShow;

    surpriseBtn.textContent = willShow
      ? "Hide my surprise ♡"
      : "Click for your surprise ♡";

    if (willShow) {
      surpriseMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      createHearts();
    }
  });

  function createHearts() {
    const symbols = ["♡", "♥", "✳"];

    for (let i = 0; i < 18; i++) {
      const heart = document.createElement("span");

      heart.textContent = symbols[
        Math.floor(Math.random() * symbols.length)
      ];

      heart.className = "floating-heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDelay = Math.random() * 1.2 + "s";
      heart.style.fontSize = (14 + Math.random() * 18) + "px";

      document.body.appendChild(heart);

      window.setTimeout(() => heart.remove(), 3500);
    }
  }

  // PLAYLIST
  // Simpan file lagu ke folder assets.
  // Sesuaikan nama file MP3 di bawah.

  const tracks = [
    {
      title: "Kita Lewati Berdua",
      artist: "overnight",
      file: "assets/lagu-1.mp3"
    },
    {
      title: "Di Akhir Perang",
      artist: "Nadin Amizah",
      file: "assets/lagu-2.mp3"
    },
    {
      title: "Best Part",
      artist: "Daniel Caesar & H.E.R.",
      file: "assets/lagu-3.mp3"
    }
  ];

  const audio = document.getElementById("audioPlayer");
  const trackTitle = document.getElementById("trackTitle");
  const trackArtist = document.getElementById("trackArtist");
  const playPause = document.getElementById("playPause");
  const prevTrack = document.getElementById("prevTrack");
  const nextTrack = document.getElementById("nextTrack");
  const progress = document.getElementById("progress");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const musicHint = document.getElementById("musicHint");

  const trackButtons = [
    ...document.querySelectorAll(".track")
  ];

  let currentTrack = 0;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  }

  function loadTrack(index, shouldPlay = false) {
    currentTrack = (index + tracks.length) % tracks.length;

    const track = tracks[currentTrack];

    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;

    audio.src = track.file;

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    trackButtons.forEach((button, i) => {
      button.classList.toggle("active", i === currentTrack);
    });

    musicHint.textContent = `File yang dicari: ${track.file}`;

    if (shouldPlay) {
      audio.play()
        .then(() => {
          playPause.textContent = "Ⅱ";
        })
        .catch(() => {
          musicHint.textContent =
            "File lagu belum ditemukan. Periksa nama file di folder assets dan script.js.";

          playPause.textContent = "▶";
        });
    } else {
      audio.pause();
      playPause.textContent = "▶";
    }
  }

  // TOMBOL PLAY / PAUSE
  playPause.addEventListener("click", () => {
    if (!audio.src) {
      loadTrack(currentTrack);
    }

    if (audio.paused) {
      audio.play()
        .then(() => {
          playPause.textContent = "Ⅱ";
          musicHint.textContent = "Now playing ♡";
        })
        .catch(() => {
          musicHint.textContent =
            "Lagu belum bisa diputar. Pastikan file MP3 sudah ditambahkan dan namanya sesuai.";
        });
    } else {
      audio.pause();
      playPause.textContent = "▶";
      musicHint.textContent = "Music paused.";
    }
  });

  // LAGU SEBELUMNYA DAN BERIKUTNYA
  prevTrack.addEventListener("click", () => {
    loadTrack(currentTrack - 1, true);
  });

  nextTrack.addEventListener("click", () => {
    loadTrack(currentTrack + 1, true);
  });

  // PILIH LAGU DARI DAFTAR PLAYLIST
  trackButtons.forEach(button => {
    button.addEventListener("click", () => {
      loadTrack(Number(button.dataset.track), true);
    });
  });

  // DURASI LAGU
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  // PROGRESS BAR
  audio.addEventListener("timeupdate", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value =
        (audio.currentTime / audio.duration) * 100;

      currentTime.textContent =
        formatTime(audio.currentTime);
    }
  });

  // MENGGESER PROGRESS BAR
  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime =
        (Number(progress.value) / 100) * audio.duration;
    }
  });

  // OTOMATIS PINDAH KE LAGU BERIKUTNYA
  audio.addEventListener("ended", () => {
    loadTrack(currentTrack + 1, true);
  });

  // JIKA FILE LAGU TIDAK DITEMUKAN
  audio.addEventListener("error", () => {
    musicHint.textContent =
      "File lagu tidak ditemukan. Tambahkan MP3 ke folder assets atau ubah nama file di script.js.";

    playPause.textContent = "▶";
  });

  // MEMUAT LAGU PERTAMA
  loadTrack(0);
});