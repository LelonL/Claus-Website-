// Anbieter. An "suche" wird der Titel angehängt, damit man direkt beim Film landet.
// Disney+ hat keine öffentliche Suche, dort geht es nur auf die Startseite.
const ANBIETER = {
  ard: { name: "ARD Mediathek", gratis: true, farbe: "#003480", suche: "https://www.ardmediathek.de/suche/" },
  zdf: { name: "ZDF Mediathek", gratis: true, farbe: "#fa7d19", suche: "https://www.zdf.de/suche?q=" },
  netflix: { name: "Netflix", gratis: false, farbe: "#e50914", suche: "https://www.netflix.com/search?q=" },
  prime: { name: "Amazon Prime Video", gratis: false, farbe: "#00a8e1", suche: "https://www.amazon.de/s?i=instant-video&k=" },
  disney: { name: "Disney+", gratis: false, farbe: "#113ccf", start: "https://www.disneyplus.com/de-de" },
  apple: { name: "Apple TV", gratis: false, farbe: "#000000", suche: "https://tv.apple.com/de/search?term=" },
  rtl: { name: "RTL+", gratis: false, farbe: "#e4003a", suche: "https://plus.rtl.de/suche?q=" },
};

// art: "film", "serie" oder "sendung" (Sendungen zählen beim Filter zu den Serien).
// auch: andere Namen, unter denen man den Titel kennt.
const TITEL = [
  // ARD
  { name: "Tatort", art: "serie", genre: "Krimi", jahr: "seit 1970", bei: ["ard"] },
  { name: "Polizeiruf 110", art: "serie", genre: "Krimi", jahr: "seit 1971", bei: ["ard"] },
  { name: "Sturm der Liebe", art: "serie", genre: "Telenovela", jahr: "seit 2005", bei: ["ard"] },
  { name: "Rote Rosen", art: "serie", genre: "Telenovela", jahr: "seit 2006", bei: ["ard"] },
  { name: "In aller Freundschaft", art: "serie", genre: "Arztserie", jahr: "seit 1998", bei: ["ard"] },
  { name: "Die Sendung mit der Maus", art: "sendung", genre: "Für Kinder", jahr: "seit 1971", bei: ["ard"] },

  // ZDF
  { name: "Die Rosenheim-Cops", art: "serie", genre: "Krimi", jahr: "seit 2002", bei: ["zdf"] },
  { name: "Der Bergdoktor", art: "serie", genre: "Arztserie", jahr: "seit 2008", bei: ["zdf"] },
  { name: "Die Bergretter", art: "serie", genre: "Drama", jahr: "seit 2009", bei: ["zdf"] },
  { name: "Notruf Hafenkante", art: "serie", genre: "Krimi", jahr: "seit 2007", bei: ["zdf"] },
  { name: "Das Traumschiff", art: "serie", genre: "Unterhaltung", jahr: "seit 1981", bei: ["zdf"] },
  { name: "Bares für Rares", art: "sendung", genre: "Trödel", jahr: "seit 2013", bei: ["zdf"] },
  { name: "Terra X", art: "sendung", genre: "Doku", jahr: "seit 1982", bei: ["zdf"] },
  { name: "heute-show", art: "sendung", genre: "Satire", jahr: "seit 2009", bei: ["zdf"] },

  // Netflix
  { name: "Stranger Things", art: "serie", genre: "Mystery", jahr: "2016–2025", bei: ["netflix"] },
  { name: "The Crown", art: "serie", genre: "Königshaus", jahr: "2016–2023", bei: ["netflix"] },
  { name: "Bridgerton", art: "serie", genre: "Liebe", jahr: "seit 2020", bei: ["netflix"] },
  { name: "Squid Game", art: "serie", genre: "Thriller", jahr: "2021–2025", bei: ["netflix"] },
  { name: "Wednesday", art: "serie", genre: "Grusel-Komödie", jahr: "seit 2022", bei: ["netflix"] },
  { name: "Dark", art: "serie", genre: "Mystery", jahr: "2017–2020", bei: ["netflix"] },
  { name: "Haus des Geldes", auch: ["Money Heist", "La Casa de Papel"], art: "serie", genre: "Krimi", jahr: "2017–2021", bei: ["netflix"] },
  { name: "Das Damengambit", auch: ["The Queen's Gambit"], art: "serie", genre: "Drama", jahr: "2020", bei: ["netflix"] },
  { name: "Emily in Paris", art: "serie", genre: "Komödie", jahr: "seit 2020", bei: ["netflix"] },
  { name: "Adolescence", art: "serie", genre: "Drama", jahr: "2025", bei: ["netflix"] },
  { name: "Im Westen nichts Neues", art: "film", genre: "Kriegsfilm", jahr: "2022", bei: ["netflix"] },
  { name: "Glass Onion", auch: ["Knives Out"], art: "film", genre: "Krimi", jahr: "2022", bei: ["netflix"] },

  // Prime Video
  { name: "The Boys", art: "serie", genre: "Action", jahr: "seit 2019", bei: ["prime"] },
  { name: "Reacher", art: "serie", genre: "Action", jahr: "seit 2022", bei: ["prime"] },
  { name: "Die Ringe der Macht", auch: ["Der Herr der Ringe", "Rings of Power"], art: "serie", genre: "Fantasy", jahr: "seit 2022", bei: ["prime"] },
  { name: "LOL: Last One Laughing", art: "sendung", genre: "Comedy", jahr: "seit 2021", bei: ["prime"] },
  { name: "Fallout", art: "serie", genre: "Abenteuer", jahr: "seit 2024", bei: ["prime"] },
  { name: "Jack Ryan", art: "serie", genre: "Thriller", jahr: "2018–2023", bei: ["prime"] },
  { name: "Good Omens", art: "serie", genre: "Fantasy-Komödie", jahr: "seit 2019", bei: ["prime"] },

  // Disney+
  { name: "Die Simpsons", art: "serie", genre: "Zeichentrick", jahr: "seit 1989", bei: ["disney"] },
  { name: "Grey's Anatomy", art: "serie", genre: "Arztserie", jahr: "seit 2005", bei: ["disney"] },
  { name: "Only Murders in the Building", art: "serie", genre: "Krimi-Komödie", jahr: "seit 2021", bei: ["disney"] },
  { name: "The Bear", art: "serie", genre: "Drama", jahr: "seit 2022", bei: ["disney"] },
  { name: "The Mandalorian", auch: ["Star Wars"], art: "serie", genre: "Science-Fiction", jahr: "2019–2023", bei: ["disney"] },
  { name: "Andor", auch: ["Star Wars"], art: "serie", genre: "Science-Fiction", jahr: "2022–2025", bei: ["disney"] },
  { name: "Krieg der Sterne", auch: ["Star Wars", "Eine neue Hoffnung"], art: "film", genre: "Science-Fiction", jahr: "1977", bei: ["disney"] },
  { name: "Avengers: Endgame", auch: ["Marvel"], art: "film", genre: "Action", jahr: "2019", bei: ["disney"] },
  { name: "Der König der Löwen", art: "film", genre: "Zeichentrick", jahr: "1994", bei: ["disney"] },
  { name: "Die Eiskönigin", auch: ["Frozen"], art: "film", genre: "Zeichentrick", jahr: "2013", bei: ["disney"] },
  { name: "Toy Story", art: "film", genre: "Animation", jahr: "1995", bei: ["disney"] },
  { name: "Oben", auch: ["Up"], art: "film", genre: "Animation", jahr: "2009", bei: ["disney"] },

  // Apple TV
  { name: "Ted Lasso", art: "serie", genre: "Komödie", jahr: "seit 2020", bei: ["apple"] },
  { name: "Severance", art: "serie", genre: "Thriller", jahr: "seit 2022", bei: ["apple"] },
  { name: "Slow Horses", art: "serie", genre: "Spionage", jahr: "seit 2022", bei: ["apple"] },
  { name: "Shrinking", art: "serie", genre: "Komödie", jahr: "seit 2023", bei: ["apple"] },
  { name: "The Morning Show", art: "serie", genre: "Drama", jahr: "seit 2019", bei: ["apple"] },

  // RTL+
  { name: "Gute Zeiten, schlechte Zeiten", auch: ["GZSZ"], art: "serie", genre: "Seifenoper", jahr: "seit 1992", bei: ["rtl"] },
  { name: "Alarm für Cobra 11", art: "serie", genre: "Action", jahr: "seit 1996", bei: ["rtl"] },
  { name: "Bauer sucht Frau", art: "sendung", genre: "Kuppelshow", jahr: "seit 2005", bei: ["rtl"] },
  { name: "Wer wird Millionär?", art: "sendung", genre: "Quiz", jahr: "seit 1999", bei: ["rtl"] },
];

const ART_TEXT = { film: "Film", serie: "Serie", sendung: "Sendung" };

const suchfeld = document.getElementById("suchfeld");
const leeren = document.getElementById("leeren");
const liste = document.getElementById("liste");
const anzahl = document.getElementById("anzahl");
const justwatch = document.getElementById("justwatch");
const filterKnoepfe = document.querySelectorAll("[data-filter]");

let filter = "alle";

// Groß/klein, Umlaute und Satzzeichen egal: "rosenheim cops" findet "Die Rosenheim-Cops".
function vereinfachen(text) {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Alles, worüber man einen Titel finden kann – auch "Netflix" oder "Krimi".
for (const t of TITEL) {
  const teile = [t.name, ...(t.auch || []), t.genre, ART_TEXT[t.art], ...t.bei.map((a) => ANBIETER[a].name)];
  if (t.bei.some((a) => ANBIETER[a].gratis)) teile.push("kostenlos gratis");
  t.suchtext = vereinfachen(teile.join(" "));
}

TITEL.sort((a, b) => a.name.localeCompare(b.name, "de"));

function passtZumFilter(t) {
  if (filter === "film") return t.art === "film";
  if (filter === "serie") return t.art !== "film";
  if (filter === "gratis") return t.bei.some((a) => ANBIETER[a].gratis);
  return true;
}

function element(tag, klasse, text) {
  const el = document.createElement(tag);
  if (klasse) el.className = klasse;
  if (text) el.textContent = text;
  return el;
}

function karte(t) {
  const li = element("li", "titel");
  li.append(element("h3", "", t.name));
  li.append(element("p", "info", `${ART_TEXT[t.art]} · ${t.genre} · ${t.jahr}`));
  li.append(element("p", "wo", "Zu sehen bei:"));

  const anbieter = element("div", "anbieter");
  for (const key of t.bei) {
    const a = ANBIETER[key];
    const link = element("a");
    link.href = a.suche ? a.suche + encodeURIComponent(t.name) : a.start;
    link.target = "_blank";
    link.rel = "noopener";
    link.style.setProperty("--farbe", a.farbe);
    const text = element("span", "text");
    text.append(element("span", "", a.name));
    text.append(element("span", a.gratis ? "marke gratis" : "marke abo", a.gratis ? "Kostenlos" : "Mit Abo"));
    link.append(text, element("span", "pfeil", "›"));
    link.setAttribute("aria-label", `${t.name} bei ${a.name} öffnen, ${a.gratis ? "kostenlos" : "mit Abo"}`);
    anbieter.append(link);
  }
  li.append(anbieter);
  return li;
}

function zeigen() {
  const eingabe = suchfeld.value.trim();
  const woerter = vereinfachen(eingabe).split(" ").filter(Boolean);
  const treffer = TITEL.filter((t) => passtZumFilter(t) && woerter.every((w) => t.suchtext.includes(w)));

  liste.replaceChildren(...treffer.map(karte));

  if (treffer.length === 0) {
    const leer = element("li", "leer");
    leer.textContent = eingabe
      ? `Leider nichts gefunden zu „${eingabe}“. Probieren Sie es weiter unten bei JustWatch.`
      : "Leider nichts gefunden.";
    liste.append(leer);
  }

  anzahl.textContent = treffer.length === 1 ? "1 Treffer" : `${treffer.length} Treffer`;
  leeren.hidden = eingabe === "";
  justwatch.href = eingabe
    ? "https://www.justwatch.com/de/Suche?q=" + encodeURIComponent(eingabe)
    : "https://www.justwatch.com/de";
}

suchfeld.addEventListener("input", zeigen);

// "Suchen" auf der Handy-Tastatur: Tastatur zuklappen, damit man die Treffer sieht.
suchfeld.addEventListener("keydown", (e) => {
  if (e.key === "Enter") suchfeld.blur();
});

leeren.addEventListener("click", () => {
  suchfeld.value = "";
  zeigen();
  suchfeld.focus();
});

for (const knopf of filterKnoepfe) {
  knopf.addEventListener("click", () => {
    filter = knopf.dataset.filter;
    for (const k of filterKnoepfe) k.setAttribute("aria-pressed", String(k === knopf));
    zeigen();
  });
}

zeigen();
