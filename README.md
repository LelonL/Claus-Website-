# Was läuft wo?

Eine einfache Website: Film oder Serie suchen, und sie zeigt, wo man ihn schauen kann.
Gemacht für Menschen, die sich mit Technik nicht gut auskennen: große Schrift, große Knöpfe, wenig Text.

## Starten

Es ist eine einfache statische Website, ohne Build-Schritt. `index.html` im Browser öffnen,
oder sie mit GitHub Pages veröffentlichen.

## Titel hinzufügen

Alle Titel stehen in `app.js` in der Liste `TITEL`:

```js
{ name: "Tatort", art: "serie", genre: "Krimi", jahr: "seit 1970", bei: ["ard"] },
```

- `art`: `"film"`, `"serie"` oder `"sendung"`
- `bei`: einer oder mehrere Anbieter aus `ANBIETER` (`ard`, `zdf`, `netflix`, `prime`, `disney`, `apple`, `rtl`)
- `auch` (optional): andere Namen, z. B. `["Money Heist"]`

Die Anbieter ändern ihr Angebot ab und zu. Die Liste sollte man also gelegentlich prüfen.
Das Datum steht unten auf der Seite (in `index.html`).
