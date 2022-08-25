import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ItemService } from 'src/app/core/services/item.service';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
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

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
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

  openDialog(): void {
    const dialog = this.dialog.open(ConfirmDialog, {
      data: {
        itemId: this.itemData.id,
      },
    });

    dialog.afterClosed().subscribe();
  }

  backToMain(): void {
    this.router.navigate(['/main/list']);
  }

  setItemStatus(): void {
    this.itemService.setItemSalability(this.itemData.id).subscribe(() => {
      this.backToMain();
    });
  }
}
