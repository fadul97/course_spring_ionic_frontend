import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/product.dto";


@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {
  }

  findById(product_id : string) {
    return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
  }

  findByCategorie(categorie_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${categorie_id}`);
  }

  getSmallImageFromBucket(id: string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }

  getImageFromBucket(id: string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }
}