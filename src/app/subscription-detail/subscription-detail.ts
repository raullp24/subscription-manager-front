import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubscriptionsService } from '../services/subscriptions';
import { Store } from '../store/store';

@Component({
  selector: 'app-subscription-detail',
  imports: [RouterLink],
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
        console.log('Subscription data:', data);
      },
      error: (err) => {
        console.error('Error fetching subscription:', err);
      },
    });

  }

}
