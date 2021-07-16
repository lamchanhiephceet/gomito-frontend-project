import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attachment} from '../../attachment';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AttachmentService {


  constructor(private httpClient: HttpClient,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
  }

  getAttachment(id: number): Observable<Attachment[]> {
    return this.httpClient.get<Attachment[]>(' http://localhost:8080/api/cards/attachment/' + id);
  }

  createAttachment(newAttachment: Attachment): Observable<Attachment> {
    return this.httpClient.post<Attachment>('http://localhost:8080/api/attachments/', newAttachment);
  }

  editAttachment(editAttachment: Attachment): Observable<Attachment> {
    return this.httpClient.put<Attachment>('http://localhost:8080/api/attachments/update', editAttachment);
  }

  deleteAttachment(id: number): Observable<Attachment> {
    return this.httpClient.delete<Attachment>
    ('http://localhost:8080/api/attachments/delete/' + id);
  }

}


