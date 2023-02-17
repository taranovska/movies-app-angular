import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apikey = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apikey}`
    );
  }
}
