import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import jwtDecode from "jwt-decode";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  public search = new BehaviorSubject<string>("");
  public category = new BehaviorSubject<string>("");
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.productList.asObservable();
  }

  //private url = "http://13.39.18.106:8080";
  private url = 'http://localhost:8080';

  public login(data: any): Observable<any> {
    return this.http.post(this.url + "/login", data);
  }

  public register(data: any): Observable<any> {
    return this.http.post(this.url + "/register", data);
  }

  public getUserById(token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}`;

    return this.http.get<any>(newUrl);
  }

  public getUserByRealId(userId: string): Observable<any> {
    const newUrl = this.url + `/users/${userId}`;

    return this.http.get<any>(newUrl);
  }

  public getAllUsers(): Observable<any> {
    const newUrl = this.url + `/users`;
    return this.http.get<any>(newUrl);
  }

  public deleteUserById(userID: string): Observable<any> {
    const newUrl = this.url + `/users/${userID}`;
    return this.http.delete<any>(newUrl);
  }

  public updateUserInfo(data: any, token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}`;
    return this.http.put<any>(newUrl, data);
  }
  public updateUser(data: any, id: string): Observable<any> {
    const newUrl = this.url + `/users/${id}`;
    return this.http.put<any>(newUrl, data);
  }

  public addUser(data: any): Observable<any> {
    return this.http.post("/users/", data);
  }

  public getCategories(): Observable<any> {
    const newUrl = this.url + `/categorias`;
    return this.http.get<any>(newUrl);
  }

  public getMarcas(): Observable<any> {
    const newUrl = this.url + `/marcas`;
    return this.http.get<any>(newUrl);
  }

  public uploadImages(vals: any): Observable<any> {
    let data = vals;
    return this.http.post(
      "https://api.cloudinary.com/v1_1/dlbgyzjna/image/upload/",
      data
    );
  }

  public addProduct(data: any, token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/products/${userId.id}`;
    return this.http.post<any>(newUrl + `/add`, data);
  }

  public getProducts(): Observable<any> {
    const newUrl = this.url + `/products`;
    return this.http.get<any>(newUrl);
  }

  public addFavProduct(prodId: any, token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}/favorites/${prodId}`;
    return this.http.post<any>(newUrl, null);
  }

  public removeFavProduct(prodId: any, token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}/favorites/${prodId}`;
    return this.http.delete<any>(newUrl);
  }

  public addToCart(prodId: any, token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}/cart/${prodId}`;
    return this.http.post<any>(newUrl, null);
  }

  public getProductsFromCart(token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}/cart`;
    return this.http.get<any>(newUrl);
  }

  public getUserProducts(userId: any): Observable<any> {
    const newUrl = this.url + `/products/user/${userId}`;
    return this.http.get<any>(newUrl);
  }

  public buyProductsFromCart(
    prodId: string,
    buyerId: string,
    price: string
  ): Observable<any> {
    const body = {
      productId: prodId,
      buyerId: buyerId,
      soldPrice: price,
    };
    const newUrl = this.url + `/users/${buyerId}/buy`;
    return this.http.post<any>(newUrl, body);
  }

  public getProductById(prodId: any): Observable<any> {
    const newUrl = this.url + `/products/${prodId}`;
    return this.http.get<any>(newUrl);
  }

  public getFavoritesProducts(token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/users/${userId.id}/favorites`;
    return this.http.get<any>(newUrl);
  }
  public getPreferedProducts(token: string): Observable<any> {
    const userId: any = jwtDecode(token);
    const newUrl = this.url + `/products/user/${userId.id}/preferred-products`;
    return this.http.get<any>(newUrl);
  }

  public getUserProductsComprados(userId: any): Observable<any> {
    const newUrl = this.url + `/products/produtos-comprados/${userId}`;
    return this.http.get<any>(newUrl);
  }
  public getUserProductsVendidos(userId: any): Observable<any> {
    const newUrl = this.url + `/products/produtos-vendidos/${userId}`;
    return this.http.get<any>(newUrl);
  }

  public getChatRoomsChat(chatRoom: any) : Observable<any> {
    return this.http.get(this.url + "/chatroom/" + chatRoom);
  }

  public getUserChats(id:any) : Observable<any> {
    return this.http.get(this.url + "/chatrooms/user/" + id);
  }

  public getMarcaById(id: string){
    const newUrl = this.url + `/marcas/${id}`;
    return this.http.get<any>(newUrl);
  }

  public getCategoriaById(id: string){
    const newUrl = this.url + `/categorias/${id}`;
    return this.http.get<any>(newUrl);
  }

  
}
