import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080';

  get() {
    return this.http.get(this.baseUrl + '/api/getServico');
  }

  post(data) {
    return this.http.post(this.baseUrl + '/api/SaveServico', data);
  }

  update(data) {
    return this.http.post(this.baseUrl + '/api/UpdateServico', data);
  }

  delete(id) {
    return this.http.post(this.baseUrl + '/api/deleteServico', id);
  }
}
