import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule,MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'tracker';
  private snackBar: MatSnackBar = inject(MatSnackBar)
  ngOnInit(): void {
    if(window.matchMedia('(display-mode: standalone)').matches) {
      if('standalone' in navigator) {
        // The app is running in standalone mode
        console.log('Running in standalone mode');
        this.snackBar.open('You can install this app, use Share -> Add to Home Screen',
           'Close',
           {
          duration: 3000,
          panelClass: ['snackbar-standalone']
        });
      }
      else{
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
         const result = this.snackBar.open('You can install this app',
           'Install',
           {
          duration: 3000,
          panelClass: ['snackbar-standalone']
        });
          result.onAction().subscribe(() => {
          (event as any).prompt();
          (event as any).userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
          });
      });
      });
      }
    }
  }
}
