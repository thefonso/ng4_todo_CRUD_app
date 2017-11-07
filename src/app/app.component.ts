import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {}

  // previously:
  // onAddTodo(todo) {
  //  this.todoDataService.addTodo(todo);
  // }
  onAddTodo(todo) {
    this.todoDataService.addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo: Todo) {
    this.todoDataService.toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  // rename from removeTodo
  onRemoveTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id)
      .subscribe(
        (_)  =>  {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

  // get todos(){
  //   return this.todoDataService.getAllTodos();
  // }
  // Now becomes a pub sub for Observables
  public ngOnInit() {
    this.todoDataService.getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

}
