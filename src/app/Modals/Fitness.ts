export class Fitness {

    private id: string;
    private inr: number;
    private paisa: number;
    private streetaddress: string;
    private city: string;
    private state: string;
    private country: string;
    private pincode: number;
    private phonenumber: number;
    private email: string;
    private firstname:string;
    private lastname: string;
    private age:number;
    private trainerpreference: string;
    private physiotherapist: string;
    private packages: string;


    constructor(
        $id: string,
        $inr: number,
        $paisa: number,
        $streetaddress: string,
        $city: string,
        $state: string,
        $country: string,
        $pincode: number,
        $phonenumber: number,
        $email: string,
        $firstname: string,
        $lastname: string,
        $age: number,
        $trainerpreference: string,
        $physiotherapist: string,
        $packages: string,
    ) { 
            this.id = $id;
            this.inr = $inr;
            this.paisa = $paisa;
            this.streetaddress = $streetaddress;
            this.city = $city;
            this.state = $state;
            this.country = $country;
            this.pincode = $pincode;
            this.phonenumber = $phonenumber;
            this.email = $email;
            this.firstname = $firstname;
            this.lastname = $lastname;
            this.age = $age;
            this.trainerpreference = $trainerpreference;
            this.physiotherapist = $physiotherapist;
            this.packages = $packages;
            
    }

    public toObject = () => {
            return {
            inr: this.inr,
            paisa: this.paisa,
            streetaddress: this.streetaddress,
            city: this.city,
            state: this.state,
            country: this.country,
            pincode: this.pincode,
            phonenumber: this.phonenumber,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            age: this.age,
            trainerpreference: this.trainerpreference,
            physiotherapist: this.physiotherapist,
            packages: this.packages,
            };
        };


        //Getters for all private variables of Fitness class

        public get $id(): string {
          return this.id;
        }

        public get $firstname(): string {
          return this.firstname;
        }
      
   
        public get $lastname(): string {
          return this.lastname;
        }
      
   
        public get $age(): number {
          return this.age;
        }


        public get $phonenumber(): number {
          return this.phonenumber;
        }
      
  
        public get $email(): string {
          return this.email;
        }


        public get $streetaddress(): string {
          return this.streetaddress;
        }
      
 
        public get $city(): string {
          return this.city;
        }
      
 
        public get $state(): string {
          return this.state;
        }
      
 
        public get $country(): string {
          return this.country;
        }


        public get $pincode(): number {
          return this.pincode;
        }
      
 
        public get $trainerpreference(): string {
          return this.trainerpreference;
        }
      
     
        public get $physiotherapist(): string {
          return this.physiotherapist;
        }
      
    
        public get $packages(): string {
          return this.packages;
        }

        public get $inr(): number {
            return this.inr;
          }
          

        public get $paisa(): number {
            return this.paisa;
          }
    
}