import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // To prevent the hide of the loader when one is still waiting and the other hide it.
  // So the loader hide only when all hide id
  private semaphore = 0;

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  show(){
    if (this.semaphore == 0)
      this.spinner.show();
    this.semaphore++;
  }

  hide(){
    this.semaphore--;
    if (this.semaphore == 0)
      this.spinner.hide();
  }
}
