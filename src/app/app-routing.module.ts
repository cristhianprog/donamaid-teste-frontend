import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CollaboratorComponent } from './pages/collaborator/collaborator.component';


const routes: Routes = [
  {path: '',redirectTo: 'colaborador/1', pathMatch: 'full'},
  {path: 'colaborador/:id', component: CollaboratorComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
