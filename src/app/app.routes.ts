import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Subscriptions } from './subscriptions/subscriptions';
import { SubscriptionDetail } from './subscription-detail/subscription-detail';
import { Home } from './home/home';

export const routes: Routes = [
    {path : '', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'subscriptions/:userId', component: Subscriptions},
    {path: 'subscription/:subscriptionId',component: SubscriptionDetail}
];
