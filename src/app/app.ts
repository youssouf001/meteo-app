import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Weather } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  city: string = '';
  timezone: number | null = null;
  intervalId: any;
  time: string = '';
  weatherData: any;
  errorMessage: string = '';
  emptyMessage: string = '';
  isLoading: boolean = false;

  // Date du jour formatée en français (utilisée dans l’affichage)
  today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  constructor(
    private weatherService: Weather,
    private cdr: ChangeDetectorRef,
  ) {}

  // Calcule et met à jour l'heure locale (ville ou appareil) puis force la détection des changements Angular
  updateTime() {
    const now = new Date();

    // Heure locale de l'utilisateur si champ vide
    if (this.timezone === null) {
      this.time = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      // Heure de la ville saisie
    } else {
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityTime = new Date(utc + this.timezone * 1000);
      this.time = cityTime.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }

    // Force la mise à jour de la vue (nécessaire car setInterval s'exécute hors du contexte Angular)
    this.cdr.detectChanges();
  }

  /** Initialisation : affiche l'heure immédiatement, puis la rafraîchit chaque seconde via setInterval */
  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  /** Destruction : stoppe l'intervalle pour éviter les fuites mémoire quand le composant est détruit */
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getWeather() {
    const cityName = this.city.trim();

    // Si champ vide -> affiche avertissement
    if (!cityName) {
      this.emptyMessage = "Veuillez entrez le nom d'une ville !";
      // Efface le message après 3 secondes
      setTimeout(() => {
        this.emptyMessage = '';
        this.cdr.detectChanges();
      }, 3000);
      return;
    }

    // Réinitialisation des états avant l'envoi de la requête
    ((this.emptyMessage = ''), (this.isLoading = true));
    this.errorMessage = '';
    this.weatherData = null;

    // Appel au service météo
    this.weatherService.getWeather(cityName).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.timezone = data.timezone; // Récupère le décalage UTC de la ville pour recalculer l'heure locale
        this.isLoading = false;
      },
      error: () => {
        this.emptyMessage;
        this.errorMessage = 'Ville introuvable. Vérifiez le nom et réessayez.';
        // Efface le message après 3 secondes
        setTimeout(() => {
          this.errorMessage = '';
          this.cdr.detectChanges();
        }, 3000);
        this.isLoading = false;
      },
    });
  }
}
