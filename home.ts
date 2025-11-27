import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
    ngAfterViewInit() {
    // Attach handler for Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.onCheckout());
    }

    // Reset modal when opened via Bootstrap JS (if using Bootstrap modal)
    const bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
      bookingModal.addEventListener('show.bs.modal', () => {
        this.resetModal();
      });
    }
    // If using Angular-driven modal, call this.resetModal() before showing the modal
  }

  onCheckout() {
    console.log('Checkout clicked!');
    const emailInput = document.getElementById('email1') as HTMLInputElement;
    const tourSelect = document.getElementById('select1') as HTMLSelectElement;
    const email = emailInput ? emailInput.value.trim() : '';
    const tour = tourSelect ? tourSelect.value : '';

    if (email && tour) {
      let bookings = [];
      const stored = localStorage.getItem('tourBookings');
      if (stored) bookings = JSON.parse(stored);
      bookings.push({ email, tour, date: new Date().toISOString() });
      localStorage.setItem('tourBookings', JSON.stringify(bookings));

      // Hide form, show message
      const form = document.querySelector('#booking-modal form') as HTMLElement;
      if (form) form.style.display = 'none';
      const msgDiv = document.getElementById('success-message') as HTMLElement;
      if (msgDiv) msgDiv.style.display = 'block';
    } else {
      alert('Please enter your email and pick your tour!');
    }
  }

  resetModal() {
    const form = document.querySelector('#booking-modal form') as HTMLElement;
    if (form) form.style.display = 'block';
    const msgDiv = document.getElementById('success-message') as HTMLElement;
    if (msgDiv) msgDiv.style.display = 'none';

    const emailInput = document.getElementById('email1') as HTMLInputElement;
    const tourSelect = document.getElementById('select1') as HTMLSelectElement;
    if (emailInput) emailInput.value = '';
    if (tourSelect) tourSelect.value = '';
  }
}
