import { Component, OnInit } from '@angular/core';
import { Weather } from './services/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  weatherData: any;
  errorMessage: string = '';

  constructor(private weather: Weather) {}

  ngOnInit() {
    console.log('App component loaded');
    this.weather.getWeather('Dakar').subscribe({
      next: (data) => {
        console.log('Weather data received:', data);
        this.weatherData = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        this.errorMessage = 'Erreur lors de la récupération des données météo.';
      },
    });
  }
}
