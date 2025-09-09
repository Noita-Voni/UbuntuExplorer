// Configuration and Constants
const CONFIG = {
    VIDEOS: [
        'videos/video1.mp4',
        'videos/video2.mp4', 
        'videos/video3.mp4',
        'videos/video4.mp4',
        'videos/video5.mp4'
    ],
    G20_COUNTRIES: [
        "Argentina", "Australia", "Brazil", "Canada", "China", 
        "France", "Germany", "India", "Indonesia", "Italy", 
        "Japan", "Mexico", "Russia", "Saudi Arabia", "South Africa", 
        "South Korea", "Turkey", "United Kingdom", "United States", "European Union"
    ],
    API_ENDPOINTS: {
        IP_GEOLOCATION: 'https://ipapi.co/json/',
        REVERSE_GEOCODE: 'https://api.bigdatacloud.net/data/reverse-geocode-client'
    },
    NOTIFICATIONS: {
        DURATION: 3000,
        TYPES: {
            SUCCESS: 'success',
            ERROR: 'error',
            WARNING: 'warning',
            INFO: 'info'
        }
    }
};

// Tailwind Configuration
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'ubuntu-blue': '#1e40af',
                    'ubuntu-dark': '#1e3a8a',
                    'ubuntu-light': '#3b82f6',
                    'ubuntu-gold': '#f59e0b',
                },
                fontFamily: {
                    'sans': ['Poppins', 'sans-serif'],
                },
            }
        }
    };
}
