import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearcherPage } from './searcher';

@NgModule({
  declarations: [
    SearcherPage,
  ],
  imports: [
    IonicPageModule.forChild(SearcherPage),
  ],
  exports: [
    SearcherPage
  ]
})
export class SearcherPageModule {}
