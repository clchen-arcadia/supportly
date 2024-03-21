
class SupportlyApi {

  static token = localStorage.getItem("supportly-token");
  static baseUrl = process.env.REACT_APP_BASE_API_URL || "http://localhost:5001/";

  static async fetchResponse(endpoint, method, body = {}) {
    console.debug("API Call:", endpoint, method, body);

    try {
      const response = await fetch(
        this.baseUrl + endpoint,
        {
          method,
          body,
          headers: this.getHeaders(),
          cache: "no-cache",
        }
      );
      if (response.ok) {
        return [true, response];
      } else {
        return [false, response];
      }
    } catch (error) {
      console.error("API ERROR: ", error);
      return [false, "Server error"];
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
    const [success, response] = await this.fetchResponse('signup/', 'POST', signupFormData);
    if (success) {
      return [true, response.token];
    } else {
      return [false, Array.isArray(response.errors) ? response.errors.join(' ') : response.errors];
    }
  }

  static async loginUser(loginFormData) {
    const [success, response] = await this.fetchResponse('login/', 'POST', loginFormData);
    if (success) {
      return [true, response.token];
    } else {
      return [false, Array.isArray(response.errors) ? response.errors.join(' ') : response.errors];
    }
  }

  static async submitTicket(ticketSubmitData) {
    const [success, response] = await this.fetchResponse('tickets/', 'POST', ticketSubmitData);

    if (success) {
      return [true, response.message];
    } else {
      return [false, Array.isArray(response.errors) ? response.errors.join(' ') : response.errors];
    }

  }

  static async getCurrentUser(id) {
    const [success, response] = await this.fetchResponse(`users/${id}`, 'GET');

    if (success) {
      return [true, response.user];
    } else {
      return [false, Array.isArray(response.errors) ? response.errors.join(' ') : response.errors];
    }
  }
}

export default SupportlyApi;
