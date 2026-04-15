import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Weather } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  city: string = '';
  today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', // jour de la semaine
    year: 'numeric', // année
    month: 'long', // mois
    day: 'numeric', // jour du mois
  });
  weatherData: any;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private weatherService: Weather,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  getWeather(city: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.weatherData = null;

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des données';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
