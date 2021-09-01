import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Image} from '../models/image';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {

  private REST_API_SERVER = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  // http Get

  public getCategories() {
    
    const url = `${this.REST_API_SERVER}/api/categories`;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getCateById(cateId : number){
    const url = `${this.REST_API_SERVER}/api/categories/`+cateId;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
  

  public getAllImages() {
    const url = `${this.REST_API_SERVER}/api/images`;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getImageById(imageId: number) {
    const url = `${this.REST_API_SERVER}/api/images/id/`+imageId;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getImageInCate(cateId: number) {
    const url = `${this.REST_API_SERVER}/api/images/category/`+cateId;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // get image by User

  public GetAllImageByUser(userId: any) {
    const url = `${this.REST_API_SERVER}/api/images/`+userId;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public GetImageByIdForUser(userId: string, imageId : number) {
    const url = `${this.REST_API_SERVER}/api/images/`+userId+'/'+imageId;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // approval

  public getImageHasApproval() {
    const url = `${this.REST_API_SERVER}/api/images/hasapproval`;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getImageNotApproval() {
    const url = `${this.REST_API_SERVER}/api/images/notapproval`;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }


  // http Post

  public addImage(userId : string, data : Image) {
    const url = `${this.REST_API_SERVER}/api/images/`+userId;
    return this.http
      .post<any>(url, data, httpOptions)
      .pipe(catchError(this.handleError));  
  }

  //http Put
  public isLikeImage(imageId : number, data : any) {
    const url = `${this.REST_API_SERVER}/api/images/id/`+imageId;
    return this.http
      .put<any>(url, data, httpOptions)
      .pipe(catchError(this.handleError));  
  }

  public updateImageByUser(userId : string, imageId : number, data : Image) {
    const url = `${this.REST_API_SERVER}/api/images/`+userId+'/'+imageId;
    return this.http
      .put<any>(url, data, httpOptions)
      .pipe(catchError(this.handleError));  
  }

  public approvalImageByAdmin(imageId : number, data : any) {
    const url = `${this.REST_API_SERVER}/api/images/adminok/`+imageId;
    return this.http
      .put<any>(url, data, httpOptions)
      .pipe(catchError(this.handleError));  
  }

  public denyByAdminImage(imageId : number, data : any) {
    const url = `${this.REST_API_SERVER}/api/images/admindeny/`+imageId;
    return this.http
      .put<any>(url, data, httpOptions)
      .pipe(catchError(this.handleError));  
  }

  //http Delete

  public deleteImage(userId : string, imageId : number) {
    const url = `${this.REST_API_SERVER}/api/images/`+userId+'/'+imageId;
    return this.http
      .delete<any>(url)
      .pipe(catchError(this.handleError));  
  }





  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}
