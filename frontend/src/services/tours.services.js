import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
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
    return this.api.post("/api/tours", requestBody);
  };

  getAllTours = () => {
    return this.api.get("/api/tours");
  };

  getTours = (id) => {
    return this.api.get(`/api/tours/${id}`);
  };

  updateTours = (id, requestBody) => {
    return this.api.put(`/api/tours/${id}`, requestBody);
  };

  deleteTours = (id) => {
    return this.api.delete(`/api/tours/${id}`);
  };
}

const authService = new AuthService();

export default authService;
