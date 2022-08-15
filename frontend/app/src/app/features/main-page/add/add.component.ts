import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/core/services/item.service';
import { AddNewItemRequestViewModel } from 'src/app/shared/models/AddNewItemRequestViewModel';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  form = new FormGroup({
    itemName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photoUrl: new FormControl('', Validators.required),
    price: new FormControl(1, Validators.required),
  });

  constructor(private itemService: ItemService) {}

  addItem() {
    if (this.form.valid) {
      const item = this.form.getRawValue() as AddNewItemRequestViewModel;
      this.itemService.addNewItem(item).subscribe();
    }
  }
}
