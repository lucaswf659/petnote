import { HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { LocalStorageUtils } from '../utils/localstorage';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
    
    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.apiUrlV1;
    
    protected getHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected extractData(response: any){
        return response.data || {};
    }

    protected serviceError(response: Response | any){
        let customError: string[] = [];

        if(response instanceof HttpErrorResponse){
            
            if(response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}