import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [RegistrationRoutingModule, SharedModule, CommonModule],
})
export class RegistrationModule {}
