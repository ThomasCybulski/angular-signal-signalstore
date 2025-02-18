import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import * as Hannover from '../../../public/Hannover.json';
import * as BadRothenfelde from '../../../public/BadRothenfelde.json';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private weatherDataSubject = new BehaviorSubject<any>(null);
    readonly weatherData$ = this.weatherDataSubject.asObservable();

    constructor(private http: HttpClient) {}

    getWeather(city: string): Observable<any> {
        const url = `https://goweather.herokuapp.com/weather/${city}`;
        return this.http.get<any>(url);
    }

    getWeatherLocal(city: string): Observable<any> {
        switch (city) {
            case 'Hannover':
                return of(Hannover);
                break;
            case 'Bad Rothenfelde':
                return of(BadRothenfelde);
                break;
            default:
                return of(null);
                break;
        }
    }

    setWeatherData(data: any): void {
        this.weatherDataSubject.next(data);
    }
}
