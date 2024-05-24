import { Component } from '@angular/core';
import { Todo } from '../interface/todo';
import { TodoService } from '../service/todo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  todos: Todo[] = [];

  constructor(
    private loadingController: LoadingController,private todoService: TodoService) { }

  ionViewWillEnter(){
    this._getAll();
  }

  private async _getAll() {

    const loading = await this.loadingController.create({
      message: 'Loading todos...',
    });
    await loading.present();

    this.todoService.getAll().subscribe(todos => {
      this.todos = todos;
      loading.dismiss();
    });
  }
}