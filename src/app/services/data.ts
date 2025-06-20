import { inject, Injectable } from '@angular/core';
import { Coffee } from '../logic/Coffee';
import { PlaceLocation } from '../logic/PlaceLocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl; // Use the environment variable for the API URL
  constructor() { }

  getCoffeeList() : Observable<Coffee[]> {
    return this.http.get<Coffee[]>(`${this.apiUrl}coffee`);
  }

  // getList(callback : Function){
  //   const list = [
  //     new Coffee('1','Espresso', 'Cafe Plaza', new PlaceLocation('1',"Espresso", "Gurgaon", 28.4595, 77.0266)),
  //     new Coffee('2','Cappuccino', 'Cafe Mocha', new PlaceLocation('2',"Cappuccino", "Delhi", 28.7041, 77.1025)),
  //     new Coffee('3','Latte', 'Cafe Coffee Day', new PlaceLocation('3',"Latte", "Bangalore", 12.9716, 77.5946)),
  //     new Coffee('4','Americano', 'Starbucks', new PlaceLocation('3',"Americano", "Mumbai", 19.0760, 72.8777)),
  //     new Coffee('5','Macchiato', 'Costa Coffee', new PlaceLocation('3',"Macchiato", "Chennai", 13.0827, 80.2707)),
  //     new Coffee('6','Mocha', 'Cafe Nero', new PlaceLocation('3',"Mocha", "Kolkata", 22.5726, 88.3639)),
  //     new Coffee('7','Flat White', 'Blue Tokai', new PlaceLocation('3',"Flat White", "Hyderabad", 17.3850, 78.4867)),
  //     new Coffee('8','Affogato', 'Third Wave Coffee Roasters', new PlaceLocation('3',"Affogato", "Pune", 18.5204, 73.8567)),
  //     new Coffee('9','Irish Coffee', 'The Coffee Bean & Tea Leaf', new PlaceLocation('3',"Irish Coffee", "Ahmedabad", 23.0225, 72.5714)),
  //   ];
  //   callback(list);
  // }

  saveCoffee(coffee: Coffee): Observable<Coffee> {
    if (coffee.id) {
      // Update existing coffee
      return this.http.put<Coffee>(`${this.apiUrl}coffee/${coffee.id}`, coffee);
    } else {
      // Create new coffee
      return this.http.post<Coffee>(`${this.apiUrl}coffee`, coffee);
    }
  }

  getCoffeeById(id: string): Observable<Coffee> {
    return this.http.get<Coffee>(`${this.apiUrl}coffee/${id}`);
  }
}
