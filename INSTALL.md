# Installing SENTINEL

SENTINEL runs as an unpacked Chromium extension — it works in **Chrome, Edge, Brave**,
and any Chromium browser, on **macOS, Windows, and Linux**. The install steps are the
same on every OS; the only platform difference is the *optional* packaging zip in
Option B (noted inline below).

## Prerequisites

The same on Mac, Windows, and Linux:

| Tool | Download |
|------|----------|
| **Node.js 18+** (gives you `npm`) | <https://nodejs.org/en/download> |
| **Git** | <https://git-scm.com/downloads> |
| A **Chromium browser** | [Chrome](https://www.google.com/chrome/) — or the **Edge** already installed on Windows |

> **macOS tip:** if you use Homebrew, `brew install node git` covers both.
> **Windows tip:** the Node.js installer includes npm; run the commands below in
> **PowerShell** or **Command Prompt** (they're identical to macOS).

---

## Option A — from the repo (recommended)

```bash
git clone https://github.com/alirizzzv/SENTINEL.git
cd SENTINEL
npm install
npm run build      # builds the engine bundle + dashboard into extension/
```

These commands are identical on macOS and Windows. Then load it (see **Load unpacked**
below), pointing at the `extension/` folder. **You do not need to zip anything to use it** —
loading the folder is enough.

## Option B — packaged zip (only for sharing the build)

A zip is just a convenient way to hand the extension to someone else; you still
**unzip and Load unpacked** to install it. Build it after `npm run build`:

- **macOS / Linux:** `npm run package:ext` → creates `sentinel-extension.zip`
- **Windows (PowerShell):** the `npm run package:ext` script uses the Unix `zip`
  command, so instead run:
  ```powershell
  Compress-Archive -Path extension\* -DestinationPath sentinel-extension.zip
  ```

If a prebuilt zip is attached to the repo's
[Releases](https://github.com/alirizzzv/SENTINEL/releases), you can download it there
instead of building. Either way, unzip it somewhere permanent (don't delete the folder
afterwards — the browser loads it from disk).

---

## Load unpacked

1. Open the extensions page:
   - **Chrome / Brave:** `chrome://extensions`
   - **Edge (Windows default):** `edge://extensions`
2. Toggle **Developer mode** on (top-right in Chrome; left sidebar in Edge).
3. Click **Load unpacked**.
4. Select the **`extension/`** folder (Option A) or the unzipped folder (Option B).
5. SENTINEL appears in your toolbar. Pin it (puzzle-piece icon → pin) for the popup.

## Use it

1. Open **ChatGPT** (chatgpt.com), **Claude** (claude.ai), or **Gemini**
   (gemini.google.com).
2. Type a prompt containing something sensitive — e.g. paste this fake key:
   `AKIAIOSFODNN7EXAMPLE`
3. Press **Enter**. Before the prompt is sent, SENTINEL's modal slides in:
   - **Redact & Send** — replaces secrets with `[PLACEHOLDERS]` and sends.
   - **Send Anyway** — sends as-is (logged locally).
   - **Cancel** — keeps the prompt in the box to edit.
4. Click the toolbar icon for today's stats, or **Open Full Dashboard** for
   trends, history, and settings.

## Privacy

- SENTINEL requests only `storage` and access to the three LLM domains.
- It makes **no network requests** while scanning — open DevTools → Network on
  any LLM page to verify. Only anonymized metadata is stored locally (IndexedDB),
  never your prompt text.

## Troubleshooting

- **Modal didn't appear?** The LLM site may have changed its layout. Interception
  uses CSS selectors defined in `extension/content/adapter-registry.js` — they use
  fallbacks, but a major redesign can require a one-line update there.
- **Changed the code?** Return to the extensions page (`chrome://extensions` or
  `edge://extensions`) and click the **reload** (↻) icon on the SENTINEL card.
- **Dashboard empty?** It populates as you use AI tools; the bundled sample data
  only shows when the dashboard is opened *outside* the extension.
