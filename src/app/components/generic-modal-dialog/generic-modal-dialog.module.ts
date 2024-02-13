import { CommonModule } from "@angular/common";
import { GenericModalDialogComponent } from "./generic-modal-dialog.component";
import { NgModule } from "@angular/core";


@NgModule({
  declarations: [GenericModalDialogComponent],
  imports: [CommonModule],
  exports: [GenericModalDialogComponent],
})
export class GenericModalDialogModule { }