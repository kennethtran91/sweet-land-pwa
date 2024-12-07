import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../shared/services/menu.service';
import { Drink } from '../../shared/models/drink-model.interface';

import { MockMenuService } from '../../shared/services/mock-menu.service';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent {
  drinks: Drink[] = [];
  drinkForm!: FormGroup;
  isEditing = false;
  editingDrinkId: string | null = null;

  displayedColumns = ['name', 'price', 'actions'];

  constructor(
    private fb: FormBuilder, 
    // private menuService: MenuService,
    private menuService: MockMenuService
  ) {}
  ngOnInit(): void {
    this.drinkForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
    });
    this.menuService.getDrinks().subscribe((drinks) => (this.drinks = drinks));
  }

  onSubmit(): void {
    if (this.drinkForm.valid) {
      const drink: Drink = this.drinkForm.value;

      if (this.isEditing && this.editingDrinkId) {
        this.menuService.updateDrink({ ...drink, id: this.editingDrinkId }).then(() => {
          this.resetForm();
        });
      } else {
        this.menuService.addDrink(drink).then(() => {
          this.resetForm();
        });
      }
    }
  }

  editDrink(drink: Drink): void {
    this.isEditing = true;
    this.editingDrinkId = drink.id;
    this.drinkForm.patchValue(drink);
  }

  deleteDrink(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        this.menuService.getDrinks().subscribe((currentMenu) => {
            const updatedMenu = currentMenu.filter(drink => drink.id !== id);
            this.menuService.updateMenu(updatedMenu).then(() => resolve());
        }, reject);
    });
  }

  resetForm(): void {
    this.drinkForm.reset();
    this.isEditing = false;
    this.editingDrinkId = null;
  }
}
