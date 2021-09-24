import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityDTO } from '../../models/city.dto';
import { StateDTO } from '../../models/state.dto';
import { CityService } from '../../services/domain/city.service';
import { ClientService } from '../../services/domain/client.service';
import { StateService } from '../../services/domain/state.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        clientType : ['1', [Validators.required]],
        cpfOrCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password : ['123', [Validators.required]],
        street : ['Rua Via', [Validators.required]],
        number : ['25', [Validators.required]],
        complement : ['Apto 3', []],
        district : ['Copacabana', []],
        zipCode : ['10828333', [Validators.required]],
        telephone1 : ['977261827', [Validators.required]],
        telephone2 : ['', []],
        telephone3 : ['', []],
        stateId : [null, [Validators.required]],
        cityId : [null, [Validators.required]]
      })
  }

  ionViewDidLoad(){
    this.stateService.findAll().subscribe(response => {
      this.states = response;
      this.formGroup.controls.stateId.setValue(this.states[0].id);
      this.updateCities();
    },
    error => {
      console.log(error);
    })
  }
  updateCities() {
    let state_id = this.formGroup.value.stateId;
    this.cityService.findAll(state_id).subscribe(response => {
      this.cities = response;
      this.formGroup.controls.cityId.setValue(null);
    },
    error => {
      console.log(error);
    })
  }

  signupUser(){
    this.clientService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {
        console.log(error);
      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      message: 'Sign up completed.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });

    alert.present();
  }

}
