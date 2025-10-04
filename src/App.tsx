import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./components/Layout";
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
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path="/main"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path="/input"
          element={
            <Layout>
              <InputPage />
            </Layout>
          }
        />
        <Route
          path="/map"
          element={
            <Layout>
              <MapPage />
            </Layout>
          }
        />
        <Route
          path="/forecast"
          element={
            <Layout>
              <ForecastPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
});

export default App;
