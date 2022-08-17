import { Component, Input, OnInit } from '@angular/core';
import { ItemDataViewModel } from 'src/app/shared/models/ItemDataViewModel';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemData: ItemDataViewModel;

  constructor() {}

  ngOnInit(): void {}
}
