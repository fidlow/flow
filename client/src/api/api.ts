import { ResponseInterface } from "../../../server/src/common/ResponseInterface";
import { rootStore } from "../components/App";
import { ProjectId } from "../commonFromServer/ProjectInterface";
import { EventId } from "../commonFromServer/EventInterface";
import { TaskId } from "../commonFromServer/TaskInterface";
import { AccountId } from "../commonFromServer/AccountInterface";

const SERVER_PORT = process.env.REACT_APP_PORT;
const API_PREFIX = '/api';
const SERVER_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost' : '';

class Api {
  private static SERVER_URL = `${SERVER_HOST}:${SERVER_PORT+API_PREFIX}`
  private static get(endpoint: string): Promise<ResponseInterface> {
    return fetch(`${this.SERVER_URL}${endpoint}`, {
      method: 'get',
      credentials: "include"
    }).then(this.handleResponse)
  }
  private static post(endpoint: string, body: Record<string, undefined>): Promise<ResponseInterface> {
    return fetch(`${this.SERVER_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body),
      credentials: "include"
    }).then(this.handleResponse)
  }

  private static put(endpoint: string, body: Record<string, undefined>): Promise<ResponseInterface> {
    return fetch(`${this.SERVER_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body),
      credentials: "include"
    }).then(this.handleResponse)
  }
  private static delete(endpoint: string): Promise<ResponseInterface> {
    return fetch(`${this.SERVER_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: "include"
    }).then(this.handleResponse)
  }
  private static handleResponse(resp: Response): Promise<ResponseInterface> {
    return resp.json().then((data) => {
      console.log(resp.url, data)
      if(data.statusCode === 400) data.message = data.statusCode;
      if(data.statusCode === 401) rootStore?.userStore?.user?.remove();
      return data;
    });
  }
  static login(account: Record<string, undefined>): Promise<ResponseInterface> {
    return this.post('/auth/login', account);
  }
  static addAccount(account: Record<string, undefined>): Promise<ResponseInterface> {
    return this.post('/auth/register', account);
  }
  static updateMyAccount(account: Record<string, undefined>): Promise<ResponseInterface> {
    return this.put(`/auth/account`, account);
  }
  static updateAccount(account: Record<string, undefined>): Promise<ResponseInterface> {
    return this.put(`/auth/account/${account}`, account);
  }
  static deleteAccount(accountId: AccountId): Promise<ResponseInterface> {
    return this.delete(`/auth/account/${accountId}`);
  }
  static updatePassword(account: Record<string, undefined>): Promise<ResponseInterface> {
    return this.put(`/auth/account`, account);
  }
  static getUser(): Promise<ResponseInterface> {
    return this.get(`/auth/account`);
  }
  static checkLogin(): Promise<ResponseInterface> {
    return this.get(`/auth`);
  }
  static getManagers(): Promise<ResponseInterface> {
    return this.get('/auth/managers');
  }
  static getAccounts(): Promise<ResponseInterface> {
    return this.get('/auth/accounts');
  }
  static getProjects(): Promise<ResponseInterface> {
    return this.get('/project');
  }
  static getProjectById(projectId: ProjectId): Promise<ResponseInterface> {
    return this.get(`/project/${projectId}`);
  }
  static getEventsWithProject(): Promise<ResponseInterface> {
    return this.get(`/event/project`);
  }
  static addProject(project: Record<string, undefined>): Promise<ResponseInterface> {
    return this.post(`/project`, project);
  }
  static updateProject(project: Record<string, undefined>): Promise<ResponseInterface> {
    return this.put(`/project/${project.id}`, project);
  }
  static deleteProject(projectId: string): Promise<ResponseInterface> {
    return this.delete(`/project/${projectId}`);
  }
  static getEventById(eventId: string): Promise<ResponseInterface> {
    return this.get(`/event/${eventId}`);
  }
  static getEvents(eventId: string): Promise<ResponseInterface> {
    return this.get(`/event/${eventId}`);
  }
  static addEventToProject(projectId: ProjectId, event: Record<string, undefined>): Promise<ResponseInterface> {
    return this.post(`/event/${projectId}`, event);
  }
  static updateEvent(event: Record<string, undefined>): Promise<ResponseInterface> {
    return this.put(`/event/${event.id}`, event);
  }
  static deleteEvent(eventId: EventId): Promise<ResponseInterface> {
    return this.delete(`/event/${eventId}`);
  }
  static addTaskToEvent(eventId: EventId, task: Record<string, undefined>): Promise<ResponseInterface> {
    return this.post(`/task/${eventId}`, task);
  }
  static updateTask(task: Record<string, undefined>): Promise<ResponseInterface> {
    return this.put(`/task/${task.id}`, task);
  }
  static deleteTask(taskId: TaskId): Promise<ResponseInterface> {
    return this.delete(`/task/${taskId}`);
  }


}

export default Api
