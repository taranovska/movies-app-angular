import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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

  getMoviePhotos(id: number) {
    return this.http.get<MovieImage>(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`
    );
  }

  searchMovies(page: number, query: string = '') {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }
}
