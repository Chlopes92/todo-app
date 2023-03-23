import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

 constructor(private router: Router){}

 get isHomePage(): boolean{
  return this.router.url === '/';
 }

 get isTasksPage(): boolean {
  return this.router.url === '/tasks';
}

get isHistoricalPage(): boolean {
  return this.router.url === '/historical';
}

}
