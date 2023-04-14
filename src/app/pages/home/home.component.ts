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
    if (task.doneDate) {
      // Si doneDate existe, la tâche est terminée
      task.doneDate = null;
      this.basketService.saveTasks();
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        // On n'ajoute pas la tâche à la liste des tâches terminées ici
        // car elle ne doit plus apparaître dans l'interface utilisateur
      }
    } else {
      // Si doneDate n'existe pas, la tâche est en cours
      task.doneDate = new Date();
    }
  
    // Parcours toutes les tâches et met à jour celles qui sont terminées
    for (const t of this.tasks) {
      if (t.doneDate) {
        const index = this.doneTasks.findIndex(dt => dt.id === t.id);
        if (index === -1) {
          this.doneTasks.push(t);
        }
      } else {
        const index = this.doneTasks.findIndex(dt => dt.id === t.id);
        if (index !== -1) {
          this.doneTasks.splice(index, 1);
        }
      }
    }
  
    // Enregistre les tâches mises à jour dans le localStorage
    this.basketService.saveTasks();
  
    if (this.tasks.length === 0) {
      this.doneTasks = this.basketService.getDoneTasks();
      // this.router.navigate(['/historical']);
    }
  }
  

}
  