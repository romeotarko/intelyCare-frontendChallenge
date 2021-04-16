import { Injectable } from "@angular/core";

interface User {
  username: String;
  password: String;
}

const DEFAULT_USERS: User[] = [
  { username: "admin", password: "admin" },
  { username: "guest", password: "guest" },
];

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  async login(username: String, password: String): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = DEFAULT_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  }
}
