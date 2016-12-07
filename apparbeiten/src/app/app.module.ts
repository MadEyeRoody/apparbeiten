import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/vorhaben/vorhaben';
import { ContactPage } from '../pages/aufgaben/aufgaben';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TaskModalPage } from '../modals/task/task-modal'; //VorhabenDetailsPage
import { VorhabenDetailsPage } from '../pages/vorhaben-details/vorhaben-details';
import { CreateTaskPage } from '../modals/createTask/createTask';
import { CreateVorhabenPage } from '../modals/createVorhaben/createVorhaben';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TaskModalPage,
    CreateTaskPage,
    CreateVorhabenPage,
    VorhabenDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TaskModalPage,
    CreateTaskPage,
    CreateVorhabenPage,
    VorhabenDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
