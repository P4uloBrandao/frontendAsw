import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';



@Injectable({
  providedIn: 'root',
})
export class HttpService{
  constructor(private http: HttpClient) {}

  //private url = 'http://13.39.18.106:8080';
  private url = 'http://localhost:8080';

  public login(data: any) : Observable<any>{
    return this.http.post(this.url+"/login", data)
  }

  public register(data: any) : Observable<any>{
    return this.http.post(this.url+"/register", data)
  }

  public getUserById(token: string): Observable<any> {
    const userId : any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}`;
    
    return this.http.get<any>(newUrl);
  }

  public getAllUsers(): Observable<any> {
    const newUrl = this.url + `/users`;
    return this.http.get<any>(newUrl);
  }
  
  public deleteUserById(userID: string ):  Observable<any>{
    const newUrl = this.url + `/users/${userID}`;
    return this.http.delete<any>(newUrl);
  }

  public updateUserInfo(data: any, token: string): Observable<any> {
    const userId : any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}`;
    return this.http.put<any>(newUrl, data);
  }
  public updateUser(data: any, id: string): Observable<any> {
    const newUrl = this.url + `/users/${id}`;
    return this.http.put<any>(newUrl, data);
  }

  public addUser(data: any): Observable<any> {
    return this.http.post('/users/', data);
  }

  public getCategories(): Observable<any> {
    const newUrl = this.url + `/categorias`;
    return this.http.get<any>(newUrl);
  }

  public getMarcas(): Observable<any> {
    const newUrl = this.url + `/marcas`;
    return this.http.get<any>(newUrl);
  }
  
  public uploadImages(vals:any):Observable<any>{
    let data=vals;
    return this.http.post('https://api.cloudinary.com/v1_1/dlbgyzjna/image/upload',data);
  }

  public addProduct(data: any, token: string): Observable<any> {
    const userId : any = jwtDecode(token);
    const newUrl = this.url + `/products/${userId.id}`;
    return this.http.post<any>(newUrl+`/add`, data);
  }
}
