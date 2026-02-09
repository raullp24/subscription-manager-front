import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Subscriptions } from './subscriptions/subscriptions';
import { SubscriptionDetail } from './subscription-detail/subscription-detail';

export const routes: Routes = [
    {path : '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'subscriptions/:userId', component: Subscriptions},
    {path: 'subscription/:subscriptionId',component: SubscriptionDetail}
];
