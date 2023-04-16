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

  tasks: ITodo[] = [];

  constructor(private historicalService: BasketService) {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
    this.tasks = JSON.parse(tasks);
    }
   }

  ngOnInit() {
    this.tasks = this.historicalService.getDoneTasks();
  }

  toggleDone(task: ITodo) {
    task.doneDate = task.doneDate ? null : new Date();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.findIndex((t: ITodo) => t.id === task.id);
    if (index > -1) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}
