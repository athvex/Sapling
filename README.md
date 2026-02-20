# 🌱 Sapling

Sapling is a beautiful, mobile-friendly Progressive Web App (PWA) for tracking habits, focus sessions, and daily reflections. Built with vanilla HTML, CSS, and JavaScript, it works offline and can be installed on any device.

![Sapling App](image.png)

## 🚀 Live Demo

Check out the live version of Sapling:  
**[https://athvex.github.io/sapling](https://athvex.github.io/sapling)** ✨

## ✨ Features

### 📊 Dashboard
- Daily focus minutes summary
- Today's habit completion percentage
- Total distraction count
- Number of completed focus sessions

### ⏱️ Focus Timer
- Customizable timer (5-60 minutes)
- Start, pause, and reset controls
- Distraction tracking
- Session history with timestamps

### ✅ Habit Tracker
- Create, rename, and delete habits
- Monthly calendar view
- Click any date to mark habit completion
- Yearly heatmap for long-term progress
- Statistics tracking:
  - Current streak
  - Longest streak
  - Total days completed
  - Monthly completion rate

### 📝 Daily Journal
- Write daily reflections
- Automatic timestamp on save
- Permanent entry history

### 📱 Mobile Optimized
- Hamburger menu for small screens
- Responsive grid layouts
- Touch-friendly interface
- Compact stats display

### 🚀 PWA Features
- Installable on any device
- Works offline
- Fast loading with service worker
- Local storage persistence

## 🛠️ Installation

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/athvex/sapling.git
cd sapling
```

2. **Run a local server**
```bash
# Using Python
python -m http.server 5500

# Using Node.js
npx live-server

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

3. **Open in browser**
```
http://localhost:5500
```

### GitHub Pages Deployment

1. **Create a repository** on GitHub
2. **Push your code**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/athvex/sapling.git
git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Select branch: `main`
   - Folder: `/ (root)`
   - Click **Save**
   - Your site will be live at: `https://athvex.github.io/sapling/`

## 📁 Project Structure

```
sapling/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── README.md               # This file
├── image.png               # App screenshot
├── css/
│   └── style.css           # All styles
├── js/
│   └── script.js           # All JavaScript
└── assets/
    └── icons/
        ├── icon-192x192.png    # App icon (192×192)
        └── icon-512x512.png    # App icon (512×512)
```

## 🎨 Color Theme

- **Primary Green**: `#2e4d39`, `#345f47`
- **Warm Brown**: `#cfc1b2`, `#b5917c`
- **Neutral Beige**: `#fefcf9`, `#e9e2d8`
- **Accent Sage**: `#6f8b7a`, `#689f7a`

## 📱 Mobile Breakpoints

- **≤700px**: Mobile layout with hamburger menu
- **≤480px**: Compact calendar and stats

## 🔧 Configuration

### Icons

Place your app icons in `assets/icons/`:
- `icon-192x192.png` (192×192 pixels)
- `icon-512x512.png` (512×512 pixels)

### Manifest

Edit `manifest.json` to customize:
```json
{
  "name": "Your App Name",
  "short_name": "Short Name",
  "theme_color": "#your-color",
  "background_color": "#your-color"
}
```

### Service Worker

The service worker caches all essential files. Update `sw.js` if you add new assets:
```javascript
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png'
];
```

## 🚀 Usage

### Adding Habits
1. Go to **Habits** section
2. Type habit name in "New habit name"
3. Click **Add habit**
4. Select habit from dropdown to track

### Marking Completion
- Click any date in the calendar to toggle completion
- Click heatmap cells for quick year-view tracking
- Checkmarks appear on fully completed days

### Focus Sessions
1. Select duration (5-60 minutes)
2. Click **Start**
3. Track distractions with **+ I got distracted**
4. Sessions auto-save when timer ends

### Writing Reflections
1. Go to **Journal** section
2. Write in the textarea
3. Click **Save** (timestamp added automatically)
4. All entries appear below with timestamps

## 💾 Data Storage

All data is stored locally in your browser:
- **Habits** and completions
- **Focus sessions** history
- **Journal entries**

No data is sent to any server - completely private!

## 🌐 Browser Support

- Chrome (desktop & Android)
- Firefox
- Safari (iOS & macOS)
- Edge
- Samsung Internet

## 📸 Screenshots

| Desktop | Mobile |
|---------|--------|
| ![Desktop](image.png) | ![Mobile](image.png) |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 Sapling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Font: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- Icons: Created with [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- Inspiration: Atomic Habits by James Clear

**Made with 🌱 for better habits by [Atharva Kassa](https://github.com/athvex)**