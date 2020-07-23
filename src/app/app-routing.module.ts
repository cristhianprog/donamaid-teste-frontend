import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaboratorsComponent } from './pages/collaborators/collaborators.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path: '',redirectTo: 'colaborador/1', pathMatch: 'full'},
  {path: 'colaborador/:id', component: CollaboratorsComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
