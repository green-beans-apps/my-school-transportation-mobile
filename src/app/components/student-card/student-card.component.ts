import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent  implements OnInit {

  @Input()
  name: string = 'John Smith'
  @Input()
  payment: string = '180'
  @Input()
  transportationType: string = 'ida & volta'
  @Input()
  shift: string = 'Manhã'

  constructor() { }

  ngOnInit() {}

}
