import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { SubscriptionsService } from '../services/subscriptions';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.html',
  imports: [ReactiveFormsModule, NgIf],
  styleUrl: './subscriptions.css',
})
export class Subscriptions implements OnInit {
  private subscriptonService: SubscriptionsService = inject(SubscriptionsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  userId: string = this.route.snapshot.paramMap.get('userId') || '';

  showForm: boolean = false;

  subscriptions: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      if (this.userId) {
        this.loadSubscriptions(this.userId);
      }
    });
  }

  loadSubscriptions(userId: string) {
    this.subscriptonService.getSubscriptionsByUserId(userId).subscribe({
      next: (data) => {
        this.subscriptions = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching subscriptions:', err);
      },
    });
  }

  subscriptionForm = new FormGroup({
    userId : new FormControl(this.userId, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('active'),
    startDate: new FormControl('', Validators.required),
    periodicity: new FormControl('', Validators.required),
    autoRenewal: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    endDate: new FormControl(''),
  });

  formatDate = (d: Date) => d.toISOString().split('T')[0];

  toogleForm(){
    this.showForm = !this.showForm;
  }

  closeForm(){
    this.showForm = false;
    this.subscriptionForm.reset();
  }

  saveSubscription() {
    if (this.subscriptionForm.valid) {
      const data = {
        ...this.subscriptionForm.value,
        startDate: this.formatDate(new Date(this.subscriptionForm.value.startDate || new Date())),
        endDate: this.formatDate(new Date(this.subscriptionForm.value.endDate || new Date())),
      };

      this.subscriptonService.saveSubscription(data).subscribe({
        next: (response) => {
          console.log('Subscription saved:', response);
          this.loadSubscriptions(this.userId);
          this.closeForm();
        },
        error: (err) => {
          console.error('Error saving subscription:', err);
        },
      });
    } else{
      console.log('Form is invalid:', this.subscriptionForm.errors);
    }
  }
}
