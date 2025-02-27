import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  
   styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() isLoading: boolean = false;

}