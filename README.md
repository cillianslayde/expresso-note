# Expresso Note

A clean, dark, standalone notepad for your browser.
No install. No account. No cloud. Just open it and write.

**Live:** https://cillianslayde.github.io/expresso-note/

---

## What it is

Expresso Note is a fully client-side text editor — menubar, toolbar, recent-files
sidebar, find & replace, spell check, auto-correct, timestamps, custom fonts and
colors, and a print-clean output. Everything runs in the browser; nothing is
sent anywhere. Your notes and preferences live in your browser's `localStorage`
only, on your machine.

See [HOWTO.md](./HOWTO.md) for the full feature list, keyboard shortcuts, and
usage guide.

## Running it

Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

Some features (clipboard paste, file open/save) rely on browser file-access
permissions that behave more reliably when served over `http(s)://` rather than
`file://` — which is exactly what GitHub Pages does. Locally, a simple static
server works too (e.g. `npx serve .`).

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell and markup |
| `assets/css/main.css` | Styling |
| `assets/js/main.js` | App logic |
| `HOWTO.md` | Full usage guide |

## License

All Rights Reserved — see [LICENSE](./LICENSE). Free to use as-is via the
hosted link above; not licensed for redistribution or reuse of the source.
