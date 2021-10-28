import { Injectable } from "@angular/core";
// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
// import { Router } from "@angular/router";
// import { catchError, tap } from "rxjs/operators";
// import { throwError, BehaviorSubject } from "rxjs";

// import { User } from "./User.model";
// import { environment } from "../../environments/environment";
import * as fromApp from "../store/app.reducer";
import * as authAction from "./store/auth.actions";

// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({ providedIn: "root" })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  // signup(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
  //         environment.fireBaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuth(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // signin(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  //         environment.fireBaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuth(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     password: string;
  //     _token: string;
  //     _tokenExpire: string;
  //   } = JSON.parse(localStorage.getItem("userData"));
  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.password,
  //     userData._token,
  //     new Date(userData._tokenExpire)
  //   );

  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);              old code
  //     this.store.dispatch(
  //       new authAction.AuthSuccess({
  //         email: loadedUser.email,
  //         localId: loadedUser.password,
  //         idToken: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpire),
  //       })
  //     );
  //     const time =
  //       new Date(userData._tokenExpire).getTime() - new Date().getTime();
  //     this.autoLogout(time);
  //   }
  // }

  SetLogoutTimer(expirationTimer: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(new authAction.Logout());
    }, expirationTimer);
  }

  clearLogoutTimer() {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }

  // logout() {
  //   // this.user.next(null);     old code
  //   this.store.dispatch(new authAction.Logout());

  //   localStorage.removeItem("userData");
  // }

  // private handleAuth(
  //   email: string,
  //   localId: string,
  //   idToken: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, localId, idToken, expirationDate);
  //   // this.user.next(user);         old code
  //   this.store.dispatch(
  //     new authAction.AuthSuccess({
  //       email: email,
  //       localId: localId,
  //       idToken: idToken,
  //       expirationDate: expirationDate,
  //     })
  //   );
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem("userData", JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMsg = "An error occured!";
  //   if (!errorRes.error.error || !errorRes.error) {
  //     return throwError(errorMsg);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case "EMAIL_EXISTS":
  //       errorMsg = "This Email Exists Already";
  //       break;
  //     case "EMAIL_NOT_FOUND":
  //       errorMsg = "Invaild email or password";
  //       break;
  //     case "INVALID_PASSWORD":
  //       errorMsg = "Invaild email or password";
  //       break;
  //   }
  //   return throwError(errorMsg);
  // }
}
