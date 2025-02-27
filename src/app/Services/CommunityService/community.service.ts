import { inject, Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { CommunityResponse } from '../../Model/community.model';
import { BaseService } from '@services/BaseService/base.service';
import { CommunityModel } from '@model/community-detail.model';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { ApiErrorResponse } from '@model/error-response.model';


@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  baseService=inject(BaseService)
  constructor(private http: HttpClient, private router: Router,private errorHandler: GlobalErrorHandlerService) {}
  private apiUrl =AppSettings.apiUrl; // Your backend API


 //Get all communities
   getCommunityList(): Observable<any> {
    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Community/GetCommunityList`);
  }
  

    //Save community
    saveCommunity(communityModel: CommunityModel): Observable<any> {
      return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Community/SaveCommunity`, communityModel).pipe(
        catchError((error: ApiErrorResponse) => {
          return throwError(() => error);
        })
      );
    }
    
  
}
