import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'todo',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('../create/create.module').then(m => m.CreatePageModule)
      },
      {
        path: '',
        redirectTo: '/todo/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/todo/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
