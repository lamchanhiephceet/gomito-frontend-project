import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListModel} from '../models/list-model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) {}

  creatList(newList: ListModel): Observable<ListModel>{
    console.log(newList);
    return this.httpClient.post<ListModel>(this.baseUrl + 'api/lists/', newList);
  }

  editList(updateList: ListModel): Observable<ListModel>{
    console.log('check4: ' + updateList);
    return this.httpClient.put<ListModel>(this.baseUrl + 'api/lists/update/', updateList);
  }

  // @ts-ignore
  getListList(id: number): Observable<ListModel[]>{
    return this.httpClient.get<ListModel[]>(this.baseUrl + 'api/boards/' + id);
  }

  updateIndex(data: ListModel[]): Observable<any> {
    const updateLists: ListModel[] = [];
    for (const list of data){
      const newList: ListModel = {
        listId: list.listId,
        listIndex: data.indexOf(list) + 1
      };
      updateLists.push(newList);
    }
    console.log(updateLists);
    return this.httpClient.post(this.baseUrl + 'api/lists/updateIndex', updateLists);
  }


}
