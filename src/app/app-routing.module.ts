import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgListComponent } from './ag-list/ag-list.component';
const routes: Routes = [
  {
    path: '', pathMatch: 'full',redirectTo:'agList'
  },{
    path: 'agList', component: AgListComponent, pathMatch: 'full', data: { title: 'List ' }
  }
];

export const routing =RouterModule.forRoot(routes,{
  useHash: false,
  scrollPositionRestoration : 'enabled'
})
