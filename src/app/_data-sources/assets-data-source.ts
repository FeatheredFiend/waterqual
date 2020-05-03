import { Assets } from "../_models";
import { catchError, finalize } from "rxjs/operators";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { AssetsService } from "../_services";

export class AssetsDataSource implements DataSource<Assets> {
    
  private assetsSubject = new BehaviorSubject<Assets[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private assetsService: AssetsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Assets[]> {
    return this.assetsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.assetsSubject.complete();
    this.loadingSubject.complete();
  }

  loadAssets(sort = "assetid", order = "ASC", page = 0) {

    this.loadingSubject.next(true);

    this.assetsService
      .findAssets(sort, order, page)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(assets => this.assetsSubject.next(assets));
  }

  
}