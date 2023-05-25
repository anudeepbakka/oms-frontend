import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  add(data:any){
    return this.http.post(this.url+"/product/add",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  update(data:any){
    return this.http.patch(this.url+"/product/update",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getProducts(){
    return this.http.get(this.url+"/product/get")
  }

  getById(id:any){
    return this.http.get(this.url+"/product/getById/"+id)
  }

  getByCtegory(id:any){
    return this.http.get(this.url+"/product/getByCategory/"+id)
  }

  updatedStatus(data:any){
    return this.http.patch(this.url+"/product/updateStatus",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  delete(id:any){
    return this.http.delete(this.url+"/product/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  
}
