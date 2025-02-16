import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { WeatherService } from "../../services/weather.service";
import { HistoryService } from "../../services/history.service";

@Component({
  selector: "app-weather",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"],
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  weatherData: any = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private historyService: HistoryService
  ) {
    this.weatherForm = this.fb.group({
      city: [""],
    });
  }

  ngOnInit() {
    this.weatherService.weatherData$.subscribe((data) => {
      this.weatherData = data;
    });
  }

  getWeather() {
    const city = this.weatherForm.get("city")?.value.trim();
    if (!city) {
      this.errorMessage = "City name cannot be empty";
      return;
    }

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.errorMessage = null;
        this.weatherService.setWeatherData(data);
        this.historyService.addCity(city);
      },
      error: () => {
        this.errorMessage = "Could not fetch weather data. Please try again.";
      },
    });
  }
}
