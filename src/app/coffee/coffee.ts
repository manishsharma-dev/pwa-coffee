import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GeolocationService } from '../services/geolocation';
import { Coffee } from '../logic/Coffee';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../services/data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coffee',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  templateUrl: './coffee.html',
  styleUrl: './coffee.scss'
})
export class CoffeeComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // Check if the route has an 'id' parameter
      if (params['id']) {
        // If it does, set formType to 'edit'
        this.formType = 'edit';
        // Fetch the coffee details for editing
        this.dataService.getCoffeeById(params['id']).subscribe((coffee: Coffee) => {
          this.coffee = coffee;
          // Ensure location is initialized
          if (!this.coffee.location) {
            this.coffee.location = { id: '', address: '', city: '', latitude: null, longitude: null };
          }
        });
      } else {
        // If not, set formType to 'create'
        this.formType = 'create';
      }
    });
  }
geolocation: GeolocationService = inject(GeolocationService);
dataService: DataService = inject(DataService);
router: Router = inject(Router);

  // This is used to determine if the form is for creating a new coffee or editing an existing one
  // It can be set to 'create' or 'edit' based on the context in which this component is used
  // For example, if this component is used in a route that includes an ID, it should be set to 'edit'
  // Otherwise, it defaults to 'create'
formType: 'create' | 'edit' = 'create';
  types =  [
    { value: 'espresso', viewValue: 'Espresso' },
    { value: 'filter', viewValue: 'Filter' },
    { value: 'french-press', viewValue: 'French Press' },
    { value: 'cold-brew', viewValue: 'Cold Brew' },
    { value: 'aeropress', viewValue: 'Aeropress' },
  ]
  coffeeForm = {
    name: '',
    type: '',
    notes: '',
    place: '',
    location: {
      address: '',
      city: '',
    },
  }

  tastingEnabled = false;

  coffee = new Coffee();

  cancel() {}

  save() {
      this.dataService.saveCoffee(this.coffee).subscribe((coffee: Coffee) => {
        if (coffee.id) {
          console.log('Coffee created:', coffee);
          this.router.navigate(['/list']);
        }
        else{
          console.error('Error creating coffee:', coffee);
          // Handle error case, e.g., show a message to the user
        }
      });
  }

  acquireLocation() {
    this.geolocation.requestLocation((location: GeolocationCoordinates | null) => {
     console.log('Location acquired:', location);
      if(location){
        this.coffee.location!.latitude = location.latitude;
        this.coffee.location!.longitude = location.longitude;
      }
    });
  }

  tastingRatingChanged(checked: boolean){
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    }
    else {
      this.coffee.tastingRating = null;
    }
  }
}
