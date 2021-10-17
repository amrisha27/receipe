import { Component, OnInit, OnDestroy } from "@angular/core";

import { Recipe } from "../recipe.model";
// import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
// import * as RecipesAction from "../store/recipe.actions";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;
  constructor(
    // private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.recipeSubscription = this.store
      .select("recipe")
      .pipe(map((recipeState) => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    // this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
