import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Weather } from './weather';

// Permet à TypeScript de reconnaître fail()
declare function fail(reason?: any): void;

describe('Weather (REAL API)', () => {
  let service: Weather;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Weather, provideHttpClient()],
    });
    service = TestBed.inject(Weather);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("doit récupérer les données réelles depuis l'API", (done: DoneFn) => {
    service.getWeather('Dakar').subscribe({
      next: (data: any) => {
        expect(data).toBeTruthy();
        expect(data.main).toBeDefined();
        console.log('DONNÉES RÉELLES:', data);
        done();
      },
      error: (err) => {
        fail('Erreur API: ' + err);
      },
    });
  });
});
