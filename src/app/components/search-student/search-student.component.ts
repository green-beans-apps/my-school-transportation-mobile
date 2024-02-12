import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { fildsSearch } from './fildsSearch';
import { searchStudentForm } from './searchStudentForm';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.scss'],
})
export class SearchStudentComponent  implements OnInit {

  protected fildsType = fildsSearch

  private formBuilderService = inject(NonNullableFormBuilder)

  protected searchStudentForm = this.formBuilderService.group({
    fild: [fildsSearch.NAME],
    value: ['']
  })

  @Output()
  searchStudent = new EventEmitter<{searshStudentForm: searchStudentForm}>()

  constructor() { }

  ngOnInit() {
    this.searchStudentForm.patchValue({
      fild: fildsSearch.NAME,
      value: ''
    })
    this.searchStudentForm.valueChanges.subscribe((value) => {
      this.search()
    })
  }

  search() {
    this.searchStudent.emit({searshStudentForm: {
      fild: this.searchStudentForm.value.fild ?? fildsSearch.NAME,
      value: this.searchStudentForm.value.value ?? ""
    }})
  }

}
