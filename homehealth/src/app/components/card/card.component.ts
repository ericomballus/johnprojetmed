import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public company: any;
  constructor() {}

  ngOnInit() {}
}
