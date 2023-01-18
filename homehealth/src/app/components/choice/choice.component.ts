import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements OnInit {
  @Input() public icon;
  @Input() public name: string;
  @Output() valueChange = new EventEmitter();
  firstLetter: string;
  couleur: string;
  queryName: string;
  constructor(private translate: TranslateService) {
    console.log(this.translate.getDefaultLang());
  }

  ngOnInit() {
    this.queryName = this.name;

    this.firstLetter = this.queryName.split('')[0];

    this.translate.onLangChange.subscribe((lang) => {
      console.log(lang);
      console.log(lang.translations['MENU'][this.name]);
      this.queryName = lang.translations['MENU'][this.name];
    });
    if (this.firstLetter === 'h') {
      this.couleur = 'var(--ion-color-primary)';
    }
    if (this.firstLetter === 'p') {
      this.couleur = 'var(--ion-color-success)';
    }
    if (this.firstLetter === 'l') {
      this.couleur = 'var(--ion-color-warning)';
    }
    if (this.firstLetter === 'c') {
      this.couleur = 'var(--ion-color-danger)';
    }
    if (this.firstLetter === 'm') {
      this.couleur = 'var(--ion-color-tertiary)';
    }
  }

  selectCategorie() {
    this.valueChange.emit(this.queryName);
  }
}
