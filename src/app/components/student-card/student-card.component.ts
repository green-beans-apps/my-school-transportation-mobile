import { Component, Input, OnInit } from '@angular/core';
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
  transportationType: transportationType = transportationType.IDA_E_VOLTA
  @Input()
  shift: string = 'Manhã'

  constructor() { }

  ngOnInit() {}

}
