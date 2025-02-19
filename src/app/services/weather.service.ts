import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    constructor(private readonly http: HttpClient) {}

    getWeather(city: string): Observable<any> {
        const url = `http://api.weatherstack.com/current?access_key=${environment.apiKey}&query=${city}`;
        return this.http.get<any>(url);
    }
}
