import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { BlacklistRoutingModule } from '@app/pages/administration/administration-page/blacklist/blacklist-routing.component.module';
import { BlacklistComponent } from '@app/pages/administration/administration-page/blacklist/blacklist.component';
import { BlacklistPageComponent } from '@app/pages/administration/administration-page/blacklist/blacklist-page/blacklist-page.component';

@NgModule({
  imports: [BlacklistRoutingModule, ThemeModule],
  declarations: [BlacklistComponent, BlacklistPageComponent],
  providers: []
})
export class BlacklistModule {}
