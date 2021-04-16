import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usernameOrPasswordIncorrect = false;
  angForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.angForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;

    await this.userService
      .login(username, password)
      .then((data) => this.router.navigate(["/calendar"]))
      .catch((error) => {
        this.usernameOrPasswordIncorrect = true;
        console.error("error during login");
      });
  }
}
