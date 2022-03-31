import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Response} from '../models/response';
import { Cliente } from '../models/cliente';

const HttpOption : object= {
  header: new HttpHeaders({
    "Contend-type": "application/json"
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {
  url: string = 'https://localhost:44316/api/Cliente';
  constructor(
    private http: HttpClient
  ) { }

  getClientes() : Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  add(cliente: Cliente): Observable<Response>{
    return this.http.post<Response>(this.url, cliente, HttpOption);
  }

  edit(cliente: Cliente): Observable<Response>{
    return this.http.put<Response>(this.url, cliente, HttpOption);
  }

  delete(id: number): Observable<Response>{
    return this.http.delete<Response>(`${this.url}/${id}`);
  }
}


