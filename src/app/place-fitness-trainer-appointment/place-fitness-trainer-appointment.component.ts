import { Component, OnInit} from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from 'src/app/_services';
import { Fitness } from "../Modals/Fitness";
import { PackageValidator } from "../shared/package.validator"; //Custom validator for packages attribute

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  packages:Array<Object> = [{name:'Monthly', inr: 500, paisa:50},{name:'Quarterly', inr: 1500, paisa:50},{name:'Annual', inr: 5000, paisa:50}];
  fitnessForm: FormGroup;
  editFlag:boolean;
  user:Fitness;
  loaded = false;
  submitValue = "Submit";
  formHeading = "Place"

  constructor( 
    private fb: FormBuilder,
    private userservice: UserService,
    private router:Router,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    //If there is ID in route then component is in Edit Appointment mode otherwise its in Place Appointment mode
    if (this.route.snapshot.paramMap.get("id")) {
      //waiting till the data us fetched
      const data = await this.userservice
      .getfitnessdatabyid(this.route.snapshot.paramMap.get("id")).toPromise().catch(error => alert("Server error! Couldn't fetch data"));;
      
        this.user = new Fitness(
              data.id,
              data.inr,
              data.paisa,
              data.streetaddress,
              data.city,
              data.state,
              data.country,
              data.pincode,
              data.phonenumber,
              data.email,
              data.firstname,
              data.lastname,
              data.age,
              data.trainerpreference,
              data.physiotherapist,
              data.packages
        )
        
      
      this.editFlag = true;
      this.loaded = true;
      this.submitValue = "Edit";
      this.formHeading = "Edit";
          //adding fetched value to form group
      this.fitnessForm = this.fb.group({
          firstname: [this.user.$firstname, [Validators.required, Validators.pattern("^[A-Za-z ]+$")]],
          lastname: [this.user.$lastname, [Validators.required, Validators.pattern("^[A-Za-z ]+$")]],
          age: [this.user.$age,[Validators.required, Validators.min(18), Validators.max(60)]],
          phonenumber: [this.user.$phonenumber, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
          email: [this.user.$email,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
          streetaddress: [this.user.$streetaddress, [Validators.required]],
          city: [this.user.$city, [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
          state: [this.user.$state, [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
          country: [this.user.$country, [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
          pincode: [this.user.$pincode, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
          trainerpreference: [this.user.$trainerpreference, [Validators.required]],
          physiotherapist: [this.user.$physiotherapist, [Validators.required]],
          packages: [this.user.$packages, [Validators.required]],
          inr: [this.user.$inr, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
          paisa: [this.user.$paisa, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
  
        }, {validator:PackageValidator});

        this.fitnessForm.get("packages").setValue(this.user.$packages,{onlySelf:true});
        

    }else{

      this.editFlag = false;
      this.loaded = true;
      this.fitnessForm = this.fb.group({
        firstname: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$")]],
        lastname: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$")]],
        age: ["",[Validators.required, Validators.min(18), Validators.max(60)]],
        phonenumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
        email: ["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
        streetaddress: ["", [Validators.required]],
        city: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
        state: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
        country: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
        pincode: ["", [Validators.required, Validators.pattern("^[0-9]{6}$")]],
        trainerpreference: ["", [Validators.required]],
        physiotherapist: ["", [Validators.required]],
        packages: ["", [Validators.required]],
        inr: ["", [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
        paisa: ["", [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],

      }, {validator:PackageValidator});
  
        this.fitnessForm.get("trainerpreference").setValue("male");
        this.fitnessForm.get("physiotherapist").setValue("yes");
        this.fitnessForm.get("packages").setValue("any",{onlySelf:true});
       
    }
    
        this.fitnessForm.get('packages').valueChanges.subscribe(val => {
          //Setting value of inr and paisa according to package
          if(val == 'Monthly'){
            this.fitnessForm.get("inr").setValue(500);
            this.fitnessForm.get("paisa").setValue(50);
        }else if(val == 'Quarterly'){
             this.fitnessForm.get("inr").setValue(1500);
             this.fitnessForm.get("paisa").setValue(50);
        }else if(val == 'Annual'){
             this.fitnessForm.get("inr").setValue(5000);
             this.fitnessForm.get("paisa").setValue(50);
        }else {
            this.fitnessForm.get("inr").setValue("");
            this.fitnessForm.get("paisa").setValue("");
        }
        });

        
        
  }
 
  onSubmit() {
    if (this.fitnessForm.valid) {

      const data = new Fitness(
        "",  
        this.fitnessForm.value.inr,
        this.fitnessForm.value.paisa,
        this.fitnessForm.value.streetaddress,
        this.fitnessForm.value.city,
        this.fitnessForm.value.state,
        this.fitnessForm.value.country,
        this.fitnessForm.value.pincode,
        this.fitnessForm.value.phonenumber,
        this.fitnessForm.value.email,
        this.fitnessForm.value.firstname,
        this.fitnessForm.value.lastname,
        this.fitnessForm.value.age,
        this.fitnessForm.value.trainerpreference,
        this.fitnessForm.value.physiotherapist,
        this.fitnessForm.value.packages
      );
      
      if(this.editFlag){
        //Routing to view appointment after data is posted
        this.userservice
              .editfitnessdata(this.route.snapshot.paramMap.get("id"),data)
              .subscribe(result =>{
                alert("Appointment Edited Successfully");
                this.router.navigate(['/view-appointment']);
              },
              err => {
                  console.log(err);
                  alert("An error occurred from server, couldn't edit the appointment")
              });
      }else{
        //Posting appointment data
        this.userservice
          .postfitnessdata(data.toObject())
          .subscribe((result) => {
            console.log(result);
            alert("Appointment Placed Successfully");
            this.fitnessForm.reset();
            this.router.navigate(['/view-appointment']);
          },
          err => {
              console.log(err);
              alert("An error occurred from server, couldn't place the appointment")
          });
      }
      
    }else{
        console.log("no success");
    }
  }
    
}
