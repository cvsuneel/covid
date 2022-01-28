import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getFormUrlEncoded } from 'src/app/core/pipes/FormEncoder';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss']
})
export class Section1Component implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService,) { }

  ngOnInit(): void {
  }


  handle_getToken() {
    console.log("this.authService.getToken(): ", this.authService.getToken());
  }

}
