import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  private history: string[] = [];

  getHistory(): string[] {
    return this.history;
  }

  addCity(city: string): void {
    if (city && !this.history.includes(city)) {
      this.history.push(city);
    }
  }

  clearHistory(): void {
    this.history = [];
  }
}
