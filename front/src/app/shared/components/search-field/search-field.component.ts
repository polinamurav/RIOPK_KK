import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements AfterViewInit {
  @Input() placeholder: string = 'SearchBar.Search.Main';
  @Input() searchValue: string;
  @Input() isLargeField: boolean = false;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() clearEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    if (this.searchValue) {
      this.searchInput.nativeElement.value = this.searchValue;
    }
  }

  onSearchClick(inputValue: string) {
    this.searchEvent.emit(inputValue);
  }

  onClearBtnClick(inputVal: string) {
    if (!!inputVal) {
      this.clearEvent.emit(true);
    }
  }
}
