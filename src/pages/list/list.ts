import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { ApiProvider } from '../../providers/api/api';
import { CreatePage } from '../create/create';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  players: Array<{ name: string, number: number }>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public api: ApiProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    this.api.doGet('/Players/GetAll', {})
      .subscribe(
      players => this.players = players
      )

      this.events.subscribe('create:player', (player)=> {
        this.players.push(player);
      })
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  goTocreatePlayer() {
    this.navCtrl.push(CreatePage);
  }
}
