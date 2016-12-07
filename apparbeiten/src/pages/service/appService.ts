import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class AppService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  
    getVorhaben() {
        var res = this.http.get("http://apparbeiten.eu-gb.mybluemix.net/api/getVorhaben").map(res => res.json());
        console.info('response', res);
        return res;
    } 

    getUsers() {
        var res = this.http.get("http://apparbeiten.eu-gb.mybluemix.net/api/getUsers").map(res => res.json());
        console.info('response', res);
        return res;
    } 
}