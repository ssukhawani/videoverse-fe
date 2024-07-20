import { apiEndpoints } from "@/constants/apiEndpoints";
import mainAxiosInstance from "@/interceptor/instance";
import Repository from "./repository";

// Auth service
class AuthService extends Repository {
  constructor() {
    // Here we can add the authService endpoint
    super(apiEndpoints.AUTH_SERVICE);
  }

  // override post method
  async post(endpoint, data) {
    try {
      const response = await mainAxiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Override the onError method for customized error handling
  async onError(error) {
    // Custom error handling logic specific to Auth
    // Perform additional actions or return custom error responses
    // Returning a fallback response
    throw error;
  }

  // Custom method for register
  async register(userData) {
    try {
      const response = await this.post(this.endpoint + apiEndpoints.AUTH_REGISTER, userData);
      return response;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Custom method for login
  async login(loginData) {
    try {
      const response = await this.post(this.endpoint + apiEndpoints.AUTH_LOGIN, loginData);
      return response;
    } catch (error) {
      return this.onError(error);
    }
  }


  async fetchLoggedInUser() {
    try {
      const response = await this.get(apiEndpoints.GET_LOGGED_IN_USER);
      return response;
    } catch (error) {
      return this.onError(error);
    }
  }

  // logout api
  async logout(logoutData) {
    try {
      const response = await this.post(this.endpoint + apiEndpoints.LOGOUT, logoutData);
      return response;
    } catch (error) {
      return this.onError(error);
    }
  }

}

export default AuthService;
