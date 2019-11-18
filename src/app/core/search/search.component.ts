import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(value: string) {
    this.searchEvent.emit(value);
  }

}
