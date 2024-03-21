
class SupportlyApi {

  static token = localStorage.getItem("token");
  static baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001/";

  static async fetchResponse(url, headers) {
    console.debug("API Call:", url, headers);

    try {
      const response = await fetch(url, headers);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static getHeaders(hasAuth = true) {
    const headers = {
      "Content-Type": "application/json"
    };
    if (hasAuth) {
      headers['token'] = this.token;
    }
    return headers;
  }

  static async signupUser(signupFormData) {
    return await this.fetchResponse(
      this.baseUrl + 'signup/',
      {
        method: "POST",
        body: JSON.stringify(signupFormData),
        headers: this.getHeaders(false),
        cache: "no-cache",
      }
    );
  }

  static async loginUser(loginFormData) {
    return await this.fetchResponse(
      this.baseUrl + 'login/',
      {
        method: "POST",
        body: JSON.stringify(loginFormData),
        headers: this.getHeaders(false),
        cache: "no-cache",
      }
    );
  }

  static async submitTicket(ticketSubmitData) {
    return await this.fetchResponse(
      this.baseUrl + 'tickets/',
      {
        method: "POST",
        body: JSON.stringify(ticketSubmitData),
        headers: this.getHeaders(false),
        cache: "no-cache",
      }
    );
  }

  static async getCurrentUser(id) {
    const response = await this.fetchResponse(
      this.baseUrl + `users/${id}/`,
      {
        method: "GET",
        headers: this.getHeaders(),
        cache: "no-cache",
      }
    );

    return response.user;
  }
}

export default SupportlyApi;
