import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Todo } from '../interface/todo';
import { TodoService } from '../service/todo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: 'create.page.html',
  styleUrls: ['create.page.scss']
})
export class CreatePage {
  
  title:string = 'Crear ToDo';
  buttonForm:string = 'Crear ToDo';
  isEdit:boolean = false;
  todo: Todo = {
    title: '',
    subtitle: '',
    description: '',
    statu: 1 // Default value for status
  };

  constructor(
    private loadingController: LoadingController,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ionViewWillEnter(){
    this.route.params.subscribe(params => {
      this.title = 'Crear ToDo';
      this.buttonForm = 'Crear ToDo';
      this.isEdit = false;
      if (Object.keys(params).length > 0) {
        
        this._getDetail(params['id']);
      }
    });
  }

  private async _getDetail(id:any) {
    
    const loading = await this.loadingController.create({
      message: 'Cargando todo...',
    });
    await loading.present();

    this.todoService.getById(id).subscribe(todo => {
      this.todo = todo;
      this.title = 'Editar ToDo: ' + todo.title;
      this.buttonForm = 'Editar ToDo';
      this.isEdit = true;
      loading.dismiss();
    });
  }

  async submit() {
    try {
      var textLoading = 'Guardando ToDo';
      if(this.isEdit){
        textLoading = 'Editando ToDo';
      }

      const loading = await this.loadingController.create({
        message: textLoading,
      });
      await loading.present();

      if(this.isEdit){
        this.todoService.update(this.todo._id,this.todo).subscribe(todo => {
          loading.dismiss();
          this.router.navigate(['/todo/list']);
        });
      }
      else{

        this.todoService.save(this.todo).subscribe(todo => {
          loading.dismiss();
          this.router.navigate(['/todo/list']);
        });
      }
    } catch (error) {
      await this.showAlert('Error', 'There was an error creating the todo');
      console.error(error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}