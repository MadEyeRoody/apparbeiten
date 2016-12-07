/**
 * Created by roody on 07.12.16.
 */
import { Component } from '@angular/core';
import {AppService} from "../../pages/service/appService";
import {ViewController} from "ionic-angular/index";

@Component({
  templateUrl: 'pickPersons.html',
  providers: [AppService]
})
export class PickPersonsPage {
 persons: Array<any>;
  selectedPersons:Array<any>;

  constructor(private appService: AppService,  public viewCtrl: ViewController)
  {
    this.loadPersons();
    this.selectedPersons=[];
  }

  loadPersons() {
    this.appService.getUsers().subscribe(
      data => {
        this.persons = data;
        console.log("data:", data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Complete')
    );
  }

  addOrRemovePerson(person){

    var index = this.selectedPersons.indexOf(person);
    if(index > -1) {
      this.selectedPersons.splice(index, 1);
      person.selected = false;
      console.log("removed");
    } else {
      person.taskStatus = "Responsible";
      this.selectedPersons.push(person);
      person.selected = true;
      console.log("added");
    }
  }

  closePersonPicker(){
    this.viewCtrl.dismiss(this.selectedPersons);
  }
}
