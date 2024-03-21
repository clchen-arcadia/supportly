
class SupportlyApi {

  static token = localStorage.getItem("token");
  static baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001/";

  static async fetchResponse(url, headers) {
    console.debug("API Call:", url, headers);
    // debugger;

    try {
      const response = await fetch(url, headers);
      return response
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

  static async submitTicket(ticketSubmitData) {
    // debugger;

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
}

export default SupportlyApi;
