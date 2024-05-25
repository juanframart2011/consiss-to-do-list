import { Component } from '@angular/core';
import { Todo } from '../interface/todo';
import { TodoService } from '../service/todo.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  todos: Todo[] = [];

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,private router: Router,private todoService: TodoService) { }

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

  async delete(todo:Todo){

    const alert = await this.alertController.create({
      header: 'Eliminar ToDo',
      message: '¿Deseas eliminar todo:'+todo.title+'?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'ELIMINAR',
          handler: () => {
            this.todoService.delete(todo._id).subscribe(() => {
              this._getAll();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  edit(id:any){

    this.router.navigate(['/todo/edit/'+id]);
  }
}