import { AbstractControl } from "@angular/forms";

//To check if the proper package is selected or not
export function PackageValidator(control: AbstractControl): {[key:string]:boolean} | null {
    const packages = control.get('packages');

    if(packages.value == "" || packages.value == "any"){
        return {'notSelected':true};
        
    }
    
}