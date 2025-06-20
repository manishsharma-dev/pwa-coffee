import { Component, inject, OnInit } from '@angular/core';
import { Coffee } from '../logic/Coffee';
import { DataService } from '../services/data';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { take } from 'rxjs';
import { GeolocationService } from '../services/geolocation';


@Component({
  selector: 'app-list',
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltip,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {
  geolocationService: GeolocationService = inject(GeolocationService);
  list: Coffee[] = [];

  constructor(private data : DataService, private router: Router){}

  ngOnInit(): void {
    this.data.getCoffeeList()
    .pipe(
      take(1))
      .subscribe((list: Coffee[]) => {
      this.list = list;
    });
  }

  showDetails(coffee: Coffee): void {
    this.router.navigate(['/coffee', coffee.id]);
  }

  showMap(coffee: Coffee): void {
    const mapUrl = this.geolocationService.getMapLink(coffee.location!);
    window.open(mapUrl, '_blank');
  }

 shareCoffee(coffee: Coffee): void {
  if (navigator.share) {
    navigator.share({
      title: `Check out this coffee: ${coffee.name}`,
      text: `I found this coffee at ${coffee.place}.`,
      url: window.location.href + '/coffee/' + coffee.id
    }).catch(err => {
      console.error('Error sharing coffee:', err);
      alert('Sharing failed.');
    });
  } else {
    alert('Sharing is not supported on this device or browser.');
  }
}
}
