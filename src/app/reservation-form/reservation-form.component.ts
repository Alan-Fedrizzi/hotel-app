import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.getReservation(id).subscribe((reservation) => {
        if (reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // console.log('valid');
      // console.log(this.reservationForm);
      let reservation: Reservation = this.reservationForm.value;

      // estamos editando ou criando uma nova reserva???
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // update
        this.reservationService
          .updateReservation(id, reservation)
          .subscribe(() => console.log('Update request processed.'));
      } else {
        // new
        this.reservationService
          .addReservation(reservation)
          .subscribe(() => console.log('Create request processed.'));
      }

      this.router.navigate(['/list']);
    }
  }
}
