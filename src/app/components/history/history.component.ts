import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HistoryService } from '../../services/history.service';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-history',
    imports: [CommonModule, MatCardModule, MatButtonModule],
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
    constructor(
        private historyService: HistoryService,
        private weatherService: WeatherService
    ) {}

    get history(): string[] {
        return this.historyService.getHistory();
    }

    clearHistory() {
        this.historyService.clearHistory();
    }

    selectCity(city: string) {
        this.weatherService.getWeather(city).subscribe({
            next: (data) => {
                console.log(`Weather data for ${city}:`, data);
                this.weatherService.setWeatherData(data);
            },
            error: (err) => {
                console.error(`Failed to fetch weather for ${city}`, err);
            },
        });
    }
}
