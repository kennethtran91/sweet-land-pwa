import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../shared/services/menu.service';
import { Drink } from '../../shared/models/drink-model.interface';

// import { MockMenuService } from '../../shared/services/mock-menu.service';

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
    private menuService: MenuService
  ) {}
  ngOnInit(): void {
    this.drinkForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      image: ['']
    });
    this.menuService.getDrinks().subscribe((drinks) => (this.drinks = drinks));
  }

  loadDrinks() {
    this.menuService.getDrinks().subscribe({
      next: (data) => (this.drinks = data),
      error: (err) => console.error('Error fetching drinks:', err),
    });
  }

  onSubmit(): void {
    console.log(this.drinkForm.value);
    if (this.drinkForm.valid) {
      const drink: Drink = this.drinkForm.value;
  
      if (this.isEditing && this.editingDrinkId) {
        // Update existing drink
        this.menuService.updateDrink({ ...drink, id: this.editingDrinkId }).subscribe({
          next: () => {
            console.log('Drink updated successfully');
            this.resetForm();
            this.loadDrinks(); // Refresh the list
          },
          error: (err) => console.error('Error updating drink:', err),
        });
      } else {
        // Add new drink
        this.menuService.addDrink(drink).subscribe({
          next: () => {
            console.log('Drink added successfully');
            this.resetForm();
            this.loadDrinks(); // Refresh the list
          },
          error: (err) => console.error('Error adding drink:', err),
        });
      }
    }
  }
  

  editDrink(drink: Drink): void {
    this.isEditing = true;
    this.editingDrinkId = drink.id;
    this.drinkForm.patchValue(drink);
  }

  deleteDrink(drinkId: number) {
    this.menuService.deleteDrink(drinkId).subscribe({
      next: () => {
        console.log('Drink deleted successfully');
        this.loadDrinks(); // Refresh the list
      },
      error: (err) => console.error('Error deleting drink:', err),
    });
  }

  resetForm(): void {
    this.drinkForm.reset();
    this.isEditing = false;
    this.editingDrinkId = null;
  }
}
