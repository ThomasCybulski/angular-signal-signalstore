import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService } from '../../services/weather.service';
import { HistoryService } from '../../services/history.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-weather-search',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './weather-search.component.html',
    styleUrls: ['./weather-search.component.scss'],
})
export class WeatherSearchComponent implements OnInit {
    weatherForm: FormGroup;
    weatherData: any = null;
    errorMessage: string | null = null;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private weatherService: WeatherService,
        private historyService: HistoryService
    ) {
        this.weatherForm = this.fb.group({
            city: [''],
        });
    }

    ngOnInit() {
        this.weatherService.weatherData$.subscribe((data) => {
            this.weatherData = data;
        });
    }

    getWeather() {
        this.loading = true;
        const city = this.weatherForm.get('city')?.value.trim();
        if (!city) {
            this.errorMessage = 'City name cannot be empty';
            return;
        }

        this.weatherService
            .getWeather(city)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.errorMessage = null;
                        this.weatherService.setWeatherData(data);
                        this.historyService.addCity(city);
                    } else {
                        this.errorMessage = 'City not found';
                    }
                },
                error: () => {
                    this.errorMessage =
                        'Could not fetch weather data. Please try again.';
                },
            });
    }
}
