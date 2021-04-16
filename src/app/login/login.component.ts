import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  emailData: Array<string> = ["romeo@gmail", "alket@gmail", "root"];
  passwordData: Array<string> = ["romeo123", "alket123", "root"];
  usernameOrPasswordIncorrect = false;
  angForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.angForm = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;

    if (
      this.emailData.includes(username) &&
      this.passwordData.includes(password)
    ) {
      this.router.navigate(["/calendar"]);
    } else {
      this.usernameOrPasswordIncorrect = true;
    }
  }
}
