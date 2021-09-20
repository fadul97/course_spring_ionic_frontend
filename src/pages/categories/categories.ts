import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategorieDTO } from '../../models/categories.dto';
import { CategorieService } from '../../services/domain/categorie.service';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategorieDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categorieService: CategorieService) {
  }

  ionViewDidLoad() {
    this.categorieService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
        console.log(error);
        
      });
  }

}
