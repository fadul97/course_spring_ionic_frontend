import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { ClientDTO } from '../../models/cliente.dto';
import { PedidoDTO } from '../../models/pedido-dto';
import { CartService } from '../../services/domain/cart.service';
import { ClientService } from '../../services/domain/client.service';
import { PedidoService } from '../../services/domain/pedido.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public cartService: CartService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService.findById(this.pedido.client.id)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.pedido.deliveryAddress.id, response['addressList']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddress(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codpedido= this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  home() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
