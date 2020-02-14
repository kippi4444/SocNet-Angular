import {Component, EventEmitter,  Output} from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {DomSanitizer} from '@angular/platform-browser';




@Component({
  selector: 'app-drag-drop-upload',
  templateUrl: './drag-drop-upload.component.html',
  styleUrls: ['./drag-drop-upload.component.scss']
})
export class DragDropUploadComponent {
  @Output()  upload: EventEmitter<object> = new EventEmitter<object>();

  uploadData: any = [];
  public files: NgxFileDropEntry[] = [];
  src: string[] ;
 constructor(private sanitizer: DomSanitizer){}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData = new FormData();
    const src = [];
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
           formData.append(`uploadedImages`, file, file.name);
           src.push(URL.createObjectURL(file));
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    this.src = src;
    this.uploadData = formData;
  }

  deleteAttachment(index) {
    this.src.splice(index, 1);
    this.files.splice(index, 1);
  }

  onSubmit() {
    this.upload.emit(this.uploadData);
    this.files = null;
  }

  imgPreview(file) {
    return this.sanitizer.bypassSecurityTrustUrl(file);
  }

}





