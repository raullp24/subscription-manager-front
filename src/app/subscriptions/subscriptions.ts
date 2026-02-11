import { Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import { SubscriptionsService } from '../services/subscriptions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from "../navbar/navbar";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.html',  
  imports: [ReactiveFormsModule, Navbar, RouterLink, BaseChartDirective],
  styleUrl: './subscriptions.css',
})
export class Subscriptions implements OnInit {
  private subscriptonService: SubscriptionsService = inject(SubscriptionsService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  userId: string = this.route.snapshot.paramMap.get('userId') || '';

  showForm = signal(false);

  subscriptions = signal<any[]>([]);

  totalMonthlyCost = computed(() => {
    let total = 0;
    for (const sub of this.subscriptions()) {
      if (sub.status === 'active') {
        if(sub.periodicity === 'MONTHLY') {
          total += sub.price;
        }
        else if(sub.periodicity === 'YEARLY') {
          total += sub.price / 12;
        }
      }
    }
    return total;
  });

  
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Monthly Cost (€)', 
        backgroundColor: '#34495e',
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        enabled: true,
        callbacks: {
          afterLabel: (context) => {
            const total = this.totalMonthlyCost();
            const value = context.parsed?.y ?? 0;
            if (total > 0) {
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}% of total`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' €';
          }
        }
      }
    }
  };

  constructor() {
    effect(() => {
      const subs = this.subscriptions().filter(s => s.status === 'active');
      
      this.barChartData.labels = subs.map(s => s.name);
      this.barChartData.datasets[0].data = subs.map(s => {
        if (s.periodicity === 'MONTHLY') {
          return s.price;
        } else if (s.periodicity === 'YEARLY') {
          return s.price / 12;
        }
        return 0;
      });
      
      this.barChartData = { ...this.barChartData };
    });
  }

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
        this.subscriptions.set(data);
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
    this.showForm.update(value => !value);
  }

  closeForm(){
    this.showForm.set(false);
    this.subscriptionForm.reset({
      userId: this.userId,
      status: 'active',
    });
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
