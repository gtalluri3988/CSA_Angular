import { Component, inject,OnInit  } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunityService } from '@services/CommunityService/community.service';
import { FormControl } from '@angular/forms';
import { BaseService } from '@services/BaseService/base.service';
import { CommunityModel,TableData } from '@model/community-detail.model';
import { AuthService } from '@services/AuthService/auth.service';


@Component({
  selector: 'app-add-community',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './add-community.component.html',
  styleUrl: './add-community.component.css'
})
export class AddCommunityComponent   {
  communityModel: CommunityModel = new CommunityModel();
  communityForm: FormGroup;
  selectedValue = new FormControl(''); 
  comunityService=inject(CommunityService)
  baseService = inject(BaseService); 
  submitted = false;
  fb = inject(FormBuilder); 
  auth=inject(AuthService);
 constructor() {
    this.communityForm = new FormGroup({
      communityType: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required) ,
      city: new FormControl('', Validators.required) ,
      address: new FormControl('', Validators.required) ,
      noOfUnit: new FormControl('', Validators.required) ,
      picName: new FormControl(['']) ,
      picPhoneNo: new FormControl(['']) ,
      picEmail: new FormControl(['']) ,
      state: new FormControl('', Validators.required) ,
      noOfResidentPackingLot: new FormControl(['']),
      feesMonthly: new FormControl(['']) ,
      gracePeriod: new FormControl(['']) ,
      tableRows: this.fb.array<FormGroup>([])
    });
    this.bindCommunityType();
    this.bindStates("State");
    this.bindCharges("ChargesType");
    this.bindStatus("Status");
    
  }

  get f() {
    return this.communityForm.controls;
  }

  get tableRows(): FormArray  {
    return this.communityForm.get('tableRows') as FormArray<FormGroup>;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }
  // Add a new row to the table
  addRow(parkinglots: any, ddchargeDropdown: any,chargeAmountInput:HTMLInputElement,ddStatus:any) {
    const chargeType = ddchargeDropdown.options[ddchargeDropdown.selectedIndex].value;
    const status = ddStatus.options[ddStatus.selectedIndex].value;
    const amount = chargeAmountInput.value ? parseFloat(chargeAmountInput.value) : null;
    const noOfVistorParkingLot = parkinglots.value ? parseFloat(parkinglots.value) : null;
    this.tableRows.push(  
      this.fb.group({
        id:Date.now(),
        noOfVistorParkingLot: new FormControl(noOfVistorParkingLot),
        chargeType: new FormControl(chargeType),
        amount: new FormControl(amount),
        status: new FormControl(status)

      })
    );
    
   
    ddchargeDropdown.value='';
    ddStatus.value='';
    parkinglots.value='';
    chargeAmountInput.value='';
  }

  removeRow(index: number) {
    this.tableRows.removeAt(index);
  }
  getChargeTypeOptionName(id: number): string {
    const selectedOption = this.baseService.chargeTypeDropDown.find(option => option.id === Number(id));
    return selectedOption ? selectedOption.name : 'Select an option';
  }

  getStatusOptionName(id: number): string {
    const selectedOption = this.baseService.statusDropDown.find(option => option.id === Number(id));
    return selectedOption ? selectedOption.name : 'Select an option';
  }
  
  addCommunity()
  {

    Object.values(this.communityForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  
   if (this.communityForm.valid) {
     const formData: CommunityModel = this.communityForm.value;
     
     this.comunityService.saveCommunity(formData).subscribe({
      next: (response) => {
        console.log('Community added successfully:', response);
      },
      error: (error) => {
        console.error('Error:', error);
    
      }
    });

   }
    
  }

 bindCommunityType()
 {
   this.baseService.getCommunityTypeList().subscribe({
    next: (data) => this.baseService.communityTypeDropDown = data, // 🔹 Assign API data
    error: (err) => console.error('Error fetching dropdown data:', err) // 🔹 Handle errors
  });
 }

 bindStates(selectedItem:string)
 {
   this.baseService.getDropDownTypeList(selectedItem).subscribe({
    next: (data) => this.baseService.stateDropDown = data, // 🔹 Assign API data
    error: (err) => console.error('Error fetching dropdown data:', err) // 🔹 Handle errors
  });
 }
 
 bindCharges(selectedItem:string)
 {
   this.baseService.getDropDownTypeList(selectedItem).subscribe({
    next: (data) => this.baseService.chargeTypeDropDown = data, // 🔹 Assign API data
    error: (err) => console.error('Error fetching dropdown data:', err) // 🔹 Handle errors
  });
 }

 bindStatus(selectedItem:string)
 {
   this.baseService.getDropDownTypeList(selectedItem).subscribe({
    //next: (data) => console.log("Next:", data),
    next: (data) => this.baseService.statusDropDown = data, // 🔹 Assign API data
    error: (err) => console.error('Error fetching dropdown data:', err) // 🔹 Handle errors
  });
 }

 

}
