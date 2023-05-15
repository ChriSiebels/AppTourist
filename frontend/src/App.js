import "./pages/Home.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ToursList from "./pages/ToursList";
import ToursDetails from "./pages/ToursDetails";
import TourSuggestions from "./pages/TourSuggestions";
import CreateTour from "./pages/CreateTour";
import EditTour from "./pages/EditTour";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/tours"
          element={
            <IsPrivate>
              <ToursList />
            </IsPrivate>
          }
        />
        <Route
          path="/tours/edit/:toursId"
          element={
            <IsPrivate>
              <ToursDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/tours/edit/:toursId"
          element={
            <IsPrivate>
              <TourSuggestions />
            </IsPrivate>
          }
        />
        <Route
          path="/tours/edit/:toursId"
          element={
            <IsPrivate>
              <CreateTour />
            </IsPrivate>
          }
        />
        <Route
          path="/tours/edit/:toursId"
          element={
            <IsPrivate>
              <EditTour />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
