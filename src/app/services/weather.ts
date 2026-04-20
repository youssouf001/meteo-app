import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  // Clé API OpenWeatherMap (authentification pour accéder aux données météo)
  private apiKey = 'fa576f44ed361ec4ff2d8b5f17bc08f0';
  private url = 'https://api.openweathermap.org/data/2.5/weather';

  // Injection du HttpClient pour effectuer les requêtes HTTP
  constructor(private http: HttpClient) {}

  // Méthode permettant de récupérer les données météo pour une ville donnée
  getWeather(city: string) {
    return this.http.get(`${this.url}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`);
  }
}
