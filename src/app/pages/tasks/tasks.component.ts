import { Component } from '@angular/core';
import { CategoryType, ITodo } from 'src/app/mocks/todo.mock';
// import { FormsModule } from '@angular/forms';
import { BasketService } from 'src/app/services/basket/basket.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  categories: CategoryType[] = ["🛍️", "💊️", "💼", "💸", "🧼", "🤷‍♀️"];
  selectedCategory: CategoryType | undefined;

  task: ITodo = {
    id: 0,
    content: '',
    category: ''as CategoryType,
    isUrgent: false,
    doneDate: new Date(),
    // doneDate: null,
    done: false, 
  };
  isButtonDisabled: boolean = true;
  isSelected: boolean = false;

  constructor(private basketService: BasketService) {this.isButtonDisabled = true}

  validateTask(): void {
    if (this.selectedCategory !== undefined && this.task.content  !== '') {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
    const taskData = {
      id: this.task.id,
      content: this.task.content,
      category: this.selectedCategory,
      isUrgent: this.task.isUrgent,
      doneDate: new Date(),
      done: this.task.done,
    };
    this.basketService.addTask(taskData);
    this.basketService.saveTasks();
    console.log(taskData);
  }

  selectCategory(category: CategoryType): void {
    this.selectedCategory = category;
    // this.validateTask();
    this.isSelected = true;
  }

}
