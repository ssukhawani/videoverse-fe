import mainAxiosInstance from "@/interceptor/instance";

class Repository {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Perform GET request
  async get(id) {
    const url = id ? `${this.endpoint}${id}` : `${this.endpoint}`;
    try {
      const response = await mainAxiosInstance.get(url);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform POST request
  async post(data) {
    try {
      const response = await mainAxiosInstance.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform PUT request
  async put(id, data) {
    const url = `${this.endpoint}${id}`;
    try {
      const response = await mainAxiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform PATCH request
  async patch(id, data) {
    const url = `${this.endpoint}${id}`;
    try {
      const response = await mainAxiosInstance.patch(url, data);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform DELETE request
  async delete(id) {
    const url = `${this.endpoint}${id}`;
    try {
      const response = await mainAxiosInstance.delete(url);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Default error handling method
  // Override this method in child classes for custom error handling
  onError(error) {
    throw error;
  }
}

export default Repository;
