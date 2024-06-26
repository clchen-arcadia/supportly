import axios from "axios";

export const TOKEN_STORAGE_KEY = 'supportly-token';

class SupportlyApi {

  static token = localStorage.getItem(TOKEN_STORAGE_KEY);
  static baseUrl = process.env.REACT_APP_BASE_API_URL || "http://localhost:5001";

  static async request(endpoint, data = {}, method = 'GET') {
    console.debug("API Call:", endpoint, data, method);

    const url = `${this.baseUrl}/${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      token: this.token,
    };

    const params = (method === 'GET')
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (error) {
      console.warn("API ERROR CAUGHT: ", error);
      throw error;
    }
  }

  static async signupUser(signupFormData) {
    const res = await this.request(`auth/signup/`, signupFormData, 'POST');
    return res.token;
  }

  static async loginUser(loginFormData) {
    const res = await this.request(`auth/login/`, loginFormData, 'POST');
    return res.token;
  }

  static async submitTicket(ticketSubmitData) {
    const res = await this.request(`tickets/`, ticketSubmitData, 'POST');
    return res.message;
  }

  static async getCurrentUser(id) {
    const res = await this.request(`auth/users/${id}/`);
    return res.user;
  }

  static async getTickets() {
    const res = await this.request(`tickets/`);
    return res.tickets;
  }

  static async respondToTicket(formData, ticketId) {
    const res = await this.request(`tickets/${ticketId}/email/`, formData, 'POST');
    return res.message;
  }

  static async updateTicket(formData, ticketId) {
    const res = await this.request(`tickets/${ticketId}/`, formData, 'PATCH');
    return res.message;
  }
}

export default SupportlyApi;
