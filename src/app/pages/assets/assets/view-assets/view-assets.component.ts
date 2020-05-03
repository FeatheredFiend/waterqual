import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AssetsDataSource } from "../../../../_data-sources";
import { Assets } from "../../../../_models";
import { AssetsService } from "../../../../_services";

@Component({
  selector: 'app-view-assets',
  templateUrl: './view-assets.component.html',
  styleUrls: ['./view-assets.component.css']
})
export class ViewAssetsComponent implements OnInit {

  public displayedColumns =  ["assetid", "assetcode","assettypename", "outlettypename", "manufacturername", "serialnumber", "modelnumber","sentinel","healthcare", "organisationname", "buildingname", "departmentname", "floorname", "assetlocationdetails", "assetroomdetails", "assetcomment"];
  public dataSource = new MatTableDataSource<Assets>();


  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  ngOnInit() {
    this.getAllAssets();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getAllAssets = () => {
    this.assetsService.findAssets()
    .subscribe(res => {
      this.dataSource.data = res as Assets[];
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  constructor(private assetsService: AssetsService) {}




}1 