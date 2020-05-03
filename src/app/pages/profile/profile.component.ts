
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../_services/api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    angForm: FormGroup;
    dataRole = [];
    dataResource = [];
    dataOrganisation = [];
    dataFeed = [];

    constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private httpClient: HttpClient) {
        this.angForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
            password: ['', Validators.required],
            username: ['', Validators.required],
            role: ['', Validators.required],
            jobtitle: ['', Validators.required],
            resource: ['', Validators.required],
            organisation: ['', Validators.required],
            mobile: ['', Validators.required]
        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_user_roles-all.php').subscribe(dataRoles => {
            this.dataRole.push(dataRoles);
        });


        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_resources-all.php').subscribe(dataResources => {
            this.dataResource.push(dataResources);
        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_organisations-all.php').subscribe(dataOrganisation => {
            this.dataOrganisation.push(dataOrganisation);
        });




    }

    ngOnInit() {
    }





    get email() { return this.angForm.get('email'); }
    get password() { return this.angForm.get('password'); }
    get name() { return this.angForm.get('username'); }
}