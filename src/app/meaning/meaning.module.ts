import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeaningPageRoutingModule } from './meaning-routing.module';

import { MeaningPage } from './meaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeaningPageRoutingModule
  ],
  declarations: [MeaningPage]
})
export class MeaningPageModule {}
