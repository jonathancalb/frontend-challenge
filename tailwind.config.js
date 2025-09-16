export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'iris-purple': '#8B5CF6',
        'iris-pink': '#EC4899', 
        'iris-yellow': '#F59E0B',
        'iris-orange': '#F97316',
        'iris-cyan': '#47ECD5',
        'iris-gray': '#9F9FA9',
      },
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate', 
        'typing': 'typing 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
        },
        typing: {
          '0%, 60%': { opacity: '1' },
          '30%': { opacity: '0.5' },
        },
      },
    },
  },
}
