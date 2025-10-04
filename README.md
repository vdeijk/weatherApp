# 🎪 FestivaCast

### Check the Skies Before You Celebrate

**FestivaCast** is a mobile-first weather forecasting application designed to help event organizers and attendees plan outdoor celebrations with confidence. Built for the [NASA Space Apps Challenge](https://www.spaceappschallenge.org/), this app combines interactive mapping, event management, and weather forecasting to ensure your festivals, concerts, marathons, and outdoor gatherings aren't rained out.

## 🚀 [Try It Live](https://vdeijk.github.io/weatherApp/) | [GitHub Repository](https://github.com/vdeijk/weatherApp)

---

## 🌟 Problem Statement

Outdoor events—from music festivals to marathons—are heavily impacted by weather conditions. Organizers need accurate, location-specific weather forecasts to make critical decisions about event timing, logistics, and safety. FestivaCast solves this by:

- 📍 **Interactive Location Selection** – Pin locations on a map or search by city
- 📅 **Date-Specific Forecasting** – Get weather predictions for specific event dates
- 🎭 **Event Integration** – Browse upcoming events and check their weather forecasts
- 🗺️ **Visual Event Mapping** – See all events on an interactive map with custom markers

---

## ✨ Features

### 🎯 Core Functionality
- **Interactive Map** – Click anywhere to get location-based weather, with custom red/blue markers
- **Event Browser** – View upcoming events with dates, times, and locations
- **Event Selection** – Click event cards to highlight them (red border) and see their location on the map (blue pin)
- **Weather Forecast** – 5-day forecast with temperature, humidity, wind speed, and conditions
- **Alert Banner** – Warnings for severe weather conditions
- **Responsive Design** – Mobile-first UI optimized for on-the-go event planning

### 🎨 User Experience
- **Smooth Animations** – Gradient backgrounds, hover effects, and smooth transitions
- **Visual Feedback** – Selected events show red borders; selected pins turn blue
- **Permanent Tooltips** – Event and location names always visible on map markers
- **Intuitive Navigation** – Clear routing between Home, Input, Map, Events, and Forecast pages
- **Accessible Design** – High contrast colors and semantic HTML structure

---

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** – Latest React with improved rendering and hooks
- **TypeScript** – Type-safe code for better maintainability
- **Vite** – Lightning-fast build tool and dev server

### State Management
- **MobX 6.15.0** – Reactive state management with computed properties
- **mobx-react-lite** – Lightweight React bindings for MobX observers

### Mapping & Location
- **Leaflet 1.9.4** – Open-source interactive maps
- **React Leaflet 5.0.0** – React components for Leaflet
- **Nominatim OpenStreetMap** – Geocoding and reverse geocoding

### Routing & UI
- **React Router 7.9.3** – Client-side routing with active link states
- **CSS Modules** – Scoped styling with CSS variables for theming
- **Custom Components** – Reusable Button, TextInput, DateInput, EventCard, AlertBanner

---

## 🏗️ Architecture Highlights

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    App.tsx (Router)                    │  │
│  │                  ┌───────────────┐                     │  │
│  │                  │  Layout.tsx   │                     │  │
│  │                  │  (Navigation) │                     │  │
│  │                  └───────┬───────┘                     │  │
│  └──────────────────────────┼─────────────────────────────┘  │
│                             │                                │
│     ┌───────────────────────┼───────────────────────┐        │
│     │                       │                       │        │
│  ┌──▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐  ┌─▼─────┐  │
│  │ Input   │  │    Map      │  │   Events    │  │Forecast│  │
│  │  Page   │  │    Page     │  │    Page     │  │  Page  │  │
│  └──┬──────┘  └──────┬──────┘  └──────┬──────┘  └─┬──────┘  │
│     │                │                │            │         │
│     └────────────────┴────────┬───────┴────────────┘         │
│                               │                               │
│           ┌───────────────────▼────────────────┐             │
│           │      MobX Stores (Observable)      │             │
│           ├────────────────────────────────────┤             │
│           │  inputStore    │  mapStore         │             │
│           │  - location    │  - coordinates    │             │
│           │  - date        │  - selectedEvent  │             │
│           │  - validation  │  - eventMarkers   │             │
│           ├────────────────┼───────────────────┤             │
│           │ eventsStore    │  forecastStore    │             │
│           │  - events[]    │  - weatherData    │             │
│           │  - loading     │  - loading        │             │
│           │  - error       │  - error          │             │
│           └────────┬───────┴──────┬────────────┘             │
│                    │              │                          │
└────────────────────┼──────────────┼──────────────────────────┘
                     │              │
          ┌──────────▼──────┐  ┌────▼─────────┐
          │   Geocoding     │  │   Weather    │
          │   API Service   │  │  API Service │
          │ (Nominatim OSM) │  │  (Mock Data) │
          └─────────────────┘  └──────────────┘
```

### Data Flow

**Event Selection Flow:**
```
User clicks event card
    │
    ▼
eventsStore → mapStore.selectEvent(id, coords)
    │
    ├──▶ mapStore.selectedEventId = id
    ├──▶ mapStore.location = coords
    └──▶ inputStore.location = eventName
    │
    ▼
Observer pattern triggers re-render
    │
    ├──▶ EventCard shows red border
    ├──▶ Map re-centers to event
    └──▶ Event pin turns red
```

### MobX Store Pattern
The app uses four specialized MobX stores for reactive state management:

1. **`inputStore`** – Manages location and date inputs with validation
2. **`mapStore`** – Tracks map location, selected events, and event markers
3. **`eventsStore`** – Manages event data and upcoming events list
4. **`forecastStore`** – Handles weather data fetching and loading states

### Key Design Decisions

**Computed Properties**
```typescript
// Automatic reactivity - eventMarkers updates when eventsStore changes
get eventMarkers(): MapMarker[] {
  return eventsStore.upcomingEvents.map(event => ({
    id: event.id,
    lat: event.lat,
    lng: event.lng,
    name: event.name,
    type: 'event' as const
  }));
}
```

**Event Selection Flow**
1. User clicks event card → `mapStore.selectEvent()` called
2. Selected event ID stored → Card shows red border
3. Map re-centers to event → Event pin turns blue
4. Location input updates automatically

**Observer Pattern**
All components that read MobX state are wrapped with `observer()` for automatic re-rendering when data changes.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/vdeijk/weatherApp.git
cd weatherApp

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📱 Usage Guide

### 1. **Home Page**
- View the hero image and app title "FestivaCast"
- Navigate to other sections via the top navigation bar

### 2. **Location & Date Page**
- Enter a city name or location
- Select an event date using the date picker
- Click "🔍 Get Forecast" to fetch weather data

### 3. **Map Page**
- **Click anywhere** on the map to select a location
- **Red markers** show upcoming events
- **Blue marker** shows your selected location or selected event
- Click event markers to select them
- Use "🎯 Center" button to recenter the map

### 4. **Upcoming Events Page**
- Browse event cards with dates, times, and descriptions
- **Click any event card** to select it (red border appears)
- Selected events show blue pins on the map
- Click "📍 Select Event" button to navigate to map view

### 5. **Forecast Page**
- View current weather conditions
- See 5-day forecast with highs/lows
- Check humidity and wind speed details
- Alert banner warns of severe weather

---

## 🎨 Design System

### CSS Variables
```css
--color-primary: #0984e3          /* Primary blue */
--color-secondary: #74b9ff        /* Light blue */
--color-red: #e74c3c              /* Accent red */
--color-accent: #fdfdfd           /* White accent */
--gradient-blue: linear-gradient(90deg, #0984e3 0%, #74b9ff 100%)
--gradient-page-bg: linear-gradient(135deg, #ffeaa7 0%, #a8e6ff 50%, #81ecec 100%)
```

### Component Styling
- **Gradient Buttons** – Blue gradient with hover scale effect
- **Card Shadows** – `0 4px 24px rgba(0, 0, 0, 0.12)`
- **Border Radius** – 18px (standard), 26px (large)
- **Mobile-First** – All components optimized for mobile screens

---

## 📂 Project Structure

```
my-react-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AlertBanner/     # Weather alert notifications
│   │   ├── Button/          # Styled button with disableHover prop
│   │   ├── DateInput/       # Date picker input
│   │   ├── EventCard/       # Event display card (clickable)
│   │   ├── Layout/          # App layout wrapper
│   │   ├── NavBar/          # Navigation bar
│   │   ├── NavLink/         # Active link component
│   │   └── TextInput/       # Text input field
│   ├── pages/               # Route pages
│   │   ├── MainPage/        # Home page with hero image
│   │   ├── InputPage/       # Location & date inputs
│   │   ├── MapPage/         # Interactive Leaflet map
│   │   ├── EventsPage/      # Event browser grid
│   │   ├── ForecastPage/    # Weather forecast display
│   │   ├── LoadingPage/     # Loading spinner
│   │   └── ErrorPage/       # Error handling
│   ├── states/              # MobX stores
│   │   ├── inputStore.ts    # Input validation & state
│   │   ├── mapStore.ts      # Map location & event selection
│   │   ├── eventsStore.ts   # Event data management
│   │   └── forecastStore.ts # Weather data & API calls
│   ├── interfaces/          # TypeScript interfaces
│   │   ├── WeatherData.ts
│   │   └── ForecastDay.ts
│   ├── utils/               # Utility functions
│   │   ├── geocode.ts       # City → coordinates
│   │   └── reverseGeocode.ts # Coordinates → city
│   ├── assets/              # Images and static files
│   ├── variables.css        # CSS custom properties
│   ├── App.tsx              # Router setup
│   ├── index.css            # Global styles
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

---

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start dev server (hot reload enabled)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### ESLint Configuration
The project uses TypeScript ESLint with React-specific rules. Configured in `eslint.config.js`.

---

## 🌐 API Integration

### Current Implementation
- **OpenStreetMap Nominatim** – Geocoding and reverse geocoding
- **Mock Weather Data** – Placeholder for demonstration

### Future Enhancements
- **NASA POWER API** – Global weather and solar data
- **OpenWeatherMap API** – Real-time weather forecasts
- **Weather Alerts API** – Severe weather notifications

---

## 🎯 NASA Space Apps Challenge

FestivaCast was created for the NASA Space Apps Challenge to address the challenge of helping communities plan outdoor activities around weather conditions. The app demonstrates:

- **User-Centered Design** – Intuitive interface for non-technical users
- **Data Visualization** – Clear presentation of weather data through maps and forecasts
- **Scalable Architecture** – Built to integrate with NASA POWER API and other weather data sources
- **Mobile Accessibility** – Responsive design for on-the-go event planning
- **Real-World Application** – Solves actual problems for event organizers worldwide

---

## 🚧 Future Roadmap

- [ ] Integrate NASA POWER API for global weather data
- [ ] Add historical weather patterns for event date selection
- [ ] Implement weather alerts with push notifications
- [ ] Add social sharing (export forecast as image)
## 🚀 Future Roadmap

### Phase 1: Enhanced Weather Intelligence (High Priority)
- [ ] **NASA POWER API Integration** – Replace mock data with real NASA satellite weather data
  - Historical weather analysis
  - Solar irradiance data for outdoor events
  - Climate projections for long-term event planning
- [ ] **Advanced Weather Alerts** – Push notifications for severe weather warnings
- [ ] **Multi-day Forecasts** – Extended 7-14 day weather predictions
- [ ] **Weather Data Visualization** – Interactive charts showing temperature trends, precipitation probability, wind patterns

### Phase 2: User Experience & Personalization (Medium Priority)
- [ ] **User Accounts & Saved Events** – Personal event calendars and preferences
- [ ] **Email Notifications** – Automated weather updates for saved events
- [ ] **Custom Weather Thresholds** – Set alerts based on user-defined conditions (e.g., "notify if rain > 50%")
- [ ] **Dark Mode Toggle** – Reduce eye strain for nighttime planning
- [ ] **Multi-language Support (i18n)** – Reach global event organizers

### Phase 3: Advanced Features (Future Vision)
- [ ] **Progressive Web App (PWA)** – Offline support and mobile app-like experience
- [ ] **Social Sharing** – Export weather reports as images/PDFs for social media
- [ ] **Event Weather Comparison** – Side-by-side comparison of weather for multiple dates/locations
- [ ] **Historical Weather Analysis** – Show past weather for recurring annual events
- [ ] **API for Event Platforms** – Integrate FestivaCast into Eventbrite, Meetup, etc.
- [ ] **Machine Learning Predictions** – AI-powered recommendations for optimal event timing

### Phase 4: Community & Scale
- [ ] **Public Event Database** – Community-submitted events with weather forecasts
- [ ] **Event Organizer Dashboard** – Analytics on weather impacts for past events
- [ ] **Mobile Native Apps** – iOS and Android versions
- [ ] **Enterprise Features** – Premium features for large-scale event management companies

### Near-Term Priorities (Next Sprint)
1. Deploy to production (GitHub Pages)
2. Integrate NASA POWER API for real weather data
3. Add weather data visualization charts
4. Implement PWA functionality
5. User testing and feedback collection

---

## 🤝 Contributing

This project was built for the NASA Space Apps Challenge. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**vdeijk**
- GitHub: [@vdeijk](https://github.com/vdeijk)
- Repository: [weatherApp](https://github.com/vdeijk/weatherApp)

---

## 🙏 Acknowledgments

- **NASA Space Apps Challenge** – For inspiring innovative solutions to real-world problems
- **OpenStreetMap** – For providing free geocoding services
- **Leaflet** – For the powerful open-source mapping library
- **React & MobX Community** – For excellent documentation and tools

---

## 📸 Screenshots

*Coming soon! Add screenshots of your app in action:*
- Home page with hero image
- Interactive map with event pins
- Event browser with selection states
- Weather forecast display

---

**Built with ❤️ for the NASA Space Apps Challenge 2025** 🚀🌍
