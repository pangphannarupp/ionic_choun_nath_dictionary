import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-word',
  templateUrl: './word.page.html',
  styleUrls: ['./word.page.scss'],
})
export class WordPage implements OnInit {

  dataList = Array<{
    id: number, 
    word: string,
    definition: string
  }>();
  dataSearchList = Array<{
    id: number, 
    word: string,
    definition: string
  }>();

  constructor(public navCtrl: NavController) { 
  }

  ngOnInit() {
    this.setData();
    this.setSearchData('');
  }

  setData() {
    for(var i = 0; i < 100; i++) {
      this.dataList.push(
        {
          'id': (i + 1),
          'word': 'Word' + (i + 1),
          'definition': 'definition' + (i + 1),
        }
      );
    }
  }

  setSearchData(text: string) {
    this.dataSearchList = [];
    for(var i = 0; i < this.dataList.length; i++) {
      if(this.dataList[i].word.toLowerCase().indexOf(text.toLowerCase()) != -1) {
        this.dataSearchList.push(
          {
            'id': (i + 1),
            'word': 'Word' + (i + 1),
            'definition': 'definition' + (i + 1),
          }
        );
      }
    }
  }

  gotoMeaning(id: number) {
    this.navCtrl.navigateForward('meaning', {
      state: {
        id: this.dataList[id-1].id,
        word: this.dataList[id-1].word,
        definition: this.dataList[id-1].definition,
      }
    });
  }

  onChange(text: string) {
    this.setSearchData(text);
  }

}
