import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { of } from "rxjs";

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

   
    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: Http) { }

    postfitnessdata(data){
        try{
            return this.http
                .post(UserService.BaseUrl+'allfriends',data,httpOptions)
                .pipe(map((response: Response) => response.json()));
            }catch(excpetion) {
                return of([]);
            }
    }

     getfitnessdata() {
        try{
             return this.http
                .get(UserService.BaseUrl+'allfriends',httpOptions)
                .pipe(map((response: Response) => response.json()));
            } catch(excpetion) {
            return of([]);
        }
    }

    getfitnessdatabyid(id) {
        try{
            return this.http
            .get(UserService.BaseUrl + "allfriends" + `/${id}`, httpOptions)
            .pipe(map((response: Response) => response.json()));
        }catch(excpetion) {
            return of([]);
        }
        
    }

    editfitnessdata(id, data) {
        try{
            return this.http
            .put(UserService.BaseUrl + "allfriends" + `/${id}`, data, httpOptions)
            .pipe(map((response: Response) => response.json()));
        }catch(excpetion) {
            return of([]);
        }
        
    }

    deletefitnessdata(id) {
         try{
            return this.http
            .delete(UserService.BaseUrl + "allfriends" + `/${id}`, httpOptions)
            .pipe(map((response: Response) => response.json()));
         } catch(excpetion) {
            return of([]);
        }
    }

    postcontactdata(data){
        try{
            return this.http
                .post(UserService.BaseUrl+'contacts',data,httpOptions)
                .pipe(map((response: Response) => response.json()));
            }catch(excpetion) {
                return of([]);
            }
    }
}