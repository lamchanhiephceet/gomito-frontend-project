import {Component, Inject, Input, OnInit} from '@angular/core';
import {AttachmentService} from '../service/attachment.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Attachment} from '../../attachment';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.css']
})
export class AddAttachmentComponent implements OnInit {
  @Input() items: Attachment[];
  imgSrc: string;
  selectedImage: any = null;
  updated = false;

  constructor(private attachment: AttachmentService,
              private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public data: {
                attach: Attachment;
                cardId: number
              }) { }

  ngOnInit(): void {
    // this.getAllAttachmentList();
  }

  submit(): void{
    if (this.selectedImage !== null){
      // console.log(this.selectedImage.name);
      // console.log(this.selectedImage.name.split('.'));
      const fileName = this.selectedImage.name.split('.');
      // console.log(fileName[fileName.length - 1]);
      // console.log(this.selectedImage.name.split('.').slice(0, -1));
      // console.log(this.selectedImage.name.split('.').slice(0, -1).join('.'));
      const filePath = `attachment/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}.${fileName[fileName.length - 1]}`;
      const fileRef = this.storage.ref(filePath);
      const $this = this;
      const attName = this.selectedImage.name;
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( url => {
            this.imgSrc = url;
            const createAttachment: Attachment = {
              attachmentUrl: url,
              attachmentName: attName,
              cardId: $this.data.cardId
            };
            $this.attachment.createAttachment(createAttachment).subscribe(result => {
              console.log('update ava ok');
              this.data.attach = result;
              this.updated = true;
            });
          });
        })
      ).subscribe();
    }
  }


  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
    } else {
      this.imgSrc = 'https://civilcode.ge/images/2/24/Blank-avatar.png';
      this.selectedImage = null;
    }
  }

  // tslint:disable-next-line:typedef
  getAllAttachmentList(){
    this.attachment.getAttachment(this.data.cardId).subscribe(data => {
        this.items = data;
    });
  }
  // tslint:disable-next-line:typedef
  updateSuccess() {
    confirm('Update Success');
  }
}
