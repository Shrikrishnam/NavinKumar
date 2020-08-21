import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { Fitness } from "../Modals/Fitness";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

    users: Fitness[];
    modalUser:Fitness;

    constructor(private userService: UserService, private modalService: NgbModal, private router: Router) { }

    //modal for viewing particular appointment
    openModal(targetModal, user) {
      this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
      });
      this.modalUser = new Fitness(
        user.id,
        user.inr,
        user.paisa,
        user.streetaddress,
        user.city,
        user.state,
        user.country,
        user.pincode,
        user.phonenumber,
        user.email,
        user.firstname,
        user.lastname,
        user.age,
        user.trainerpreference,
        user.physiotherapist,
        user.packages
      )
      
}
  deleteAppointment(id) {
      this.modalService.dismissAll();
      this.userService.deletefitnessdata(id).subscribe((result) => {
        alert("Appointment Deleted Successfully");
          this.ngOnInit();
    },
    err => {
        console.log(err);
        alert("An error occurred from server, couldn't delete the appointment")
    });
  }
    
    editAppointment(id) {
      this.modalService.dismissAll();
      this.router.navigate([`/edit/${id}`]);
    
    }

    ngOnInit() {
      //fetch all the values of appointment and push into users array
      this.userService.getfitnessdata().subscribe((data) => {
      this.users = [];
      data.forEach(
        (value: {
          id: string;  
          inr: number;
          paisa: number;
          streetaddress: string;
          city: string;
          state: string;
          country: string;
          pincode: number;
          phonenumber: number;
          email: string;
          firstname: string;
          lastname: string;
          age: number;
          trainerpreference: string;
          physiotherapist: string;
          packages: string;
          
        }) => {
          this.users.push(
            new Fitness(
              value.id,
              value.inr,
              value.paisa,
              value.streetaddress,
              value.city,
              value.state,
              value.country,
              value.pincode,
              value.phonenumber,
              value.email,
              value.firstname,
              value.lastname,
              value.age,
              value.trainerpreference,
              value.physiotherapist,
              value.packages,
              
            )
          );
        }
      );
    },
    err => {
        console.log(err);
        alert("An error occurred from server, couldn't retrieve the appointments")
    });
    
    
    
    }
    
    
  }
  
 

