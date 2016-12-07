/**
 * Created by roody on 07.12.16.
 */
import {Platform, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AppService } from '../../pages/service/appService';

@Component({
  templateUrl: 'createVorhaben.html',
  providers: [AppService]
})

export class CreateVorhabenPage {
  users;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
     private appService: AppService
  ) {
    
    this.refresh();
  }

    refresh() {
        this.appService.getUsers().subscribe(
                data => {
                    this.users = data; 
                    console.log("data:", data);

                },
                err => {
                    console.log(err);
                },
                () => console.log('Complete')

            );
   }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
/**
 * Created by roody on 07.12.16.
 */
