import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

type IconType = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    showClass: {
      popup: '',
      backdrop: '',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: '',
      backdrop: '',
      icon: 'swal2-icon-hide'
    },
    onOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  private info = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    showClass: {
      popup: '',
      backdrop: '',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: '',
      backdrop: '',
      icon: 'swal2-icon-hide'
    }
  });

  constructor(private translateService: TranslateService) {}

  public viewMsg(titleText: string, icon: IconType) {
    const title = this.translateTitle(titleText) || titleText;
    this.toast.fire({
      icon,
      title
    });
  }

  public viewInfo(titleText: string, icon: IconType) {
    const title = this.translateTitle(titleText) || titleText;
    this.info.fire({
      icon,
      title
    });
  }

  private translateTitle(text: string): string {
    let title: string;
    this.translateService.get(text).subscribe((data: string) => (title = data));
    return title || null;
  }
}
