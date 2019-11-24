import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();

  public inputValue: string;

  constructor() { }

  ngOnInit() {
  }

  search() {
    this.searchEvent.emit(this.inputValue);
  }

}
