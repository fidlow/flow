import { ResponseInterface } from "../../../server/src/common/ResponseInterface";
import { rootStore } from "../components/App";

class Api {
  static SERVER_PORT = process.env.REACT_APP_PORT;
  static SERVER_PREFIX = '/api';

  static get(endpoint: string): Promise<ResponseInterface> {
    return fetch(`http://localhost:${this.SERVER_PORT+this.SERVER_PREFIX+endpoint}`, {
      method: 'get',
      credentials: "include"
    }).then(this.handleResponse)
  }
  static post(endpoint: string, body: Record<string, undefined>): Promise<ResponseInterface> {
    return fetch(`http://localhost:${this.SERVER_PORT+this.SERVER_PREFIX+endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body),
      credentials: "include"
    }).then(this.handleResponse)
  }
  static handleResponse(resp: Response): Promise<ResponseInterface> {
    return resp.json().then((data) => {
      if(data.statusCode === 401) rootStore?.userStore?.user?.remove();
      return data;
    });
  }
  static login(): Promise<ResponseInterface> {
    return this.get('/login');
  }
  static getProjects(): Promise<ResponseInterface> {
    return this.get('/project');
  }


}

export default Api
