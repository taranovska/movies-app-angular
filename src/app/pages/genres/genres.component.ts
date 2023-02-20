import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/movie';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.moviesService.getMovieGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  }
}
