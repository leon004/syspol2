import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private platesSource = new BehaviorSubject<string>('');
  currentPlates = this.platesSource.asObservable();

  constructor() { }

  updatePlates(plates: string) {
    this.platesSource.next(plates);
  }
}
