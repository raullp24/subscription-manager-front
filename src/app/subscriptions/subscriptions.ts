import { Component, inject, OnInit } from '@angular/core';
import { SubscriptionsService } from '../services/subscriptions';
import { Store } from '../store/store';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css',
})
export class Subscriptions implements OnInit {
  private subscriptonService: SubscriptionsService = inject(SubscriptionsService);
  private store: Store = inject(Store);

  subscriptions: any[] = [];

  ngOnInit() {
    this.store.$state.subscribe((state) => {
      if (state.user) {
        console.log('Component rendered fine', state.user.id);
        this.loadSubscriptions(state.user.id);
      }
    });
  }

  loadSubscriptions(userId: string) {
    this.subscriptonService.getSubscriptionsByUserId(userId).subscribe({
      next: (data) => {
        this.subscriptions = data;
        console.log('DATA:', data);
        console.log('Subscriptions', this.subscriptions);

      },
      error: (err) => {
        console.error('Error fetching subscriptions:', err);
      },
    });
  }
}
