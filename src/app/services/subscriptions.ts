import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class SubscriptionsService {
    
    private http: HttpClient = inject(HttpClient);

    getSubscriptionsByUserId(userId: string){
        const token = localStorage.getItem('token');
        return this.http.get<any[]>(`http://localhost:8080/api/subscriptions/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    saveSubscription(subscription: any) {
        const token = localStorage.getItem('token');
        return this.http.post('http://localhost:8080/api/subscriptions', subscription, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}