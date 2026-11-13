
// =========================================
// ALARICKU BIRTHDAY DIARY
// Made with love ♡
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // MENU MOBILE
  // =========================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("show");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }


  // =========================================
  // ANIMASI AMPLOP DAN SURAT
  // =========================================

  const envelope = document.getElementById("envelope");
  const openLetterBtn = document.getElementById("openLetterBtn");
  const letterHint = document.getElementById("letterHint");

  let letterOpened = false;

  if (envelope && openLetterBtn) {
    openLetterBtn.addEventListener("click", () => {

      if (!letterOpened) {

        envelope.classList.add("open");

        openLetterBtn.disabled = true;
        openLetterBtn.textContent = "Opening your letter...";

        if (letterHint) {
          letterHint.textContent =
            "A little letter, written just for you...";
        }

        window.setTimeout(() => {
          envelope.classList.add("letter-out");

          openLetterBtn.disabled = false;
          openLetterBtn.textContent = "Close the letter ♡";

          if (letterHint) {
            letterHint.textContent =
              "Take your time, love. Read every little word.";
          }

          letterOpened = true;

        }, 850);

      } else {

        envelope.classList.remove("letter-out");

        window.setTimeout(() => {
          envelope.classList.remove("open");
        }, 250);

        openLetterBtn.textContent = "Open this letter ♡";

        if (letterHint) {
          letterHint.textContent =
            "You can open it again whenever you want.";
        }

        letterOpened = false;
      }
    });
  }


  // =========================================
  // KEJUTAN INTERAKTIF
  // =========================================

  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseMessage = document.getElementById("surpriseMessage");

  if (surpriseBtn && surpriseMessage) {
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
  }


  // =========================================
  // ANIMASI HATI
  // =========================================

  function createHearts() {

    const symbols = ["♡", "♥", "✳"];

    for (let i = 0; i < 18; i++) {

      const heart = document.createElement("span");

      heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      heart.className = "floating-heart";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDelay = Math.random() * 1.2 + "s";
      heart.style.fontSize = (14 + Math.random() * 18) + "px";

      document.body.appendChild(heart);

      window.setTimeout(() => {
        heart.remove();
      }, 3500);
    }
  }


  // =========================================
  // PLAYLIST MUSIC PLAYER
  // =========================================

  // Pastikan nama file sama persis dengan file
  // yang ada di folder assets.

  const tracks = [
    {
      title: "Kita Lewati Berdua",
      artist: "overnight",
      file: "./assets/lagu-1.mp3"
    },
    {
      title: "Di Akhir Perang",
      artist: "Nadin Amizah",
      file: "./assets/lagu-2.mp3"
    },
    {
      title: "Best Part",
      artist: "Daniel Caesar & H.E.R.",
      file: "./assets/lagu-3.mp3"
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

  // Format durasi lagu
  function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  }


  // Memuat lagu
  function loadTrack(index, shouldPlay = false) {

    currentTrack = (index + tracks.length) % tracks.length;

    const track = tracks[currentTrack];

    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;

    audio.pause();

    audio.src = track.file;
    audio.load();

    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    trackButtons.forEach((button, i) => {
      button.classList.toggle("active", i === currentTrack);
    });

    playPause.textContent = "▶";

    musicHint.textContent = `Memuat lagu: ${track.title}`;

    if (shouldPlay) {
      playAudio();
    }
  }


  // Memutar lagu
  function playAudio() {

    audio.play()

      .then(() => {

        playPause.textContent = "Ⅱ";

        musicHint.textContent = "Now playing ♡";

      })

      .catch((error) => {

        playPause.textContent = "▶";

        if (error.name === "NotAllowedError") {

          musicHint.textContent =
            "Klik tombol play untuk memulai musik ♡";

        } else {

          musicHint.textContent =
            "Musik gagal diputar. Periksa file MP3 dan alamatnya.";

        }

        console.error("Audio playback error:", error);
      });
  }


  // =========================================
  // TOMBOL PLAY / PAUSE
  // =========================================

  if (
    audio &&
    trackTitle &&
    trackArtist &&
    playPause &&
    prevTrack &&
    nextTrack &&
    progress &&
    currentTime &&
    duration &&
    musicHint
  ) {

    playPause.addEventListener("click", () => {

      if (audio.paused) {

        playAudio();

      } else {

        audio.pause();

        playPause.textContent = "▶";

        musicHint.textContent = "Music paused.";
      }
    });


    // =========================================
    // LAGU SEBELUMNYA
    // =========================================

    prevTrack.addEventListener("click", () => {
      loadTrack(currentTrack - 1, true);
    });


    // =========================================
    // LAGU BERIKUTNYA
    // =========================================

    nextTrack.addEventListener("click", () => {
      loadTrack(currentTrack + 1, true);
    });


    // =========================================
    // PILIH LAGU DARI PLAYLIST
    // =========================================

    trackButtons.forEach((button) => {

      button.addEventListener("click", () => {

        loadTrack(Number(button.dataset.track), true);

      });

    });


    // =========================================
    // DURASI LAGU
    // =========================================

    audio.addEventListener("loadedmetadata", () => {

      duration.textContent = formatTime(audio.duration);

      musicHint.textContent = "Ready to play ♡";

    });


    // =========================================
    // PROGRESS BAR
    // =========================================

    audio.addEventListener("timeupdate", () => {

      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {

        progress.value =
          (audio.currentTime / audio.duration) * 100;

        currentTime.textContent =
          formatTime(audio.currentTime);

      }

    });


    // =========================================
    // MENGGESER PROGRESS BAR
    // =========================================

    progress.addEventListener("input", () => {

      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {

        audio.currentTime =
          (Number(progress.value) / 100) * audio.duration;

      }

    });


    // =========================================
    // OTOMATIS PINDAH KE LAGU BERIKUTNYA
    // =========================================

    audio.addEventListener("ended", () => {

      loadTrack(currentTrack + 1, true);

    });


    // =========================================
    // MENANGANI ERROR AUDIO
    // =========================================

    audio.addEventListener("error", () => {

      const errorCode = audio.error?.code;

      const messages = {
        1: "Pemutaran lagu dibatalkan.",
        2: "Terjadi masalah jaringan saat memuat lagu.",
        3: "File audio tidak dapat didekode. Periksa format MP3.",
        4: "File lagu tidak ditemukan atau format tidak didukung."
      };

      musicHint.textContent =
        messages[errorCode] ||
        "Lagu gagal dimuat. Periksa file audio.";

      playPause.textContent = "▶";

      console.error("Audio error:", {
        code: errorCode,
        source: audio.currentSrc
      });

    });


    // =========================================
    // MEMUAT LAGU PERTAMA
    // =========================================

    loadTrack(0);

  }

});
