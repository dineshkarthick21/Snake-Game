# 🐍 DK's SNAKE

A modern, interactive Snake game with cursor-based movement and retro-neon aesthetics. Play on desktop with your mouse or on mobile with touch controls!

## 🎮 Live Demo

Play now on **Render**: https://dks-snake-game.onrender.com/

## Features

- **🎮 Cursor & Touch-Based Movement**: Control with mouse on desktop or touch on mobile
- **📱 Fully Mobile-Responsive**: Optimized experience on phones, tablets, and desktops
- **🎨 Multiple Color Themes**: Choose from different snake color palettes with glowing effects
- **✨ Trail Effects**: Toggle visual trails as the snake moves
- **📊 Live Stats**: Track your snake's length and movement speed in real-time
- **🔄 Reset Button**: Quick reset to start a new game
- **⚡ Optimized Performance**: Smooth gameplay on all devices with responsive sizing
- **🌙 Dark Mode UI**: Sleek dark interface with neon glow effects
- **🔄 Auto-Orientation Support**: Game adapts to landscape and portrait modes
- **🎯 Touch-Friendly UI**: Large, easy-to-tap buttons on mobile devices

## How to Play

### Desktop
1. Open the game in your web browser
2. Move your cursor around the screen to control the snake
3. Eat the food orbs to grow your snake longer

### Mobile
1. Open the game on your phone or tablet
2. Touch and drag your finger to control the snake
3. Bring your finger near the food to eat it

### Controls
- 🎨 **COLOR**: Cycle throug, Canvas API, and responsive viewport meta tags
- **JavaScript (ES6+)**: Game logic, state management, smooth animations, and device detection
- **CSS3**: Responsive design, animations, media queries, and modern effects
- **Canvas API**: Efficient 2D rendering and particle effects

## Responsive Design

The game features intelligent responsive design:
- **Fluid Typography**: Uses `clamp()` for text that scales smoothly
- **Touch-Optimized**: Special handling for touch events on mobile devices
- **Orientation Support**: Automatically adapts to landscape and portrait modes
- **Performance Optimized**: Mobile-specific configuration for optimal gameplay
- **Safe Area Support**: Respects notches and safe areas on modern phones

Mobile features include:
- Smaller, more responsive snake segments
- Touch-based movement tracking
- Optimized button sizing and spacing
- Automatic "touch to play" subtitle on mobile
- Improved visibility and readability on smaller screens

- **HTML5**: Semantic markup and canvas element
- **JavaScript**: Local Setup

1. Clone this repository:
```bash
git clone https://github.com/dineshkarthick21/Snake-Game.git
cd Snake-Game/snake
```

2. Open in your browser:
```bash
# Simply open the file in any modern web browser
open index.html
```

Or serve with a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npx)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Deployment

### Deployed on Render
This game is live and playable at: **[https://snake-game-dk.onrender.com](https://snake-game-dk.onrender.com)**

Steps to deploy on Render:
1. Push your code to GitHub
2. Connect your repository to Render
3. Set build and start commands
4. Deploy!
Or serve it with a local server (optional):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```
 & Pointer Events
- ES6+ JavaScript
- CSS Grid, Flexbox & Media Queries
- Touch Events (mobile)

Tested on:
- **Desktop**: Chrome/Edge 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Android Chrome, Samsung Internet
- **Tablets**: iPad, Android tablets | Mouse/Cursor Movement |
| Change Color | Click 🎨 COLOR Button |
| Toggle Trail | Click ✨ TRAIL Button |
| New Game | Click ↺ RESET Button |

## Customization

You can easily customize the game by editing:

- **Colors**: Modify the `PALETTES` array in `snake.js`
- **Game Speed**: Adjust the game logic timing
- **Styling**: Edit `style.css` for appearance changes
- **Canvas Size**: The size automatically matches your window

## Browser Support

Works on all modern browsers supporting:
- HTML5 Canvas
- ES6 JavaScript
- CSS Grid & Flexbox

Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Author

**Dinesh Karthick** (@dineshkarthick21)

## License

This project is open source and available under the MIT License.

---

**Enjoy the game! 🎮**
