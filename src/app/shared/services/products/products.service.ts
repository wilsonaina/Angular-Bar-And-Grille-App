import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>("/assets/json-apis/products.json").pipe(map(res => res.products));
  }
}
