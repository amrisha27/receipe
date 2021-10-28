import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private storeSubscription: Subscription;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSubscription = this.store
      .select("auth")
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.AuthService.signin(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      // authObs = this.AuthService.signup(email, password);
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }

    // authObs.subscribe(
    //   (responseData) => {
    //     console.log(responseData);
    //     this.isLoading = false;
    //     this.router.navigate(["/recipes"]);
    //   },
    //   (errorMsg) => {
    //     console.log(errorMsg);
    //     this.error = errorMsg;
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.HandleError());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
