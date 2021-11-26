import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements OnInit {
  @Input() public icon;
  @Input() public queryName: string;
  @Output() valueChange = new EventEmitter();
  firstLetter: string;
  constructor() {}

  ngOnInit() {
    this.firstLetter = this.queryName.split('')[0];
    console.log(this.firstLetter);
  }

  selectCategorie() {
    this.valueChange.emit(this.queryName);
  }
}
