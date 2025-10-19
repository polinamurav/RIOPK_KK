import { BlacklistItem } from '@app/_models/api-models/blacklist-item';

export class Blacklist {
  active: boolean;
  blacklistComment: string;
  blacklistItem: BlacklistItem;
  blacklistItemValue: string;
  changedByUsername: string;
  created: string | Date;
  id: number;
  updated: string | Date;
}

export class BlacklistDto {
  active: boolean;
  blacklistComment: string;
  blacklistItem: BlacklistItem;
  blacklistItemValue: string;
  changedByUsername: string;
  created: string | Date;
  id: number;
  updated: string | Date;

  constructor(obj: Blacklist) {
    this.active = obj.active;
    this.blacklistComment = obj.blacklistComment;
    this.blacklistItem = obj.blacklistItem;
    this.blacklistItemValue = obj.blacklistItemValue;
    this.changedByUsername = obj.changedByUsername;
    this.created = obj.created;
    this.id = obj.id;
    this.updated = obj.updated;
  }
}

export class EmptyBlacklistDto {
  active: boolean = null;
  blacklistComment: string = null;
  blacklistItem: BlacklistItem = null;
  blacklistItemValue: string = null;
  changedByUsername: string = null;
  created: string | Date = null;
  id: number = null;
  updated: string | Date = null;
}
