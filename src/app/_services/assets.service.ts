import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Assets, AssetTypes } from "../_models";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const getAssetsUrl = "http://waterqual.proprietary-data.com/api/get_assets-all.php";
const addAssetsUrl = "http://waterqual.proprietary-data.com/api/register_asset.php";
const getOutletTypesUrl = "http://waterqual.proprietary-data.com/api/get_add_asset-outlet_type-cascade.php";
const getDepartmentsUrl = "http://waterqual.proprietary-data.com/api/get_add_asset-departments-cascade.php";



@Injectable({
  providedIn: "root"
})
export class AssetsService {
  constructor(private http: HttpClient) { }
  // default get page 1 and sort ascending by id column
  findAssets(_sort = "assetid", _order = "ASC", _page = 0): Observable<Assets[]> {
    return this.http
      .get(getAssetsUrl, {
        params: new HttpParams()
          .set("_sort", _sort)
          .set("_order", _order)
          .set("_page", _page.toString())
      })
      // use the map() operator to return the data property of the response object
      // the operator enables us to map the response of the Observable stream
      // to the data value
      .pipe(map(res => res as Assets[]));
  }

  public findOutletType(assettype) {
    return this.http.post<any>(getOutletTypesUrl, { assettype })
      .pipe(map(OutletTypes => {
        return OutletTypes;
      }));
  }

  public findDepartment( building) {
    return this.http.post<any>(getDepartmentsUrl, { building })
      .pipe(map(Departments => {
        return Departments;
      }));
  }

  public addAsset(assetcode, assettype, outlettype, manufacturer, serialnumber, modelnumber, sentinel, healthcare, organisation, building, department, floor, location, room, comment) {
    return this.http.post<any>(addAssetsUrl, { assetcode, assettype, outlettype, manufacturer, serialnumber, modelnumber, sentinel, healthcare, organisation, building, department, floor, location, room, comment })
      .pipe(map(Users => {
        return Users;
      }));
  }

}