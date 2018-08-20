import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      // hideRequired: false,
      // floatLabel: 'auto',
      symbol: '',
      interval:'30m',
      limit: '50',
    });
  }
  ngOnInit() {

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.options.value);
  }
}
