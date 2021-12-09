import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysesPage } from './analyses.page';

const routes: Routes = [
  {
    path: '',
    component: AnalysesPage,
  },
  {
    path: 'add-analyse',
    loadChildren: () =>
      import('./add-analyse/add-analyse.module').then(
        (m) => m.AddAnalysePageModule
      ),
  },
  {
    path: 'update-analyse',
    loadChildren: () =>
      import('./update-analyse/update-analyse.module').then(
        (m) => m.UpdateAnalysePageModule
      ),
  },
  {
    path: 'add-services-analyse',
    loadChildren: () =>
      import('./add-services-analyse/add-services-analyse.module').then(
        (m) => m.AddServicesAnalysePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysesPageRoutingModule {}
