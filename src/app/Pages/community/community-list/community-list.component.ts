import { Component,OnInit,Input  } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CommunityResponse } from '@model/community.model';
import { CommunityService } from '@services/CommunityService/community.service';



@Component({
  selector: 'app-community',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './community-list.component.html',
  styleUrl: './community-list.component.css'
})
export class CommunityComponent implements OnInit {
  
  items: CommunityResponse = { communityResult: [] };
    
    errorMessage: string = '';
    
    constructor(private comService: CommunityService) {}
  
    ngOnInit(): void {
      this.fetchCommunityList();
    }
  
    fetchCommunityList(): void {
      this.comService.getCommunityList().subscribe({
        next: (data: CommunityResponse) => {     
          
          setTimeout(() => {
            console.log("Executed after 3 seconds");
          }, 3000);

          this.items = data;          
          
        },
        error: (error) => {
          this.errorMessage = 'Error fetching data!';
          console.error('Error:', error);
          
        }
      });
    }
  }



