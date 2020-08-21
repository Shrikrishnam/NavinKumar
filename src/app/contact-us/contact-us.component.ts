import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }

    public toObject =( ) => {
      return{
        firstname:  this.firstname,
        lastname: this.lastname,
        phonenumber: this.phonenumber,
        email: this.email,
        message: this.message
      };
    }
  
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  
  constructor(private userservice: UserService,private fb: FormBuilder) { }

  
  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$")]],
      phonenumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
      message:["",[Validators.required]]
    });
  }
  
  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );

    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );

      const data = new Contact (this.contactForm.value.firstname,
        this.contactForm.value.lastname,
        this.contactForm.value.phonenumber,
        this.contactForm.value.email,
        this.contactForm.value.message)

        //Posting Contact data
      this.userservice
          .postcontactdata(data.toObject())
          .subscribe((result) => {
            console.log(result);
            alert("Form Submitted Successfully");
            this.contactForm.reset();
          },
          err => {
              console.log(err);
              alert("An error occurred from server, couldn't submit the data")
          });
    }
  }
}
