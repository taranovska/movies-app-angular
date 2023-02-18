import { IMAGES_SIZES } from './../../constants/images-sizes';
import { Movie } from './../../models/movie';
import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('1s')]),
      transition('* => void', [animate('500ms')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input()
  items: Movie[] = [];

  currentSliderIndex: number = 0;

  readonly imagesSizes = IMAGES_SIZES;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentSliderIndex = ++this.currentSliderIndex % this.items.length;
    }, 5000);
  }
}
