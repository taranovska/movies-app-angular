import { IMAGES_SIZES } from './../../constants/images-sizes';
import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() itemData: Movie | null = null;
  imagesSizes = IMAGES_SIZES;
}
