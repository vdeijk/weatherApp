import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./components/Layout/Layout";
import InputPage from "./pages/InputPage/InputPage";
import MapPage from "./pages/MapPage/MapPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import ErrorPage from "./pages/ErrorPage/Errorpage";
import { observer } from "mobx-react-lite";
import { forecastStore } from "./states/forecastStore";
import ForecastPage from "./pages/ForecastPage/ForecastPage";

const App: React.FC = observer(() => {
  if (forecastStore.loading) {
    return <LoadingPage />;
  }
  if (forecastStore.error) {
    return <ErrorPage error={forecastStore.error} />;
  }
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
        </Routes>
      </Layout>
    </Router>
  );
});

export default App;
