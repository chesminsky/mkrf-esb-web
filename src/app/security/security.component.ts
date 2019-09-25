import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'esb-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  private form: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({

    });

    this.usersService.getUsers().subscribe(console.log);
  }

}
