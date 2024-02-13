import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-modal-dialog',
  templateUrl: './generic-modal-dialog.component.html',
  styleUrls: ['./generic-modal-dialog.component.scss'],
})
export class GenericModalDialogComponent  implements OnInit {

  @Input()
  title: string = "Generic Modal Dialog"

  @Output()
  confirmPopUp = new EventEmitter<null>()

  @Output()
  cancelPopUp = new EventEmitter<null>()
  
  constructor() {}

  ngOnInit() {

  }

  confirm() {
    this.confirmPopUp.emit(null)
  }

  cancel() {
    this.cancelPopUp.emit(null)
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
