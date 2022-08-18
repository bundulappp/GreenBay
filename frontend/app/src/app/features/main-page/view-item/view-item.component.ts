import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ItemService } from 'src/app/core/services/item.service';
import { ItemIsSelable } from 'src/app/shared/models/enums/ItemIsSellable';
import { ItemDataViewModel } from 'src/app/shared/models/ItemDataViewModel';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  itemData: ItemDataViewModel;
  isBelongToUser: boolean;
  ItemIsSelable = ItemIsSelable;
  checked: boolean;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.itemService.getItemData(params['id']).subscribe((x) => {
        this.itemData = x;
        if (this.authenticationService.getUsername() === x.sellersName) {
          this.isBelongToUser = true;
        } else {
          this.isBelongToUser = false;
        }
      });
    });
  }

  backToMain(): void {
    this.router.navigate(['/main/list']);
  }

  setItemStatus(): void {
    console.log('status');
  }
}
