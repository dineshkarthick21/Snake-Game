# 🐍 DK's SNAKE

A modern, interactive Snake game with cursor-based movement and retro-neon aesthetics.

## Features

- **🎮 Cursor-Based Movement**: Control the snake by moving your mouse/cursor around the screen
- **🎨 Multiple Color Themes**: Choose from different snake color palettes with glowing effects
- **✨ Trail Effects**: Toggle visual trails as the snake moves
- **📊 Live Stats**: Track your snake's length and movement speed in real-time
- **🔄 Reset Button**: Quick reset to start a new game
- **📱 Responsive Design**: Full-screen gaming experience that adapts to any screen size
- **🌙 Dark Mode UI**: Sleek dark interface with neon glow effects

## How to Play

1. Open `index.html` in your web browser
2. Move your cursor around the screen to control the snake's head
3. Eat the food (colored segments) to grow your snake
4. Avoid hitting the walls or yourself
5. Use the buttons to:
   - 🎨 **COLOR**: Cycle through different color schemes
   - ✨ **TRAIL**: Toggle trail effects on/off
   - ↺ **RESET**: Start a new game

## Technologies Used

- **HTML5**: Semantic markup and canvas element
- **JavaScript**: Game logic, state management, and animations
- **CSS3**: Styling, animations, and responsive layout

## Canvas-Based Rendering

The game uses HTML5 Canvas for smooth, efficient rendering:
- Responsive canvas that adapts to window resizing
- Smooth snake animations
- Glowing effects and visual feedback

## Installation & Usage

1. Clone this repository:
```bash
git clone https://github.com/dineshkarthick21/Snake-Game.git
cd Snake-Game
```

2. Open the game:
```bash
# Simply open the file in any modern web browser
open index.html
```

Or serve it with a local server (optional):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Game Controls

| Action | Control |
|--------|---------|
| Move Snake | Mouse/Cursor Movement |
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
