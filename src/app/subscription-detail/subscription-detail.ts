import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubscriptionsService } from '../services/subscriptions';
import { Store } from '../store/store';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-subscription-detail',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './subscription-detail.html',
  styleUrl: './subscription-detail.css',
})
export class SubscriptionDetail implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  private subscriptionService: SubscriptionsService = inject(SubscriptionsService);

  private store: Store = inject(Store);

  private subscriptionId: string = this.route.snapshot.paramMap.get('subscriptionId') || '';

  subscription = signal<any>(null);

  userId = signal<string>('');

  showForm = signal(false);


  subscriptionForm = new FormGroup({
    id : new FormControl('',Validators.required),
    userId : new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(''),
    startDate: new FormControl('', Validators.required),
    periodicity: new FormControl('', Validators.required),
    autoRenewal: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    endDate: new FormControl('')
  })

  ngOnInit() {
    const user = this.store.state.user;
    if (user) {
      this.userId.set(user.id);
    }
    
    this.route.paramMap.subscribe(() => {
      if (this.subscriptionId) {
        this.loadSubscription(this.subscriptionId);
      }
    });
  }
  
  loadSubscription(id: string){
    this.subscriptionService.getSubscriptionById(id).subscribe({
      next: (data) => {
        this.subscription.set(data);
        this.subscriptionForm.patchValue(data);
        console.log('Subscription data:', data);
        console.log('Subscription form value:', this.subscriptionForm.value);
      },
      error: (err) => {
        console.error('Error fetching subscription:', err);
      },
    });
  }

  toggleForm() {
    this.showForm.set(!this.showForm());
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      const updatedSubscription = this.subscriptionForm.value;
      console.log('Updating subscription:', updatedSubscription);
      
      this.subscriptionService.updateSubscription(this.subscriptionId, updatedSubscription).subscribe({
        next: (data) => {
          console.log('Subscription updated successfully:', data);
          this.subscription.set(data);
          this.showForm.set(false);
        },
        error: (err) => {
          console.error('Error updating subscription:', err);
        },
      });
    }
  }

}
