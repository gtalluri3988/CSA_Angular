import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,throwError  } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIResponseModel } from '../../Model/apiresponse.model';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { CommunityModel } from '@model/community-detail.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =AppSettings.apiUrl; // Your backend API
 
  constructor(private http: HttpClient, private router: Router,private errorHandler: GlobalErrorHandlerService) {}

  login(credentials: { Username: string; password: string }): Observable<any> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}/Auth/Authenticate`, credentials).pipe(
      catchError((error) => {
        
        return throwError(() => new Error(error.message)); // Optional: Re-throw error
      })
    );
  }

  saveCommunity(communityModel: CommunityModel): Observable<any> {
        return this.http.post<APIResponseModel>(`${this.apiUrl}/Community/SaveCommunity`, communityModel).pipe(
          catchError((error) => {
            
            return throwError(() => new Error(error.message)); // Optional: Re-throw error
          })
        );
      }
    
  

  logout() {
    sessionStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  
}