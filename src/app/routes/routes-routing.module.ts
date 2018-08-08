import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDashboardComponent } from '../my-dashboard/my-dashboard.component';
import { CryptotableComponent } from '../cryptotable/cryptotable.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: MyDashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'stock-picker',
    component: CryptotableComponent,
    data: { title: 'Which stocks to track?' }
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
