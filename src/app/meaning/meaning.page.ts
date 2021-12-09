import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meaning',
  templateUrl: './meaning.page.html',
  styleUrls: ['./meaning.page.scss'],
})
export class MeaningPage implements OnInit {

  id: number;
  word: string;
  definition: string;
  fontSizeWord: number = 1;
  enableBookmark: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.setData();

    this.checkEnableBookmark(this.id);
  }

  setData() {
    this.id = history.state['id'];
    this.word = history.state['word'];
    this.definition = history.state['definition']
                      .replace(/1|2|3|4|5|6|7|8|9|0|<|>|"/g, '');

    this.setHistory(this.id);
  }

  decreaseFontSize() {
    this.fontSizeWord = this.fontSizeWord > 1 ? this.fontSizeWord - 0.2 : this.fontSizeWord;
  }

  increaseFontSize(size: number) {
    this.fontSizeWord = this.fontSizeWord < 1.5 ? this.fontSizeWord + 0.2 : this.fontSizeWord;
  }

  setHistory(id: number) {
    localStorage.setItem('h-'+id.toString(), '2');
  }

  setBookmark(id: number) {
    if(localStorage.getItem('b-'+id.toString()) == '1') {
      localStorage.removeItem('b-'+id.toString());
    } else {
      localStorage.setItem('b-'+id.toString(), '1');
    }
  
    this.checkEnableBookmark(id);
  }

  checkEnableBookmark(id: number) {
    if(localStorage.getItem('b-'+id.toString()) == '1') {
      this.enableBookmark = true;
    } else {
      this.enableBookmark = false;
    }
    
    // for (var i = 0, len = localStorage.length; i < len; i++) {
    //   if(localStorage.getItem(localStorage.key(i)) == '1') {
    //     console.log(localStorage.key(i));
    //   }
    // }
  }

}
