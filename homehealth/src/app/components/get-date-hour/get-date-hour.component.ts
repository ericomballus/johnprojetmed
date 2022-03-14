import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PanierLaboGroup } from 'src/app/models/panier-labo-group';

@Component({
  selector: 'app-get-date-hour',
  templateUrl: './get-date-hour.component.html',
  styleUrls: ['./get-date-hour.component.scss'],
})
export class GetDateHourComponent implements OnInit {
  date: any;
  public heure: any = '';
  public jour: any = 0;
  public mois: any = 0;
  public year: any = 0;
  @ViewChild('datePicker') datePicker;
  @ViewChild('timePicker') timePicker;
  @Input() public companie: PanierLaboGroup;
  @Output() dateChange = new EventEmitter();
  @Output() hourChange = new EventEmitter();
  constructor() {}

  ngOnInit() {
    console.log(this.companie);
  }

  selectCategorie() {
    // this.valueChange.emit(this.date);
  }

  dateChanged(ev) {
    this.jour = new Date(ev.detail.value).getDate();
    this.mois = new Date(ev.detail.value).getMonth();
    this.year = new Date(ev.detail.value).getFullYear();
    this.dateChange.emit({
      jour: `${this.jour}/${this.mois}/${this.year}`,
      companieId: this.companie.analyses[0].company.id,
    });
  }

  timeChanged(ev) {
    this.heure =
      new Date(ev.detail.value).getHours() +
      ':' +
      new Date(ev.detail.value).getMinutes();
    this.hourChange.emit({
      heure: this.heure,
      companieId: this.companie.analyses[0].company.id,
    });
  }
}
