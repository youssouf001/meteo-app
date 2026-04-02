import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private apiKey = 'fa576f44ed361ec4ff2d8b5f17bc08f0';
  private url = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(`${this.url}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`);
  }
}
