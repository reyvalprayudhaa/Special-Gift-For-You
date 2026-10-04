let page = 1;
let pin = "";

const scenes = [...document.querySelectorAll(".scene")];
const audio = document.getElementById("audio");


// ===============================
// DATA DARI INDEX.HTML
// ===============================

document.getElementById("openingTitle").textContent = DATA.openingTitle;
document.getElementById("openingText").textContent = DATA.openingText;

document.getElementById("bouquetTitle").textContent = DATA.bouquetTitle;
document.getElementById("bouquetText").textContent = DATA.bouquetText;
document.getElementById("bouquetQuote").textContent =
  "Some flowers fade with time, but the way you make my heart feel will always stay. ♡";

document.getElementById("letterTitle").textContent = DATA.letterTitle;
document.getElementById("date").textContent = DATA.tanggal;
document.getElementById('letter').innerHTML = DATA.letter
  .replace(/\n/g, '<br>')
  .replace(
    'With all my love,<br><br>Ryvl ♡',
    '<div style="text-align: right; margin-top: 24px;">With all my love,<br><br>Ryvl ♡</div>'
  );

document.getElementById("finalTitle").textContent = DATA.finalTitle;
document.getElementById("finalText").textContent = DATA.finalText;


// ===============================
// NAVIGASI HALAMAN
// ===============================

function go(n) {
  page = n;

  scenes.forEach((scene, index) => {
    scene.classList.toggle("active", index === n - 1);
  });

  if (scenes[n - 1]) {
    scenes[n - 1].scrollTop = 0;
  }

  if (n === 6) {
    renderTimeline();
  }

  if (n === 8) {
    document.getElementById("reason").textContent = DATA.reasons[0];
  }
}


// ===============================
// PIN
// ===============================

function renderDots() {
  const dots = document.getElementById("dots");
  dots.innerHTML = "";

  for (let i = 0; i < DATA.pin.length; i++) {
    const dot = document.createElement("span");

    dot.className =
      "dot" + (i < pin.length ? " on" : "");

    dots.appendChild(dot);
  }
}

function key(n) {
  if (pin.length < DATA.pin.length) {
    pin += n;
    renderDots();
  }
}

function clearPin() {
  pin = "";
  renderDots();
}

function checkPin() {
  if (pin === DATA.pin) {
    pin = "";
    renderDots();
    go(3);
  } else {
    clearPin();
    alert("Kode belum tepat ♡");
  }
}

renderDots();


// ===============================
// GIFT BOX
// ===============================

function openGift() {
  document.getElementById("gift").classList.add("open");

  setTimeout(() => {
    go(4);
  }, 900);
}


// ===============================
// MEMORIES
// ===============================

function renderTimeline() {
  const box = document.getElementById("timeline");

  box.innerHTML = "";

  DATA.memories.forEach(memory => {
    const el = document.createElement("div");

    el.className = "memory";

    el.innerHTML = `
      <h3>${memory.title}</h3>
      <p>${memory.text}</p>
    `;

    box.appendChild(el);
  });
}


// ===============================
// REASONS
// ===============================

function pickReason() {
  const jar = document.getElementById("jar");

  jar.animate(
    [
      { transform: "rotate(-7deg)" },
      { transform: "rotate(7deg)" },
      { transform: "rotate(-4deg)" },
      { transform: "rotate(0)" }
    ],
    {
      duration: 700
    }
  );

  const reason =
    DATA.reasons[
      Math.floor(Math.random() * DATA.reasons.length)
    ];

  setTimeout(() => {
    document.getElementById("reason").textContent = reason;
  }, 350);
}


// ===============================
// MUSIC
// ===============================

// 2 lagu yang digunakan
const songs = [
  {
    title: "Our First Song",
    artist: "A song that reminds me of you ♡",
    file: "music/song1.mp3"
  },
  {
    title: "Our Second Song",
    artist: "Another song for you ♡",
    file: "music/song2.mp3"
  }
];

let currentSong = 0;


// Memilih lagu
function selectSong(index) {
  if (index < 0 || index >= songs.length) {
    return;
  }

  currentSong = index;

  audio.pause();

  audio.src = songs[currentSong].file;
  audio.load();

  updateSongInfo();

  const playButton =
    document.getElementById("playButton");

  if (playButton) {
    playButton.textContent = "▶️";
  }
}


// Mengubah judul dan artis lagu
function updateSongInfo() {
  const song = songs[currentSong];

  const title =
    document.getElementById("songTitle");

  const artist =
    document.getElementById("songArtist");

  const song1Title =
    document.getElementById("song1Title");

  const song1Artist =
    document.getElementById("song1Artist");

  const song2Title =
    document.getElementById("song2Title");

  const song2Artist =
    document.getElementById("song2Artist");

  if (title) {
    title.textContent = song.title;
  }

  if (artist) {
    artist.textContent = song.artist;
  }

  if (song1Title) {
    song1Title.textContent = songs[0].title;
  }

  if (song1Artist) {
    song1Artist.textContent = songs[0].artist;
  }

  if (song2Title) {
    song2Title.textContent = songs[1].title;
  }

  if (song2Artist) {
    song2Artist.textContent = songs[1].artist;
  }
}


// Play / Pause
function toggleMusic() {
  if (!audio.src) {
    selectSong(currentSong);
  }

  if (audio.paused) {
    audio.play()
      .then(() => {
        const playButton =
          document.getElementById("playButton");

        if (playButton) {
          playButton.textContent = "⏸️";
        }
      })
      .catch(() => {
        alert(
          "Masukkan music/song1.mp3 dan music/song2.mp3 terlebih dahulu."
        );
      });
  } else {
    audio.pause();

    const playButton =
      document.getElementById("playButton");

    if (playButton) {
      playButton.textContent = "▶️";
    }
  }
}


// Lagu berikutnya
function nextSong() {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  selectSong(currentSong);

  audio.play()
    .then(() => {
      const playButton =
        document.getElementById("playButton");

      if (playButton) {
        playButton.textContent = "⏸️";
      }
    })
    .catch(() => {});
}


// Lagu sebelumnya
function previousSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  selectSong(currentSong);

  audio.play()
    .then(() => {
      const playButton =
        document.getElementById("playButton");

      if (playButton) {
        playButton.textContent = "⏸️";
      }
    })
    .catch(() => {});
}


// Saat lagu selesai → otomatis ke lagu berikutnya
audio.addEventListener("ended", () => {
  nextSong();
});


// Update progress bar
audio.addEventListener("timeupdate", () => {
  const progress =
    document.querySelector(".progress i");

  if (
    progress &&
    audio.duration &&
    !isNaN(audio.duration)
  ) {
    const percentage =
      (audio.currentTime / audio.duration) * 100;

    progress.style.width = percentage + "%";
  }
});


// Inisialisasi lagu pertama
updateSongInfo();


// ===============================
// FINAL MODAL
// ===============================

function showFinal() {
  document
    .getElementById("modal")
    .classList.add("show");
}

function closeFinal() {
  document
    .getElementById("modal")
    .classList.remove("show");
}


// ===============================
// FALLING PETALS
// ===============================

function petals() {
  const icons = [
    "🌸",
    "🌷",
    "✿",
    "❀",
    "🌼",
    "💗"
  ];

  setInterval(() => {
    const e = document.createElement("div");

    e.className = "petal";

    e.style.left =
      Math.random() * 100 + "vw";

    e.style.fontSize =
      10 + Math.random() * 13 + "px";

    e.style.animationDuration =
      6 + Math.random() * 6 + "s";

    e.innerHTML =
      "<span>" +
      icons[Math.floor(Math.random() * icons.length)] +
      "</span>";

    document
      .getElementById("petals")
      .appendChild(e);

    setTimeout(() => {
      e.remove();
    }, 13000);

  }, 650);
}

petals();