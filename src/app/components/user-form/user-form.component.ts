import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserServiceService } from 'src/app/service/user-service.service';

interface IDType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userRegister: FormGroup;
  belowData: boolean = true;
  idsList: IDType[] = [
    { value: 'aadhar', viewValue: 'Aadhar' },
    { value: 'pancard', viewValue: 'pancard' },
    { value: 'voterID', viewValue: 'VoterId' }
  ];

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) { }


  ngOnInit(): void {

    
  

    this.userRegister = this.formBuilder.group({

      nameId: ['',Validators.required],
      emailerrId : ['',Validators.required],
      status: ['Yes',Validators.required],
      idType: [null, [Validators.required]],
      noOfdaysIn2020: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      noOfdaysIn2021: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],


    });
  }

  sendForm() {
    let formDetails = <any>this.userRegister.value;

    this.userService.sendUserFormData(formDetails).subscribe(res => {
      this.userRegister.reset()
    },
      (error: any) => {
        this.userRegister.reset()


      }
    );
  }
}





