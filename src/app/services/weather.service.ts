import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    readonly weatherData$ = new BehaviorSubject<any>(null);

    constructor(private readonly http: HttpClient) {}

    getWeather(city: string): Observable<any> {
        const url = `http://api.weatherstack.com/current?access_key=${environment.apiKey}&query=${city}`;
        return this.http.get<any>(url);
    }

    setWeatherData(data: any): void {
        this.weatherData$.next(data);
    }
}
