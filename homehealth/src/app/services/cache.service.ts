import { Injectable } from '@angular/core';
import { MedicamentSchema } from '../models/medicamentSchema';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  medoc: MedicamentSchema;

  constructor() {}

  setMedoc(data) {
    this.medoc = data;
  }

  getMedoc() {
    if (this.medoc === null) {
      return null;
    } else {
      return this.medoc;
    }
  }
}
