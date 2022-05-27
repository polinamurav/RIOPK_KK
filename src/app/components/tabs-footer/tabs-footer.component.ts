import {
  ButtonEventType,
  CommentsButtonEventType,
  FooterButtonClick,
  FooterButtonConfig,
  TabFooterState
} from '@app/components/tabs-footer/constants/footer-buttons.model';
import { CommentDto, UserDto } from '@app/_models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GetTabsFooterConfigService } from '@app/components/tabs-footer/services/get-tabs-footer-config.service';
import {CredentialsService} from "@app/services/authentication";

@Component({
  selector: 'app-tabs-footer',
  templateUrl: './tabs-footer.component.html',
  styleUrls: ['./tabs-footer.component.scss']
})
export class TabsFooterComponent implements OnInit {
  tabFooterConfig: TabFooterState = null;
  footerButtons:FooterButtonConfig[] = null;

  // General buttons group
  @Input() configSrc: string;
  @Input() hideButtons: boolean;
  @Input() buttonsDisabled: boolean;
  @Input() isDeclineRoleAvailable: boolean;
  @Input() isRootItemTab?: boolean = true;

  // Comments logic
  @Input() userData: UserDto;
  @Input() commentList: { [key: string]: CommentDto[] };
  @Input() isNewMessageExists: boolean;
  @Input() commentsReadonly: boolean;

  @Output() footerButtonClick: EventEmitter<FooterButtonClick> = new EventEmitter<FooterButtonClick>();

  constructor(
    private footerConfigs: GetTabsFooterConfigService,
    private credentialsService: CredentialsService,
    ) {}

  ngOnInit(): void {
    const preConfig = {...this.footerConfigs.getFooterConfig(this.configSrc)};

    this.footerButtons = preConfig.footerButtons.filter(element => {
      if (element.visibleForRolesList) {
        return this.credentialsService.checkRoles(element.visibleForRolesList);
      }
      return true;
    });

    this.tabFooterConfig = {...this.footerConfigs.getFooterConfig(this.configSrc), footerButtons: this.footerButtons};
  }

  onButtonClick(event: MouseEvent | string, buttonTypeClicked: ButtonEventType | CommentsButtonEventType): void {
    this.footerButtonClick.emit({
      event,
      buttonTypeClicked
    });
  }

  hideFooterCondition(): boolean {
    if (!this.tabFooterConfig) {
      return false;
    }

    return !(this.hideButtons && !this.tabFooterConfig.showCommentsButton);
  }

  hideDeclineButtonCondition(eventType: ButtonEventType): boolean {
    if (eventType !== 'decline') {
      return true;
    }

    return this.isDeclineRoleAvailable;
  }

  isCommentSectionMultiple(): boolean {
    return this.tabFooterConfig.commentsConfig.length > 1;
  }
}
