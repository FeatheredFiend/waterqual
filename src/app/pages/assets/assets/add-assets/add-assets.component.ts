
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AssetsService } from '../../../../_services';


@Component({
    selector: 'app-add-assets',
    templateUrl: './add-assets.component.html',
    styleUrls: ['./add-assets.component.css']


})
export class AddAssetsComponent implements OnInit {
    angForm: FormGroup;
    dataAssetType = [];
    dataOutletType = [];
    dataManufacturer = [];
    dataOrganisation = [];
    dataBuilding = [];
    dataDepartment = [];
    dataFloor = [];
    dataFeed = [];



    constructor(@Inject(DOCUMENT) document, private fb: FormBuilder, private dataService: AssetsService, private router: Router, private httpClient: HttpClient) {
        this.angForm = this.fb.group({
            assetcode: ['', Validators.required],
            assettype: ['', Validators.required],
            outlettype: ['', Validators.required],
            manufacturer: ['', Validators.required],
            serialnumber: ['', Validators.required],
            modelnumber: ['', Validators.required],
            sentinel: ['', Validators.required],
            healthcare: ['', Validators.required],
            organisation: ['', Validators.required],
            building: ['', Validators.required],
            department: ['', Validators.required],
            floor: ['', Validators.required],
            location: ['', Validators.required],
            room: ['', Validators.required],
            comment: ['', Validators.required]
        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_asset_types-all.php').subscribe(dataAssetType => {
            this.dataAssetType.push(dataAssetType);
        });


        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_manufacturers-all.php').subscribe(dataManufacturer => {
            this.dataManufacturer.push(dataManufacturer);
        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_organisations-all.php').subscribe(dataOrganisation => {
            this.dataOrganisation.push(dataOrganisation);
        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_buildings-all.php').subscribe(dataBuilding => {
            this.dataBuilding.push(dataBuilding);
        });

        this.httpClient.get('http://waterqual.proprietary-data.com/api/get_floors-all.php').subscribe(dataFloor => {
            this.dataFloor.push(dataFloor);
        });



    }


    ngOnInit() {
    }

    onSelectAssetType(assettypeid) {
        this.dataOutletType = [];
        this.dataService.findOutletType(assettypeid).subscribe(dataOutletType => {
            this.dataOutletType.push(dataOutletType);
        });
    }

    onSelectBuilding(building) {
        this.dataDepartment = [];
        this.dataService.findDepartment(building).subscribe(dataDepartment => {
            this.dataDepartment.push(dataDepartment);
        });
    }


    postdata(angForm1) {
        this.dataService.addAsset(angForm1.value.assetcode, angForm1.value.assettype, angForm1.value.outlettype, angForm1.value.manufacturer, angForm1.value.serialnumber, angForm1.value.modelnumber, angForm1.value.sentinel, angForm1.value.healthcare, angForm1.value.organisation, angForm1.value.building, angForm1.value.department, angForm1.value.floor, angForm1.value.location, angForm1.value.room, angForm1.value.comment)
            .pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate(['home']);
                },

                error => {
                });
        this.angForm.reset();
    }


}