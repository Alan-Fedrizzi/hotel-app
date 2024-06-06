import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private API_URL = 'http://localhost:3001';
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  // CRUD - create, read, update, delete

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API_URL}/reservations`);
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.API_URL}/reservation/${id}`);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/reservation`, reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/reservation/${id}`);
  }

  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/reservation/${id}`,
      updatedReservation
    );
  }
}
