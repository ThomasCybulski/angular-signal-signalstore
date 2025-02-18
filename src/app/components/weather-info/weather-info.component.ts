import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-weather-info',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    styleUrl: './weather-info.component.scss',
    templateUrl: './weather-info.component.html',
})
export class WeatherInfoComponent {
    weatherData: any = null;

    constructor(private readonly weatherService: WeatherService) {}

    loadWeatherData() {
        this.weatherService.weatherData$.subscribe((data) => {
            this.weatherData = data;
            console.log('Weather data loaded: ', this.weatherData);
        });
    }
}
