import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';
import { BasketService } from 'src/app/services/basket/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  tasks: ITodo[] = [];
  isFormFilled = false;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.tasks = this.basketService.getTasks();
  }
  

}
