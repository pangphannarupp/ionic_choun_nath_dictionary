import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {

  dataList = Array<{
    id: number, 
    word: string,
    definition: string
  }>();

  dataBookmarkList = Array<{
    id: number, 
    word: string,
    definition: string
  }>();

  constructor(public navCtrl: NavController) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.setData();
    this.setDataBookmark();
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

  setDataBookmark() {
    this.dataBookmarkList = [];
    // for(var i = 0; i < this.dataList.length; i++) {
    //   if(localStorage.getItem(this.dataList[i].id.toString()) == '1') {
    //     this.dataBookmarkList.push(this.dataList[i]);
    //   }
    // }

    for (var i = 0, len = localStorage.length; i < len; i++) {
      console.log(localStorage.key(i));
      if(localStorage.getItem(localStorage.key(i)) == '1') {
        for(var j = 0; j < this.dataList.length; j++) {
          if('b-'+this.dataList[j].id.toString() == localStorage.key(i)) {
            this.dataBookmarkList.push(this.dataList[j]);
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

  removeBookmark(id: number) {
    localStorage.removeItem('b-'+id.toString());

    this.setDataBookmark();
  }

  clearBookmark() {
    var tempDataBoomark = [];
    // add only bookmark(1) into tempDataBookmark
    for (var i = 0, len = localStorage.length; i < len; i++) {
      if(localStorage.getItem(localStorage.key(i)) == '1') {
        tempDataBoomark.push(localStorage.key(i));
      }
    }

    // remove localstorage one by one from tempDataBookmark
    for(var i = 0; i < tempDataBoomark.length; i++) {
      localStorage.removeItem(tempDataBoomark[i]);
    }

    this.setDataBookmark();
  }
}
