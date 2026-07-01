/* MietMeister – Geräte-Buchung
 * Reine Frontend-Demo: Buchungen werden im localStorage gespeichert.
 */

const DEVICES = [
  {
    id: "hochdruckreiniger",
    name: "Hochdruckreiniger",
    emoji: "🧼",
    desc: "Kräftiger Hochdruckreiniger für Terrasse, Auto, Fassade und Gartenwege. Inkl. Standard- und Rotationsdüse.",
    tags: ["150 bar", "Inkl. Düsen", "Für Außenbereich"],
    hourly: 6,
    daily: 29,
    available: true,
  },
  {
    id: "ecovacs-w3-omni",
    name: "Ecovacs W3 Omni",
    emoji: "🤖",
    desc: "Saug- und Wischroboter mit Selbstreinigungsstation. Perfekt für Wohnung oder Büro – wischt und saugt vollautomatisch.",
    tags: ["Saugen & Wischen", "Selbstreinigend", "App-Steuerung"],
    hourly: 4,
    daily: 22,
    available: true,
  },
  {
    id: "akkuschrauber-set",
    name: "Akkuschrauber-Set",
    emoji: "🔩",
    desc: "Professioneller Akkuschrauber mit zwei Akkus, Ladegerät und 40-teiligem Bit-Set im Koffer.",
    tags: ["2 Akkus", "40 Bits", "Im Koffer"],
    hourly: 3,
    daily: 15,
    available: true,
  },
  {
    id: "dampfreiniger",
    name: "Dampfreiniger",
    emoji: "💨",
    desc: "Reinigt Böden, Fugen und Polster porentief mit heißem Dampf – ganz ohne Chemie.",
    tags: ["Ohne Chemie", "Für Böden & Fugen", "Aufsätze inkl."],
    hourly: 5,
    daily: 25,
    available: false,
  },
];

const STORAGE_KEY = "mietmeister.bookings";
const EUR = (n) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

let bookings = loadBookings();
let activeDevice = null;

/* ---------- Persistenz ---------- */
function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
function saveBookings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

/* ---------- Preisberechnung ---------- */
function calcPrice(device, mode, hours, days) {
  if (mode === "daily") {
    return { total: device.daily * days, unit: `${days} Tag${days > 1 ? "e" : ""} × ${EUR(device.daily)}` };
  }
  // Stundenweise – wird die Tagespauschale überschritten, greift automatisch der Tagespreis.
  const raw = device.hourly * hours;
  if (raw >= device.daily) {
    return { total: device.daily, unit: `${hours} Std. gedeckelt auf Tagespreis ${EUR(device.daily)}`, capped: true };
  }
  return { total: raw, unit: `${hours} Std. × ${EUR(device.hourly)}` };
}

/* ---------- Rendering: Geräte ---------- */
function renderDevices() {
  const grid = document.getElementById("deviceGrid");
  grid.innerHTML = "";
  DEVICES.forEach((d) => {
    const card = document.createElement("article");
    card.className = "device-card";
    card.innerHTML = `
      <div class="device-visual">${d.emoji}</div>
      <div class="device-body">
        <h3>${d.name}</h3>
        <p class="device-desc">${d.desc}</p>
        <div class="device-tags">${d.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="device-price">
          <span>ab <b>${EUR(d.hourly)}</b> / Std.</span>
          <span><b>${EUR(d.daily)}</b> / Tag</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span class="device-status">
            <span class="dot ${d.available ? "free" : "busy"}"></span>
            ${d.available ? "Verfügbar" : "Zurzeit vergeben"}
          </span>
          <button class="btn ${d.available ? "btn-primary" : "btn-ghost"}" data-book="${d.id}" ${d.available ? "" : "disabled"}>
            ${d.available ? "Buchen" : "Nicht verfügbar"}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("[data-book]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.book));
  });
}

/* ---------- Rendering: Statistik ---------- */
function renderStats() {
  const available = DEVICES.filter((d) => d.available).length;
  const minPrice = Math.min(...DEVICES.map((d) => d.hourly));
  document.getElementById("statAvailable").textContent = available;
  document.getElementById("statCount").textContent = DEVICES.length;
  document.getElementById("statMin").textContent = EUR(minPrice);
}

/* ---------- Rendering: Buchungen ---------- */
function renderBookings() {
  const list = document.getElementById("bookingList");
  if (bookings.length === 0) {
    list.innerHTML = `<div class="empty-state">Noch keine Buchungen. Wähle oben ein Gerät aus, um zu starten.</div>`;
    return;
  }
  list.innerHTML = "";
  bookings
    .slice()
    .reverse()
    .forEach((b) => {
      const item = document.createElement("div");
      item.className = "booking-item";
      const period =
        b.mode === "daily"
          ? `${b.days} Tag${b.days > 1 ? "e" : ""} ab ${formatDate(b.date)}`
          : `${formatDate(b.date)}, ${b.startTime} Uhr · ${b.hours} Std.`;
      item.innerHTML = `
        <div class="booking-emoji">${b.emoji}</div>
        <div class="booking-info">
          <h4>${b.deviceName}</h4>
          <p>${period} · ${b.name}</p>
        </div>
        <div class="booking-price">${EUR(b.total)}</div>
        <button class="booking-remove" data-remove="${b.id}" aria-label="Buchung stornieren">×</button>
      `;
      list.appendChild(item);
    });

  list.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeBooking(btn.dataset.remove));
  });
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/* ---------- Modal ---------- */
const modal = document.getElementById("bookingModal");
const form = document.getElementById("bookingForm");

function openModal(deviceId) {
  activeDevice = DEVICES.find((d) => d.id === deviceId);
  if (!activeDevice || !activeDevice.available) return;

  document.getElementById("modalEmoji").textContent = activeDevice.emoji;
  document.getElementById("modalTitle").textContent = `${activeDevice.name} buchen`;
  document.getElementById("modalSubtitle").textContent = `${EUR(activeDevice.hourly)} / Stunde · ${EUR(activeDevice.daily)} / Tag`;

  // Standardwerte
  document.getElementById("bookDate").value = todayISO();
  document.getElementById("bookDate").min = todayISO();
  form.querySelector('input[name="mode"][value="hourly"]').checked = true;
  document.getElementById("startTime").value = "09:00";
  document.getElementById("hours").value = 2;
  document.getElementById("days").value = 1;

  updateModeFields();
  updateSummary();
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  activeDevice = null;
  form.reset();
}

function todayISO() {
  const t = new Date();
  const off = t.getTimezoneOffset();
  return new Date(t.getTime() - off * 60000).toISOString().slice(0, 10);
}

function currentMode() {
  return form.querySelector('input[name="mode"]:checked').value;
}

function updateModeFields() {
  const daily = currentMode() === "daily";
  document.getElementById("hourlyFields").hidden = daily;
  document.getElementById("dailyFields").hidden = !daily;
}

function updateSummary() {
  if (!activeDevice) return;
  const mode = currentMode();
  const hours = clampInt(document.getElementById("hours").value, 1, 12);
  const days = clampInt(document.getElementById("days").value, 1, 30);
  const { total, unit } = calcPrice(activeDevice, mode, hours, days);
  document.getElementById("summaryPrice").textContent = EUR(total);
  document.getElementById("summaryLabel").textContent = "Gesamtpreis";
  document.getElementById("summaryHint").textContent = unit;
}

function clampInt(val, min, max) {
  let n = parseInt(val, 10);
  if (isNaN(n)) n = min;
  return Math.min(max, Math.max(min, n));
}

/* ---------- Buchen ---------- */
function submitBooking(e) {
  e.preventDefault();
  if (!activeDevice) return;
  const mode = currentMode();
  const hours = clampInt(document.getElementById("hours").value, 1, 12);
  const days = clampInt(document.getElementById("days").value, 1, 30);
  const { total } = calcPrice(activeDevice, mode, hours, days);

  const booking = {
    id: "b_" + Date.now().toString(36) + Math.floor(performance.now()).toString(36),
    deviceId: activeDevice.id,
    deviceName: activeDevice.name,
    emoji: activeDevice.emoji,
    name: document.getElementById("customerName").value.trim() || "Gast",
    date: document.getElementById("bookDate").value,
    mode,
    hours,
    days,
    startTime: document.getElementById("startTime").value,
    total,
  };

  bookings.push(booking);
  saveBookings();
  renderBookings();
  closeModal();
  showToast(`Buchung bestätigt: ${booking.deviceName} für ${EUR(total)}`);
  document.getElementById("buchungen").scrollIntoView({ behavior: "smooth" });
}

function removeBooking(id) {
  bookings = bookings.filter((b) => b.id !== id);
  saveBookings();
  renderBookings();
  showToast("Buchung storniert");
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => (toast.hidden = true), 300);
  }, 2600);
}

/* ---------- Events ---------- */
form.addEventListener("submit", submitBooking);
form.addEventListener("input", (e) => {
  if (e.target.name === "mode") updateModeFields();
  updateSummary();
});
modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

/* ---------- Init ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
renderDevices();
renderStats();
renderBookings();
