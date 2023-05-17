import "./pages/Home.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import TourDetails from "./components/TourDetails";
import TourSuggestions from "./pages/TourSuggestions";
import CreateTour from "./pages/CreateTour";
import EditTour from "./pages/EditTour";
import ToursList from "./pages/ToursList"; // Asegúrate de que esta es la ruta correcta al archivo

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import NewTour from "./pages/NewTour";

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
          path="/tours/new"
          element={
            <IsPrivate>
              <NewTour></NewTour>
            </IsPrivate>
          }
        />

        <Route
          path="/tours/:tourId"
          element={
            <IsPrivate>
              <TourDetails />
            </IsPrivate>
          }
        />

        <Route
          path="/tours/edit/details/:toursId"
          element={
            <IsPrivate>
              <TourDetails />
            </IsPrivate>
          }
        />

        <Route
          path="/tours/edit/suggestions/:toursId"
          element={
            <IsPrivate>
              <TourSuggestions />
            </IsPrivate>
          }
        />

        <Route
          path="/tours/edit/create/:toursId"
          element={
            <IsPrivate>
              <CreateTour />
            </IsPrivate>
          }
        />

        <Route
          path="/tours/edit/edit/:toursId"
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
