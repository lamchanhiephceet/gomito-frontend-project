import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attachment} from '../../models/attachment';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  baseUrl = environment.baseUrl;


  constructor(private httpClient: HttpClient,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
  }

  getAttachment(id: number): Observable<Attachment[]> {
    return this.httpClient.get<Attachment[]>(this.baseUrl + 'api/cards/attachment/' + id);
  }

  createAttachment(newAttachment: Attachment): Observable<Attachment> {
    return this.httpClient.post<Attachment>(this.baseUrl + 'api/attachments/', newAttachment);
  }

  editAttachment(editAttachment: Attachment): Observable<Attachment> {
    return this.httpClient.put<Attachment>(this.baseUrl + 'api/attachments/update', editAttachment);
  }

  deleteAttachment(id: number): Observable<Attachment> {
    return this.httpClient.delete<Attachment>
    (this.baseUrl + 'api/attachments/delete/' + id);
  }

}


