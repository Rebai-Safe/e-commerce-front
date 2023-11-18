import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from '../model/file-handler.model';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandler> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee"
  constructor(private sanitizer: DomSanitizer) { }


  @HostListener("dragover", ["$event"])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee"
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";

    let fileHandle: FileHandler = null;

    const file = event.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))

    fileHandle = {file, url};
    this.files.emit(fileHandle);
  }
}
