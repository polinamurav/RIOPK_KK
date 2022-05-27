import { NgModule } from '@angular/core';
import { UnderChecklistComponent } from './under-checklist-component/under-checklist.component';
import { UnderChecklistParentComponent } from './under-checklist-parent.component';
import { UnderChecklistRoutingModule } from './under-checklist-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [UnderChecklistRoutingModule, SharedModule],
  declarations: [UnderChecklistParentComponent, UnderChecklistComponent]
})
export class UnderChecklistModule {}
