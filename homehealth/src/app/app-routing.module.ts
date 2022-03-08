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
    loadChildren: () =>
      import(
        './modals/create-medocs-categorie/create-medocs-categorie.module'
      ).then((m) => m.CreateMedocsCategoriePageModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./pages/company/company.module').then((m) => m.CompanyPageModule),
  },
  {
    path: 'pick-medicament',
    loadChildren: () =>
      import('./modals/pick-medicament/pick-medicament.module').then(
        (m) => m.PickMedicamentPageModule
      ),
  },
  {
    path: 'display-company',
    loadChildren: () =>
      import('./modals/display-company/display-company.module').then(
        (m) => m.DisplayCompanyPageModule
      ),
  },
  {
    path: 'analyses',
    loadChildren: () =>
      import('./pages/analyses/analyses.module').then(
        (m) => m.AnalysesPageModule
      ),
  },
  {
    path: 'company-admin',
    loadChildren: () =>
      import('./pages/company-admin/company-admin.module').then(
        (m) => m.CompanyAdminPageModule
      ),
  },
  {
    path: 'company-users',
    loadChildren: () =>
      import('./pages/company-users/company-users.module').then(
        (m) => m.CompanyUsersPageModule
      ),
  },
  {
    path: 'company-add-user',
    loadChildren: () =>
      import('./modals/company-add-user/company-add-user.module').then(
        (m) => m.CompanyAddUserPageModule
      ),
  },
  {
    path: 'display-company-service',
    loadChildren: () =>
      import(
        './company/display-company-service/display-company-service.module'
      ).then((m) => m.DisplayCompanyServicePageModule),
  },
  {
    path: 'pick-services',
    loadChildren: () =>
      import('./modals/pick-services/pick-services.module').then(
        (m) => m.PickServicesPageModule
      ),
  },
  {
    path: 'medicament-list',
    loadChildren: () =>
      import('./company/medicament-list/medicament-list.module').then(
        (m) => m.MedicamentListPageModule
      ),
  },
  {
    path: 'analyse-list',
    loadChildren: () =>
      import('./company/analyse-list/analyse-list.module').then(
        (m) => m.AnalyseListPageModule
      ),
  },
  {
    path: 'medicament-info',
    loadChildren: () =>
      import('./company/medicament-info/medicament-info.module').then(
        (m) => m.MedicamentInfoPageModule
      ),
  },
  {
    path: 'service-info',
    loadChildren: () =>
      import('./company/service-info/service-info.module').then(
        (m) => m.ServiceInfoPageModule
      ),
  },
  {
    path: 'analyse-info',
    loadChildren: () =>
      import('./company/analyse-info/analyse-info.module').then(
        (m) => m.AnalyseInfoPageModule
      ),
  },
  {
    path: 'pick-analyse',
    loadChildren: () =>
      import('./modals/pick-analyse/pick-analyse.module').then(
        (m) => m.PickAnalysePageModule
      ),
  },
  {
    path: 'pharmacie',
    loadChildren: () =>
      import('./pages/pharmacie/pharmacie.module').then(
        (m) => m.PharmaciePageModule
      ),
  },
  {
    path: 'hopital',
    loadChildren: () =>
      import('./pages/hopital/hopital.module').then((m) => m.HopitalPageModule),
  },
  {
    path: 'laboratoire-recherche',
    loadChildren: () =>
      import(
        './recherche/laboratoire-recherche/laboratoire-recherche.module'
      ).then((m) => m.LaboratoireRecherchePageModule),
  },
  {
    path: 'hopital-recherche',
    loadChildren: () =>
      import('./recherche/hopital-recherche/hopital-recherche.module').then(
        (m) => m.HopitalRecherchePageModule
      ),
  },
  {
    path: 'phamarcie-recherche',
    loadChildren: () =>
      import('./recherche/phamarcie-recherche/phamarcie-recherche.module').then(
        (m) => m.PhamarcieRecherchePageModule
      ),
  },
  {
    path: 'client-home',
    loadChildren: () =>
      import('./client/client-home/client-home.module').then(
        (m) => m.ClientHomePageModule
      ),
  },
  {
    path: 'inscription-company',
    loadChildren: () =>
      import('./pages/inscription-company/inscription-company.module').then(
        (m) => m.InscriptionCompanyPageModule
      ),
  },
  {
    path: 'prendre-rendezvous',
    loadChildren: () =>
      import('./modals/prendre-rendezvous/prendre-rendezvous.module').then(
        (m) => m.PrendreRendezvousPageModule
      ),
  },
  {
    path: 'user-home',
    loadChildren: () => import('./pages/user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'company-admin-rdv',
    loadChildren: () => import('./pages/company-admin-rdv/company-admin-rdv.module').then( m => m.CompanyAdminRdvPageModule)
  },
  {
    path: 'rendez-vous-details',
    loadChildren: () => import('./pages/rendez-vous-details/rendez-vous-details.module').then( m => m.RendezVousDetailsPageModule)
  },
  {
    path: 'company-admin-comm',
    loadChildren: () => import('./pages/company-admin-comm/company-admin-comm.module').then( m => m.CompanyAdminCommPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
