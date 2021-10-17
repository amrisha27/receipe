import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as SLA from "../store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slform: NgForm;
  editsubs: Subscription;
  editmode = false;
  ItemForEdit: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.editsubs = this.store.select("shoppingList").subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editmode = true;
        this.ItemForEdit = stateData.editedIngredient;
        this.slform.setValue({
          name: this.ItemForEdit.name,
          amount: this.ItemForEdit.amount,
        });
      } else {
        this.editmode = false;
      }
    });

    //Old Approch

    // this.editsubs = this.slService.editing.subscribe((index: number) => {
    //   this.editmode = true;
    //   this.editingItem = index;
    //   this.ItemForEdit = this.slService.getIngredient(this.editingItem);
    //   this.slform.setValue({
    //     name: this.ItemForEdit.name,
    //     amount: this.ItemForEdit.amount,
    //   });
    // });
  }

  onAddItem(submittedForm) {
    const ingName = submittedForm.value.name;
    const ingAmount = submittedForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editmode) {
      // this.slService.updateIngredient(this.editingItem, newIngredient);          old code
      this.store.dispatch(new SLA.UpdateIngredients(newIngredient));
    } else {
      // this.slService.addIngredient(newIngredient);          old code

      this.store.dispatch(new SLA.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.slform.reset();
    this.editmode = false;
    this.store.dispatch(new SLA.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editingItem);  old code

    this.store.dispatch(new SLA.DeleteIngredients());

    this.onClear();
  }

  ngOnDestroy() {
    this.editsubs.unsubscribe();
    this.store.dispatch(new SLA.StopEdit());
  }
}
