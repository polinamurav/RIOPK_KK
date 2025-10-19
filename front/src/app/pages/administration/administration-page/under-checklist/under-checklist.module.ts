import { NgModule } from '@angular/core';
import { UnderChecklistComponent } from './under-checklist-component/under-checklist.component';
import { UnderChecklistParentComponent } from './under-checklist-parent.component';
import { UnderChecklistRoutingModule } from './under-checklist-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  imports: [UnderChecklistRoutingModule, ThemeModule],
  declarations: [UnderChecklistParentComponent, UnderChecklistComponent]
})
export class UnderChecklistModule {}
