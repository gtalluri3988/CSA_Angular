import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIResponseModel } from '../../Model/apiresponse.model';
import { AppSettings } from '../../app.config';
import { CommunityResponse } from '../../Model/community.model';

@Injectable({
  providedIn: 'root' 
})
export class BaseService {
  data: any[] = [];
  communityTypeDropDown: any[] = []; 
  stateDropDown: any[] = []; 
  chargeTypeDropDown: any[] = []; 
  statusDropDown: any[] = []; 
  http=inject(HttpClient);
  router=inject(Router);
  apiUrl =AppSettings.apiUrl; // Your backend API


getCommunityTypeList(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/Community/GetCommunityTypes`);
  }
getStateList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Community/GetCommunityTypes`);
}

getDropDownTypeList(Type:string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/SelectList/GetSelectList?inputType=`+Type);
}

}