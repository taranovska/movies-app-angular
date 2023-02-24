import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GenresDto,
  Movie,
  MovieCredits,
  MovieDto,
  MovieImage,
  MovieVideoDto,
} from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 10) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => of(res.results.slice(0, count))));
  }

  getMovie(id: number) {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  getMovieVideos(id: number) {
    return this.http
      .get<MovieVideoDto>(
        `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }

  getMovieGenres() {
    return this.http
      .get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => of(res.genres)));
  }

  getMoviePhotos(id: number) {
    return this.http.get<MovieImage>(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`
    );
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getMoviesByGenre(genreId: string, page: number = 1) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&page=${page}&with_genres=${genreId}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }
}
