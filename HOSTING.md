# 21km Race Prep — Hosting Guide

This is a small React app (built with Vite) showing your training plan. It's a
static site — no server or database needed — so any static host works.

## Option A: GitHub Pages (free, what you asked about)

1. **Create a GitHub repo.** Go to github.com, click "New repository", name it
   something like `race-prep` (the name matters, see step 3).

2. **Push this project to it.** From inside this folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/race-prep.git
   git push -u origin main
   ```

3. **Set the base path.** Open `vite.config.js` and make sure the `base` value
   matches your repo name exactly, e.g. if your repo is `race-prep`:
   ```
   base: '/race-prep/',
   ```
   This is already set to `/race-prep/` — change it if you named your repo
   something else.

4. **Install dependencies and deploy:**
   ```
   npm install
   npm run deploy
   ```
   This builds the app and pushes the `dist` folder to a `gh-pages` branch
   automatically (the `gh-pages` package handles this).

5. **Turn on Pages in repo settings.** On GitHub: Settings → Pages → under
   "Build and deployment", set Source to "Deploy from a branch", branch to
   `gh-pages`, folder to `/ (root)`. Save.

6. Your app will be live at:
   ```
   https://YOUR-USERNAME.github.io/race-prep/
   ```
   (takes 1-2 minutes after the first deploy)

Whenever you want to update the plan later, edit the files and just run
`npm run deploy` again.

## Option B: Netlify (easier, also free, drag-and-drop)

1. Run `npm install` then `npm run build` locally — this creates a `dist` folder.
2. Go to app.netlify.com, drag the `dist` folder onto the page.
3. Done — you get a live URL immediately, no git required.

This is the fastest option if you just want it live today and don't care
about GitHub specifically.

## Option C: Vercel (also easy, free)

1. Go to vercel.com, sign in, "Add New Project".
2. Either connect your GitHub repo (if you did Option A) or drag-and-drop
   the project folder.
3. Vercel auto-detects Vite and builds it for you.

## Local testing before you deploy

To preview it on your own machine first:
```
npm install
npm run dev
```
This opens a local dev server (usually http://localhost:5173) so you can
check everything looks right before publishing.

## Notes
- This project needs Node.js installed on your computer to run the
  `npm` commands above. If you don't have it, install it from nodejs.org first.
- All your data (checked-off exercises) is stored in the browser's memory only
  while the page is open — it resets on refresh. If you want it to remember
  your progress between visits, let me know and I can add that.
