import { Component } from '@angular//core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClientDTO } from '../../models/cliente.dto';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clientService.findByEmail(localUser.email)
      .subscribe(response => {
          this.client = response as ClientDTO;
          this.getImageIfExists();
        },
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
      } else{
        this.navCtrl.setRoot('HomePage');
      }
  }

  getImageIfExists(){
    this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
      },
      error => {});
  }

  
  getCameraPicture() {

    console.log("Simulating... Taking picture...");
    // I don't have a camera to test it

    /*
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
    */
  }

}
