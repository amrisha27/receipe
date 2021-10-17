import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription, Observable } from "rxjs";
import * as fromApp from "../store/app.reducer";
import * as SLActions from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private igChange: Subscription;                    required for old approach

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    //==============
    //New ngRx approach
    //==============

    this.ingredients = this.store.select("shoppingList");

    //==============
    //Old rxjs approach
    //==============
    // this.ingredients = this.slService.getIngredients();
    // this.igChange = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    // this.slService.editing.next(index);          old code

    this.store.dispatch(new SLActions.StartEdit(index));
  }

  //old approach
  // ngOnDestroy() {
  //   this.igChange.unsubscribe();
  // }
}
