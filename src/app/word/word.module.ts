import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordPageRoutingModule } from './word-routing.module';

import { WordPage } from './word.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordPageRoutingModule,
    HttpClientModule
  ],
  declarations: [WordPage]
})
export class WordPageModule {}
