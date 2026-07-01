# MietMeister 🛠️

Eine kleine Website zum Buchen von Geräten – z. B. einem **Hochdruckreiniger** oder dem
**Ecovacs W3 Omni** Saug- und Wischroboter. Buchbar **stundenweise** oder als **Tagespauschale**.

## Features

- 📦 Geräte-Katalog mit Beschreibung, Tags, Stunden- und Tagespreis sowie Verfügbarkeit
- ⏱️ Buchung stundenweise **oder** für einen ganzen Tag (bzw. mehrere Tage)
- 💶 Automatische Preisberechnung – Stundenpreise werden nie teurer als die Tagespauschale (Deckelung)
- 📋 Übersicht "Meine Buchungen" mit Storno-Funktion
- 💾 Speicherung lokal im Browser (`localStorage`) – keine Anmeldung nötig
- 📱 Responsives, modernes Design

## Starten

Es ist eine reine statische Website – kein Build-Schritt nötig. Einfach öffnen:

```bash
# Option A: Datei direkt im Browser öffnen
open index.html            # macOS
xdg-open index.html        # Linux

# Option B: Kleiner lokaler Server (empfohlen)
python3 -m http.server 8000
# dann http://localhost:8000 im Browser aufrufen
```

## Geräte anpassen

Alle Geräte und Preise stehen in `app.js` im Array `DEVICES`. Ein neues Gerät hinzufügen:

```js
{
  id: "rasenmaeher",
  name: "Rasenmäher",
  emoji: "🌱",
  desc: "Beschreibung des Geräts.",
  tags: ["Tag 1", "Tag 2"],
  hourly: 5,      // Preis pro Stunde in €
  daily: 25,      // Tagespauschale in €
  available: true,
}
```

## Dateien

| Datei         | Zweck                                    |
| ------------- | ---------------------------------------- |
| `index.html`  | Struktur & Inhalt                        |
| `styles.css`  | Design                                   |
| `app.js`      | Geräte-Daten, Preislogik, Buchungen      |

> Hinweis: Dies ist eine Demo. Buchungen werden nur lokal im Browser gespeichert
> und nicht an einen Server gesendet.
