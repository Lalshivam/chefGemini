# 🍳 Chef Gemini - AI Recipe Generator

A beautiful React application that helps you create delicious recipes using the ingredients you have at home, powered by Google's Gemini AI.

## Features

- ✨ Clean and intuitive user interface
- 🥗 Add and manage your available ingredients
- 🤖 AI-powered recipe generation using Google Gemini
- 📱 Responsive design for all devices
- 🎨 Beautiful gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher)
- npm or yarn
- A Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chefGemini
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Open `.env` and replace `your_gemini_api_key_here` with your actual API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. **Add Ingredients**: Type ingredients you have and click "Add" or press Enter
2. **Manage Ingredients**: Click the "×" button on any ingredient tag to remove it
3. **Get Recipe**: Click the "Get Recipe" button to generate a recipe using your ingredients
5. **Enjoy Cooking**: Follow the detailed recipe instructions provided by AI

## API Key Security

⚠️ **Important**: This application stores the API key in memory only. The key is not saved to local storage or sent anywhere except to Google's Gemini API. For production use, consider implementing proper API key management.

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and development server
- **Google Generative AI** - Gemini API integration
- **CSS3** - Modern styling with gradients and animations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ and powered by Google Gemini AI+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
