import { Component } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';
import { BasketService } from 'src/app/services/basket/basket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent {

  doneTasks: ITodo[] = [];

  constructor(private historicalService: BasketService) {
    const doneTasks = localStorage.getItem('doneTasks');
    if (doneTasks) {
    this.doneTasks = JSON.parse(doneTasks);
    }
   }

  ngOnInit() {
    this.doneTasks = this.historicalService.getDoneTasks();
  }

  toggleDone(task: ITodo) {
    task.doneDate = task.doneDate ? null : new Date();
    const doneTasks = JSON.parse(localStorage.getItem('doneTasks') || '[]');
    const index = doneTasks.findIndex((t: ITodo) => t.id === task.id);
    if (index > -1) {
      doneTasks[index] = task;
    } else {
      doneTasks.push(task);
    }
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }

}
