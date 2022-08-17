import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/services/item.service';
import { ItemDataViewModel } from 'src/app/shared/models/ItemDataViewModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  saleableItemList: ItemDataViewModel[];
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getAllSaleableItems().subscribe((x) => {
      this.saleableItemList = x;
      console.log(this.saleableItemList);
    });
  }
}
