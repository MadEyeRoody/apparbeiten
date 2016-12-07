import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../vorhaben/vorhaben';
import { ContactPage } from '../aufgaben/aufgaben';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
