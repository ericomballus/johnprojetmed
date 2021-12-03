import { Component, Input, OnInit } from '@angular/core';
import { MedicamentSchema } from 'src/app/models/medicamentSchema';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() public medicament: MedicamentSchema;

  constructor() {}

  ngOnInit() {}
}
