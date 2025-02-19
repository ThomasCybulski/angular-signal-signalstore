import { computed, inject } from '@angular/core';
import {
    signalStore,
    withState,
    withMethods,
    patchState,
    withComputed,
} from '@ngrx/signals';
import { WeatherService } from './weather.service';
import { firstValueFrom } from 'rxjs';

type WeatherEntry = {
    cities: {
        name: string;
        data: any;
    }[];
    current: any;
    isLoading: boolean;
    hasError: boolean;
};

export const WeatherStore = signalStore(
    { providedIn: 'root' },
    withState({
        cities: [],
        current: null,
        isLoading: false,
        hasError: false,
    } as WeatherEntry),
    withComputed(({ cities }) => ({
        isEmpty: computed(() => cities().length === 0),
    })),
    withMethods((store) => {
        const weatherService = inject(WeatherService);

        return {
            async get(cityName: string) {
                const existingCity = store
                    .cities()
                    .find(
                        (city) =>
                            city.name.toLowerCase() === cityName.toLowerCase()
                    );

                if (existingCity) {
                    patchState(store, { current: existingCity.data });
                    return;
                }

                patchState(store, { isLoading: true });

                try {
                    const weatherData = await firstValueFrom(
                        weatherService.getWeather(cityName)
                    );

                    patchState(store, {
                        cities: [
                            ...store.cities(),
                            { name: cityName, data: weatherData },
                        ],
                        current: weatherData,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    patchState(store, { isLoading: false, hasError: true });
                }
            },
            async clear() {
                patchState(store, {
                    cities: [],
                    current: null,
                });
            },
        };
    })
);
