import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { take } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genresId: string | null = null;
  searchValue: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genresId }) => {
      if (genresId) {
        this.genresId = genresId;
        this.getMoviesByGenre(genresId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getMoviesByGenre(genresId: string, page: number) {
    this.moviesService
      .getMoviesByGenre(genresId, page)
      .subscribe((moviesData) => {
        this.movies = moviesData;
      });
  }

  getPagedMovies(page: number, searchValue?: string) {
    this.moviesService.searchMovies(page, searchValue).subscribe((data) => {
      this.movies = data;
    });
  }

  paginate(event: any) {
    if (this.genresId) {
      this.getMoviesByGenre(this.genresId, event.page + 1);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(event.page + 1, this.searchValue);
      } else {
        this.getPagedMovies(event.page + 1);
      }
    }
  }

  searchMovies() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
