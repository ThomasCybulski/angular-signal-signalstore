import { Component } from '@angular/core'
import { WeatherComponent } from './components/weather/weather.component'
import { HistoryComponent } from './components/history/history.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        FormsModule,
        WeatherComponent,
        HistoryComponent,
        MatGridListModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
