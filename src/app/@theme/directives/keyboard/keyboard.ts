import {Directive, OnDestroy, OnInit} from '@angular/core';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {Subscription} from 'rxjs';
import {Platform} from '@ionic/angular';

@Directive({
  selector: '[appKeyboardFix]'
})
export class KeyboardFixDirective implements OnInit, OnDestroy {
  private onShowSubscription: Subscription;

  constructor(
    private keyboard: Keyboard,
    private platform: Platform
  ) {
  }

  ngOnInit() {
    if (this.platform.is('cordova') && this.platform.is('ios')) {
      this.onShowSubscription = this.keyboard.onKeyboardShow()
        .subscribe(e => this.onShowKeyboard(e));
    }
  }

  ngOnDestroy() {
    if (this.onShowSubscription) {
      this.onShowSubscription.unsubscribe();
    }
  }

  private onShowKeyboard(e) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }
}
