import { Component } from '@angular/core';
import { HistoryComponent } from './components/history/history.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        FormsModule,
        HistoryComponent,
        MatGridListModule,
        WeatherSearchComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
