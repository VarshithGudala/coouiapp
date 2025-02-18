import { Routes } from '@angular/router';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { CatalogViewComponent } from './catalog-view/catalog-view.component';
import { CatalogEditComponent } from './catalog-edit/catalog-edit.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutusOurMissionComponent } from './aboutus-our-mission/aboutus-our-mission.component';
import { AboutusOurStoryComponent } from './aboutus-our-story/aboutus-our-story.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'customer', component: CustomerSearchComponent},
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: CatalogListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderSearchComponent },
  { path: 'order/:id', component: OrderSearchComponent },
  { path: 'customer', component: CustomerSearchComponent },
  { path: 'catalog/view/:id', component: CatalogViewComponent },
  { path: 'catalog/edit/:id', component: CatalogEditComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'aboutourmission', component: AboutusOurMissionComponent },
  { path: 'aboutourstory', component: AboutusOurStoryComponent },
  { path: 'new-order', component: CatalogListComponent },
 ];
