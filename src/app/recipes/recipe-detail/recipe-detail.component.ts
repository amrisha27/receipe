import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import * as fromApp from "../../store/app.reducer";
import * as RecipesAction from "../store/recipe.actions";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    //   this.recipe = this.recipeService.getRecipe(this.id);
    // });

    this.route.params
      .pipe(
        map((params) => {
          return +params["id"];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select("recipe");
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    console.log(this.recipe.ingredients);
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesAction.DeleteRecipe(this.id));
    this.router.navigate([""]);
  }
}
