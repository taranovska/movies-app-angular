import { GenresComponent } from './pages/genres/genres.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MoviesComponent,
  },

  {
    path: 'movies/genres/:genresId',
    component: MoviesComponent,
  },

  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'genres',
    component: GenresComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
