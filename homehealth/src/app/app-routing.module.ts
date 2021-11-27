import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'connexion',
    loadChildren: () =>
      import('./pages/connexion/connexion.module').then(
        (m) => m.ConnexionPageModule
      ),
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./pages/inscription/inscription.module').then(
        (m) => m.InscriptionPageModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'company-builder',
    loadChildren: () =>
      import('./pages/company-builder/company-builder.module').then(
        (m) => m.CompanyBuilderPageModule
      ),
  },
  {
    path: 'add-service',
    loadChildren: () =>
      import('./modals/add-service/add-service.module').then(
        (m) => m.AddServicePageModule
      ),
  },
  {
    path: 'create-company-service',
    loadChildren: () =>
      import(
        './pages/create-company-service/create-company-service.module'
      ).then((m) => m.CreateCompanyServicePageModule),
  },
  {
    path: 'create-town',
    loadChildren: () =>
      import('./pages/create-town/create-town.module').then(
        (m) => m.CreateTownPageModule
      ),
  },
  {
    path: 'advices',
    loadChildren: () =>
      import('./pages/advices/advices.module').then((m) => m.AdvicesPageModule),
  },
  {
    path: 'add-advices',
    loadChildren: () =>
      import('./pages/add-advices/add-advices.module').then(
        (m) => m.AddAdvicesPageModule
      ),
  },
  {
    path: 'display-advices',
    loadChildren: () =>
      import('./modals/display-advices/display-advices.module').then(
        (m) => m.DisplayAdvicesPageModule
      ),
  },
  {
    path: 'laboratoire',
    loadChildren: () =>
      import('./pages/laboratoire/laboratoire.module').then(
        (m) => m.LaboratoirePageModule
      ),
  },
  {
    path: 'display-laboratoire',
    loadChildren: () =>
      import('./modals/display-laboratoire/display-laboratoire.module').then(
        (m) => m.DisplayLaboratoirePageModule
      ),
  },
  {
    path: 'create-advices-categorie',
    loadChildren: () =>
      import(
        './pages/create-advices-categorie/create-advices-categorie.module'
      ).then((m) => m.CreateAdvicesCategoriePageModule),
  },
  {
    path: 'medicament',
    loadChildren: () =>
      import('./pages/medicament/medicament.module').then(
        (m) => m.MedicamentPageModule
      ),
  },
  {
    path: 'create-medicament',
    loadChildren: () =>
      import('./modals/create-medicament/create-medicament.module').then(
        (m) => m.CreateMedicamentPageModule
      ),
  },
  {
    path: 'create-medocs-categorie',
    loadChildren: () => import('./modals/create-medocs-categorie/create-medocs-categorie.module').then( m => m.CreateMedocsCategoriePageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./pages/company/company.module').then( m => m.CompanyPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
