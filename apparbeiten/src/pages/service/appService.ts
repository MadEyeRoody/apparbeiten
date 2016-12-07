import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Injectable} from "@angular/core";

@Injectable()
export class AppService {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }

    updateVorhaben(data) {
        // key ist der name des vorhabens

        var link = 'http://apparbeiten.eu-gb.mybluemix.net/api/updateVorhaben';
        var cont = {'vorhaben': data};//JSON.stringify({'vorhaben': this.data});

        console.log('data to post:', cont);

        this.http.post(link, cont)
        .subscribe(data => {
          console.log(data);
        }, error => {
            console.warn("fehler:" , error);
        });
    }

    getVorhaben() {
        var res = this.http.get("http://apparbeiten.eu-gb.mybluemix.net/api/getVorhaben").map(res => res.json());
        console.info('response', res);
        return res;
    }

    getVorhabenPoll() {
        let url = "http://apparbeiten.eu-gb.mybluemix.net/api/getVorhaben";

        return Observable.interval(2000)
        .switchMap(() => this.http.get(url))
        .map(res => res.json());
    }

    getUsers() {
        var res = this.http.get("http://apparbeiten.eu-gb.mybluemix.net/api/getUsers").map(res => res.json());
        console.info('response', res);
        return res;
    }
}
