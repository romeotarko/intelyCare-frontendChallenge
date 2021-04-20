import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit,OnChanges,OnDestroy {
  usernameOrPasswordIncorrect = false;
  angForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {
    console.log("component destroy");
  }

  ngOnInit(): void {
    console.log("component init");

  }

  createForm() {
    this.angForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async loginUser(event) {
    console.log(this.angForm);
    event.preventDefault();
    const target = event.target;
  //  const username = target.querySelector("#username").value;
    const username= this.angForm.value.username;
   // const password = target.querySelector("#password").value;
    const password= this.angForm.value.password;

    await this.userService
      .login(username, password)
      .then((data) => this.router.navigate(["/calendar"]))
      .catch((error) => {
        this.usernameOrPasswordIncorrect = true;
  
      });
  }
}
