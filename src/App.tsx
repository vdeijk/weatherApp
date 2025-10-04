import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./components/Layout/Layout";
import InputPage from "./pages/InputPage/InputPage";
import MapPage from "./pages/MapPage/MapPage";
import ForecastPage from "./pages/ForecastPage/ForecastPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import ErrorPage from "./pages/ErrorPage/Errorpage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/events" element={<EventsPage />} />
          {/* Catch-all route for 404 Not Found */}
          <Route
            path="*"
            element={
              <ErrorPage error="Page not found. Please use the navigation above." />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
