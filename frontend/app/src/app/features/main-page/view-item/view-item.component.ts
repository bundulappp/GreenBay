import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ItemService } from 'src/app/core/services/item.service';
import { InvoiceDialogComponent } from 'src/app/shared/invoice-dialog/invoice-dialog.component';
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
    const dialog = this.dialog.open(InvoiceDialogComponent);

    dialog.afterClosed().subscribe((x) => {
      console.log(x);
    });
  }

  backToMain(): void {
    this.router.navigate(['/main/list']);
  }

  setItemStatus(): void {
    this.itemService.setItemSalability(this.itemData.id).subscribe(() => {
      this.backToMain();
    });
  }

  buyItem(): void {
    this.itemService.buyItem(this.itemData.id).subscribe();
  }
}
