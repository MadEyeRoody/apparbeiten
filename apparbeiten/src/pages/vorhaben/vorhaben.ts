import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController } from 'ionic-angular';
import { AppService } from '../service/appService';

@Component({
  selector: 'page-about',
  templateUrl: 'vorhaben.html',
  providers: [AppService]
})
export class AboutPage {

  tasks: Array<any>;
 

  constructor(public navCtrl: NavController, private appService: AppService) {

    this.appService.getVorhaben().subscribe(
                data => {
                    this.tasks = data; 
                    console.log("data:", data);
                },
                err => {
                    console.log(err);
                },
                () => console.log('Complete')
            );

//    this.tasks = this.appService.getVorhaben();

  }

}
