import { Component, inject,ViewEncapsulation ,OnInit  } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive,Router ,NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive,RouterOutlet,NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class LayoutComponent  {
  isLoading = false;
  auth = inject(AuthService);
  


  openModal($event: Event) {
    $event.preventDefault();  
  }

  constructor(private router: Router) {
    
  }
    // setTimeout(() => {
    //   this.isLoading = false; // ✅ Stop loading after 3 seconds
    // }, 3000);
    logout() {
      this.auth.logout();
      this.router.navigate(['/login']); // Redirect to login page
    }
  
}
