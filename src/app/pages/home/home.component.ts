import { Movie } from './../../models/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getMovies('popular').subscribe((data) => {
      this.popularMovies = data;
    });
    this.movieService.getMovies('upcoming').subscribe((data) => {
      this.upcomingMovies = data;
    });
    this.movieService.getMovies('top_rated').subscribe((data) => {
      this.topRatedMovies = data;
    });
  }
}
