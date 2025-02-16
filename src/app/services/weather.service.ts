import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private weatherDataSubject = new BehaviorSubject<any>(null);
  readonly weatherData$ = this.weatherDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `https://goweather.herokuapp.com/weather/${city}`;
    return this.http.get<any>(url);
  }

  setWeatherData(data: any): void {
    this.weatherDataSubject.next(data);
  }
}
