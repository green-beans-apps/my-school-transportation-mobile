import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  students: any[] = []

  constructor() { }

  ngOnInit() {
  }

  activeButton: string | null = "todos";

  setActiveButton(button: string): void {
    this.activeButton = button === this.activeButton ? null : button;
  }
}
