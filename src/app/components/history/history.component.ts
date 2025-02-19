import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WeatherService } from '../../services/weather.service';
import { WeatherStore } from '../../services/weather.store';

@Component({
    selector: 'app-history',
    imports: [CommonModule, MatCardModule, MatButtonModule],
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
    readonly store = inject(WeatherStore);
}
