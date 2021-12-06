import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  dataList = Array<{
    id: number, 
    word: string,
    definition: string
  }>();

  dataHistoryList = Array<{
    id: number, 
    word: string,
    definition: string
  }>();

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.setData();
    this.setDataHistory();
  }

  setData() {
    this.dataList = [];
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

  setDataHistory() {
    this.dataHistoryList = [];
    for (var i = 0, len = localStorage.length; i < len; i++) {
      console.log(localStorage.key(i));
      if(localStorage.getItem(localStorage.key(i)) == '2') {
        for(var j = 0; j < this.dataList.length; j++) {
          if('h-'+this.dataList[j].id.toString() == localStorage.key(i)) {
            this.dataHistoryList.push(this.dataList[j]);
            j = this.dataList.length;
          }
        }
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

  removeHistory(id: number) {
    localStorage.removeItem('h-'+id.toString());

    this.setDataHistory();
  }

  clearHistory() {
    var tempDataBoomark = [];
    // add only History(1) into tempDataHistory
    for (var i = 0, len = localStorage.length; i < len; i++) {
      if(localStorage.getItem(localStorage.key(i)) == '2') {
        tempDataBoomark.push(localStorage.key(i));
      }
    }

    // remove localstorage one by one from tempDataHistory
    for(var i = 0; i < tempDataBoomark.length; i++) {
      localStorage.removeItem(tempDataBoomark[i]);
    }

    this.setDataHistory();
  }

}
