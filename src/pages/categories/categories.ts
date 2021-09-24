import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategorieDTO } from '../../models/categories.dto';
import { CategorieService } from '../../services/domain/categorie.service';


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

  showProducts(categorie_id: string){
    this.navCtrl.push('ProductsPage', {categorie_id: categorie_id});
  }

}
