import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherStore } from '../../services/weather.store';

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
export class WeatherSearchComponent {
    weatherForm: FormGroup;
    weatherData: any = null;
    errorMessage: string | null = null;
    loading = false;

    readonly historyStore = inject(WeatherStore);

    constructor(private readonly fb: FormBuilder) {
        this.weatherForm = this.fb.group({
            city: [''],
        });
    }

    getWeather() {
        this.loading = true;
        const city = this.weatherForm.get('city')?.value.trim();
        if (!city) {
            this.errorMessage = 'City name cannot be empty';
            return;
        }

        this.historyStore.get(city);
    }
}
