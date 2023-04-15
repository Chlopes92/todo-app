import { Component } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';
import { BasketService } from 'src/app/services/basket/basket.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent {

  doneTasks: ITodo[] = [];

  constructor(private historicalService: BasketService) { }

  ngOnInit() {
    this.doneTasks = this.historicalService.getDoneTasks();
  }

  
}
