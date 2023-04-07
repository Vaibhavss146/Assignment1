import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean = true;
 baseUrl = "http://localhost:3000/"; 

  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getData,
    this.postData
   }

  getData(endpoint:string){
    let url = this.baseUrl + endpoint
   return this.http.get(url)
  }
  postData(endpoint:string,requestbody:any){
let url = this.baseUrl + endpoint;
return this.http.post<any>(url,requestbody)

  }
  editData(endpoint: string, requestBody: any) {
    let url = this.baseUrl + endpoint;
    return this.http.put(url, requestBody)
  }
  deleteData(endpoint:string){
    let url = this.baseUrl + endpoint; 
   return this.http.delete(url);
  }
  login(email:string,password:string){
    console.log(email);
    console.log(password);
    localStorage.setItem('isUserLoggedIn',this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val=>{
        console.log("Is User Authentication is successful: " + val)
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
       localStorage.removeItem('isUserLoggedIn'); 
    }
 

}
