
class SupportlyApi {

  static token = localStorage.getItem("token");
  static baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

  static async fetchResponse(url, headers) {
    console.debug("API Call:", url, headers);

    try {
      const response = await fetch(url, headers);
      if (response.status === 200) {
        return [true, await response.json()];
      } else {
        return [false, await response.text()];
      }
    } catch (error) {
      console.error(error);
      return [false, null];
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

  static async submitTicket(data) {
    return await this.fetchResponse(
      this.baseUrl + 'tickets/',
      {
        method: "POST",
        headers: this.getHeaders(false),
        cache: "no-cache",
      }
    );
  }
}

export default SupportlyApi;
