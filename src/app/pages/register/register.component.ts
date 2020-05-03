
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../_services/api.service';
import { Users } from '../../_models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    angForm: FormGroup;
    dataRole = [];
    dataOrganisation = [];
    dataFeed = [];
    currentUser: Users;
    warning: string;
    submitted = false;

//

    constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private httpClient: HttpClient) {
        this.dataService.currentUser.subscribe(x => this.currentUser = x);
        this.angForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
            password: ['', Validators.required],
            passwordconfirm: ['', Validators.required],
            username: ['', Validators.required],
            currentusername: ['', Validators.required],
            role: ['', Validators.required],
            jobtitle: ['', Validators.required],
            organisation: ['', Validators.required],

        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_user_roles-all.php').subscribe(dataRoles => {
            this.dataRole.push(dataRoles);
        });



        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_organisations-all.php').subscribe(dataOrganisation => {
            this.dataOrganisation.push(dataOrganisation);
        });




    }



    ngOnInit() {


    }



    postData(angForm1) {
        this.submitted = true;
        if (angForm1.value.username == "") {
            this.warning = "Username Required";
        }
        else if (angForm1.value.email == "") 
        {
            this.warning = "Email Required";
        }
        else if (angForm1.value.password == "") 
        {
            this.warning = "Password Required";
        }
        else if (angForm1.value.password !== angForm1.value.passwordconfirm) 
        {
            this.warning = "Passwords Do Not Match";
        }
        else if (angForm1.value.role == "") 
        {
            this.warning = "Role Required";
        }
        else if (angForm1.value.jobtitle == "") 
        {
            this.warning = "Job Title Required";
        }
        else if (angForm1.value.organisation == "") 
        {
            this.warning = "Organisation Required";
        }
        else {
            this.warning = "";
            this.dataService.userRegistration(angForm1.value.username, angForm1.value.email, angForm1.value.password, angForm1.value.role, angForm1.value.jobtitle, angForm1.value.organisation)
                .pipe(first())
                .subscribe(
                    data => {
                        // this.router.navigate(['home']);
                    },

                    error => {
                    });

            this.angForm.reset();
        }
    }

    get email() { return this.angForm.get('email'); }
    get password() { return this.angForm.get('password'); }
    get name() { return this.angForm.get('username'); }
}