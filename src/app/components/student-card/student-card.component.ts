import { Component, Input, OnInit } from '@angular/core';
import { shift } from 'src/app/entities/enums/shift';
import { transportationType } from 'src/app/entities/enums/transportationType';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent  implements OnInit {

  @Input()
  name: string = 'John Smith'
  @Input()
  payment: number = 0
  @Input()
  transportationType: string = 'IDA_E_VOLTA'
  @Input()
  shift: string = 'MANHA'

  constructor() { }

  ngOnInit() {}

}
