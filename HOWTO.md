# Expresso Note — How To

A clean, dark, standalone notepad for your browser.  
No install. No account. No cloud. Just open `index.html` and write.

---

## Getting Started

Drop the `expresso-note` folder anywhere on your machine.  
Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).  
That's it — you're ready to write.

> **Note:** Some features (Paste from clipboard, file open/save) require a local server  
> or a browser that permits file-access. Chrome and Edge work best when opened  
> via a local server (e.g. VS Code Live Server, or `npx serve .`).

---

## Files & Format

| Extension | Description |
|-----------|-------------|
| `.nnt`    | Expresso Note native format — plain text, opens directly back into the app |
| `.txt`    | Standard plain text — opens in any editor |

Your notes are plain text. No proprietary lock-in.

---

## The Interface

```
┌─────────────────────────────────────────────┐
│  File  Edit  View  Insert  Format           │  ← Menubar
├─────────────────────────────────────────────┤
│  ⬜ 📂 💾 🖨  ↩ ↪  ✂ ⧉ 📋  B I U S  ...  │  ← Toolbar
├──────────┬──────────────────────────────────┤
│          │                                  │
│ Recent   │   Editor                         │
│ Files    │                                  │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  file.nnt ●  42 words  Ln 3  Col 12  100%  │  ← Status bar
└─────────────────────────────────────────────┘
```

**Menubar** — full menu system with keyboard shortcuts shown inline.  
**Toolbar** — one-click access to every common action.  
**Sidebar** — your last 12 opened or saved files. Click any to reopen.  
**Status bar** — live word count, character count, line/column, zoom, spacing, and file info.

---

## Keyboard Shortcuts

### File
| Action | Shortcut |
|--------|----------|
| New | `Ctrl+N` |
| Open | `Ctrl+O` |
| Save | `Ctrl+S` |
| Save As | `Ctrl+Shift+S` |
| Print | `Ctrl+P` |
| Close | `Ctrl+W` |

### Edit
| Action | Shortcut |
|--------|----------|
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Y` |
| Cut | `Ctrl+X` |
| Copy | `Ctrl+C` |
| Paste | `Ctrl+V` |
| Select All | `Ctrl+A` |
| Find | `Ctrl+F` |
| Find & Replace | `Ctrl+H` |

### Format
| Action | Shortcut |
|--------|----------|
| Bold | `Ctrl+B` |
| Italic | `Ctrl+I` |
| Underline | `Ctrl+U` |
| Strikethrough | `Ctrl+Shift+X` |
| Zoom In | `Ctrl++` |
| Zoom Out | `Ctrl+-` |

### Editor
| Action | Key |
|--------|-----|
| Tab indent (4 spaces) | `Tab` |
| Close any panel/menu | `Esc` |

---

## Find & Replace

Press **`Ctrl+F`** to open Find (search only).  
Press **`Ctrl+H`** to open Find & Replace (both rows visible).

- **Next / Prev** — cycle through matches (highlighted in gold, current match in blue).  
- **Replace** — replace the current match only.  
- **Replace All** — replace every match in one go.  
- Press `Esc` or click ✕ to close and clear highlights.

---

## Spell Check

Spell check uses your **browser's built-in spell checker** — the same engine that  
underlines misspelled words in red across every website you visit.

- **Toggle on/off** — Edit menu → "Spell Check" or the `ABC` toolbar button.  
- When ON, misspelled words are underlined in red by the browser.  
- **Right-click** any underlined word to see the browser's correction suggestions,  
  or use the Expresso Note context menu which shows suggestions from the  
  built-in correction map (see Auto-Correct below).
- The status bar shows `Spell: ON` or `Spell: OFF`.
- Your spell check preference is saved and restored on next launch.

> **Tip:** The browser spell checker language follows your browser's language settings.  
> To change the language, update your browser's preferred language in its settings.

---

## Auto-Correct

Auto-correct silently fixes common typos **as you type**, the moment you press  
Space or punctuation after a word.

- **Toggle on/off** — Edit menu → "Auto-Correct" or the `ac✓` toolbar button.  
- Corrections preserve capitalisation — if you type `Teh` it becomes `The`, not `the`.  
- Auto-correct will not activate mid-word, only when a word boundary is reached.
- Your preference is saved and restored on next launch.

**What it corrects:**

| Category | Examples |
|----------|----------|
| Transpositions | `teh` → `the`, `hte` → `the`, `wierd` → `weird` |
| Missing apostrophes | `dont` → `don't`, `im` → `I'm`, `youre` → `you're` |
| Double-letter errors | `begining` → `beginning`, `tommorow` → `tomorrow` |
| Common misspellings | `recieve` → `receive`, `seperate` → `separate` |
| Month names | `febuary` → `february`, `wendsday` → `wednesday` |

The correction list covers 150+ words. It is not exhaustive — use spell check  
alongside auto-correct for best coverage.

---

## Right-Click Context Menu

Right-clicking inside the editor opens Expresso Note's custom context menu:

- If the word under your cursor is in the correction map, **suggested replacements**  
  appear at the top in blue — click one to apply it instantly.
- Below the suggestions: **Cut, Copy, Paste, Select All** for quick access.

---

## Fonts & Appearance

### Font Family
Choose from 8 fonts in the toolbar dropdown:

| Font | Style |
|------|-------|
| JetBrains Mono | Monospace — default, great for notes and code |
| Outfit | Clean sans-serif |
| Syne | Display sans-serif |
| Georgia | Classic serif |
| Arial | System sans-serif |
| Courier New | Classic monospace |
| Times New Roman | Classic serif |
| Verdana | Screen-optimised sans-serif |

### Font Size
Sizes from 8 to 72pt available in the toolbar dropdown.  
Use `Ctrl++` / `Ctrl+-` to step through sizes quickly.

### Line Spacing
Three options in the toolbar and View menu: **1×**, **1.5×** (default), **2×**.

### Text & Background Color
Two colour pickers in the toolbar — one for text, one for the editor background.  
Pick any colour. Your choices are saved.

### Zoom
Zoom scales the font size without changing the stored font size setting.  
Range: 50% – 300%. Reset to 100% with the `1:1` button.

---

## Formatting

| Button | Effect |
|--------|--------|
| **B** | Bold |
| *I* | Italic |
| U̲ | Underline |
| ~~S~~ | Strikethrough |

Formatting is applied to selected text. Buttons highlight when the cursor  
is inside formatted text.

---

## Lists

Use the **• —** and **1.** toolbar buttons, or Insert menu:

- **Bullet list** — inserts `• ` on a new line. Continue pressing for more items.
- **Numbered list** — inserts `1. `, `2. `, etc., auto-incrementing per click.

---

## Date / Time Stamp

Two timestamp modes, both in the toolbar and Insert menu:

- **📅 Insert now** — drops `[date, time]` at the cursor immediately.  
- **⏱ Auto-stamp toggle** — when ON, every new line gets a timestamp prefix automatically.  
  The status bar shows `TS: ON`. Toggle off to stop.

---

## Special Characters

Click **Ω** in the toolbar (or Insert → Special Characters) to open the character panel.  
Click any character to insert it at the cursor.

Includes: © ® ™ ° ± × ÷ √ ∞ ≠ ≤ ≥ ← → ↑ ↓ • — – … « » " " ' '  
€ £ ¥ ¢ § ¶ and accented Latin characters.

---

## Word Wrap

Toggle via View menu or the status bar indicator `Wrap: ON/OFF`.  
When OFF, long lines scroll horizontally — useful for structured data or logs.

---

## Recent Files

The sidebar (☰ to toggle) shows your last 12 opened or saved files.  
Click any entry to load it. The sidebar state (open/closed) is remembered.

> Recent file content is stored in your browser's `localStorage` — it does not  
> leave your machine.

---

## Saving & Settings

All your preferences are saved automatically to `localStorage` whenever you  
change them. On next launch, everything is exactly as you left it:

- Font family, font size, line spacing, zoom level
- Text colour, background colour
- Word wrap, spell check, auto-correct, timestamp toggle
- Sidebar open/closed state

**Nothing is sent anywhere.** All data stays in your browser, on your machine.

---

## Printing

Press `Ctrl+P` or File → Print.  
The toolbar, menus, sidebar, and status bar are all hidden in the print view —  
only your note content is printed, in black on white at 12pt.

---

## File Types & Browser Compatibility

| Browser | Open | Save | Clipboard Paste | Spell Check |
|---------|------|------|-----------------|-------------|
| Chrome | ✓ | ✓ | ✓ | ✓ |
| Edge | ✓ | ✓ | ✓ | ✓ |
| Firefox | ✓ | ✓ | Partial* | ✓ |
| Safari | ✓ | ✓ | Partial* | ✓ |

\* Firefox and Safari may prompt for clipboard permission on paste.  
Use `Ctrl+V` directly in the editor as a fallback — it always works.

---

## Tips

- **Quick new note** — `Ctrl+N` clears the editor. If you have unsaved changes  
  you'll be asked to save first.
- **Accidental close** — the unsaved changes modal appears whenever you close  
  with edits. Press `Enter` to Save & Close, `Esc` to cancel.
- **Large text** — zoom up with `Ctrl++` for comfortable reading without  
  changing your document's stored font size.
- **Dark writing mode** — set background to `#000000` and text to `#ffffff`  
  for a pure black canvas.
- **Portable** — the entire `expresso-note` folder is self-contained.  
  Copy it to a USB drive and it runs from there in any browser.

---

*Expresso Note — made for writing, nothing else.*
