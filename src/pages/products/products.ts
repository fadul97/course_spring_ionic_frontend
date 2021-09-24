import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/products.service';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    let categorie_id = this.navParams.get('categorie_id');
    this.productService.findByCategorie(categorie_id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {
        console.log(error);
      });
  }

}
