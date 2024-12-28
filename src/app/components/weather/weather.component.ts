import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "app-weather",
  standalone: true,
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
export class WeatherComponent {
  weatherForm: FormGroup;
  weatherData: any;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.weatherForm = this.fb.group({
      city: [""],
    });
  }

  getWeather(): void {
    const city = this.weatherForm.get("city")?.value.trim();
    if (!city) {
      this.errorMessage = "City name cannot be empty";
      return;
    }

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = "Could not fetch weather data. Please try again.";
      },
    });
  }
}
