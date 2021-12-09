import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";



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
  offset: number = 0;
  maxLoad: number = 100;

  constructor(public navCtrl: NavController, private httpClient: HttpClient) { 
    
    // let url = "https://raw.githubusercontent.com/pangphannarupp/chounnath_dictionary/main/assets/assets/json/db.json";

    // this.http.get(url).subscribe(data => {
    //   console.log(data);
    // });
  }

  ngOnInit() {
    this.setData();
  }

  setData() {
    // for(var i = 0; i < 100; i++) {
    //   this.dataList.push(
    //     {
    //       'id': (i + 1),
    //       'word': 'Word' + (i + 1),
    //       'definition': 'definition' + (i + 1),
    //     }
    //   );
    // }

    this.httpClient.get("assets/db.json").subscribe(data =>{
      
      
      for(var i = this.offset; i < Object.keys(data).length && i < this.maxLoad; i++) {
        // console.log(data[i]['word']);
        this.dataList.push(
          {
            'id': data[i]['id'],
            'word': data[i]['word'],
            'definition': data[i]['definition'],
          }
        );
      }

      // if(i == Object.keys(data).length - 1) {
        this.setSearchData('');
        this.offset = this.maxLoad;
        this.maxLoad = 2*this.maxLoad;
      // }
    });
  }

  setSearchData(text: string) {
    this.dataSearchList = [];
    for(var i = 0; i < this.dataList.length; i++) {
      if(this.dataList[i].word.toLowerCase().indexOf(text.toLowerCase()) != -1) {
        this.dataSearchList.push(
          {
            'id': this.dataList[i].id,
            'word': this.dataList[i].word,
            'definition': this.dataList[i].definition,
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
