import axios from "axios";

class TourService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createTour = (requestBody) => {
    return this.api.post("/tours", requestBody);
  };

  getAllTours = () => {
    return this.api.get("/tours");
  };
}

const tourService = new TourService();

export default tourService;
