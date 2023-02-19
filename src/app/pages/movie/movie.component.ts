import {
  Movie,
  MovieImage,
  MovieVideo,
  MovieCredits,
} from './../../models/movie';
import { MoviesService } from './../../services/movies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie = {} as Movie;
  imagesSizes = IMAGES_SIZES;
  videos: MovieVideo[] = [];
  movieImages: MovieImage | null = null;
  movieCredits: MovieCredits | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMoviePhotos(id);
      this.getMovieCredits(id);
    });
  }

  ngOnDestroy(): void {}

  getMovie(id: number) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
    });
  }

  getMovieVideos(id: number) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideos) => {
      this.videos = movieVideos;
    });
  }

  getMoviePhotos(id: number) {
    this.moviesService.getMoviePhotos(id).subscribe((movieImages) => {
      this.movieImages = movieImages;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCredits) => {
      this.movieCredits = movieCredits;
    });
  }
}
