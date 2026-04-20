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
  // Ville saisie par l’utilisateur (liée au champ input via ngModel)
  city: string = '';

  // Date du jour formatée en français (utilisée dans l’affichage)
  today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  weatherData: any;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private weatherService: Weather,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  closeError() {
    this.errorMessage = '';
  }

  // Méthode appelée pour récupérer les données météo d’une ville
  getWeather(city: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.weatherData = null;

    // Appel au service météo (Observable)
    this.weatherService.getWeather(city).subscribe({
      // Cas de succès : données reçues
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
        // Forcer la mise à jour de la vue (utile si Angular ne détecte pas le changement)
        this.cdr.detectChanges();
      },

      // Cas d’erreur : problème API ou réseau
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des données';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
