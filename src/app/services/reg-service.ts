import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegService {

    

    private baseUrl = 'http://localhost:2010/DAINING/v1/UserInformation/userReg';
    
      constructor(private http: HttpClient) { }
    
      async registration(data: any): Promise<any> {
        try {
          const response = await firstValueFrom(
            this.http.post<any>(this.baseUrl, data)
    
          );
          return response;
    
        } catch (error) {
          if (error instanceof HttpErrorResponse) {
            console.error('HTTP Error:', error.status, error.message);
          } else {
            console.error('Unexpected Error:', error);
          }
          throw error;
        }
      }
}

