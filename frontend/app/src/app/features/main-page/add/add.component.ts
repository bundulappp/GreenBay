import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/core/services/item.service';
import { AddNewItemRequestViewModel } from 'src/app/shared/models/AddNewItemRequestViewModel';
import { ItemCategoryViewModel } from 'src/app/shared/models/ItemCategoryViewModel';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  categorys: ItemCategoryViewModel[] = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photoUrl: new FormControl('', Validators.required),
    price: new FormControl(1, Validators.required),
    category: new FormControl('', Validators.required),
  });

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.itemService.getAllCategories().subscribe((categ) => {
      this.categorys = categ;
    });
  }

  addItem() {
    if (this.form.valid) {
      const item = this.form.getRawValue() as AddNewItemRequestViewModel;
      this.itemService.addNewItem(item).subscribe();
    }
  }

  back(): void {
    this.router.navigate(['/main/list']);
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get photoUrl(): AbstractControl {
    return this.form.get('photoUrl');
  }
}
