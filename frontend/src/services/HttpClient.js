import delay from '../utils/delay';
import APIError from '../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(1000);

    const response = await fetch(`${this.baseUrl}${path}`);

    let body = null;
    const contentType = await response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(path, body) {
    await delay(1000);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'Post',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;
    const contentType = await response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
