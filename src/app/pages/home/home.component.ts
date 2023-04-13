import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';
import { BasketService } from 'src/app/services/basket/basket.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  tasks: ITodo[] = [];
  doneTasks: ITodo[] = [];
  urgentTasks: ITodo[] = [];
  otherTasks: ITodo[] = [];
  // submitted = false;
  

  constructor(private basketService: BasketService, private router: Router) { }

  ngOnInit(): void {
    // this.tasks = this.basketService.getTasks();
    this.basketService.getTasks().subscribe((tasks: ITodo[]) => {
      this.tasks = tasks;
    });
    this.doneTasks = this.basketService.getDoneTasks();
    this.basketService.getTasks().subscribe((tasks: ITodo[]) => {
      tasks.forEach(task => {
        if (task.isUrgent) {
          this.urgentTasks.push(task);
        } else {
          this.otherTasks.push(task);
        }
      });
    });
  }

  // onSubmit() {
  //   this.submitted = true;
  // }

  toggleDone(task: ITodo) {
    task.doneDate = new Date();
  if (task.doneDate) {
    this.basketService.saveTasks();
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.doneTasks.push(task);
    }
  }

  if (this.tasks.length === 0) {
    // enregistrer les modifications dans le service
    this.doneTasks = this.basketService.getDoneTasks();
    // rediriger vers la page Historical
    // this.router.navigate(['/historical']);
  }
  }


}
  