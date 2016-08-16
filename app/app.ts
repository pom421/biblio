import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MesLivresPage} from './pages/mes-livres/mes-livres';
import {AjouterLivrePage} from './pages/ajouter-livre/ajouter-livre';
import {SupprimerLivresPage} from './pages/supprimer-livres/supprimer-livres';
import {BookPersistance} from './services/BookPersistance';
import {BookService} from './services/BookService';

@Component({
  templateUrl: 'build/app.html',
  providers: [BookPersistance, BookService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = MesLivresPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private bookPersistance: BookPersistance
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Mes Livres', component: MesLivresPage },
      { title: 'Ajouter un livre', component: AjouterLivrePage },
      { title: 'Supprimer mes livres', component: SupprimerLivresPage }
    ];
    console.log('dans MyApp : bookPersistance : ', bookPersistance);
    console.log('dans MyApp : menuController : ', menu);
    window['BookPersistance'] = BookPersistance;

  }

  // n'est pas appelé. Bug Ionic 2 ??'
 ionViewLoaded() {
    console.log('dans le ionViewLoaded')
    this.platform.ready().then(() => {
      this.bookPersistance.initDB();
    });
    console.log('dans MyApp:  ionViewLoaded: ', this.bookPersistance);
  }

  initializeApp() {
    console.log('dans le initializeApp')
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
