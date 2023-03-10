import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [SidebarComponent],
})
export class SharedModule {}
