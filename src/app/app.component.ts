import { Component } from "@angular/core";
import { WeatherComponent } from "./components/weather/weather.component";

@Component({
  selector: "app-root",
  imports: [WeatherComponent],
  templateUrl: "./app.component.html",
  standalone: true,
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-signal-signalstore";
}
