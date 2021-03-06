import {DOCUMENT} from '@angular/common';
import {ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector} from '@angular/core';
import {BaseService} from '../../core/utils';
import {Observable} from 'rxjs';
import {ActionSheetComponent} from './actionsheet.component';
import {ActionSheetConfig} from './actionsheet.config';

@Injectable({providedIn: 'root'})
export class ActionSheetService extends BaseService {
  constructor(
    resolver: ComponentFactoryResolver,
    applicationRef: ApplicationRef,
    injector: Injector,
    @Inject(DOCUMENT) doc: any,
  ) {
    super(resolver, applicationRef, injector, doc);
  }

  /**
   * 创建一个弹出式菜单并显示
   *
   * @param menus 菜单内容
   * @param config 配置性（可选）
   * @returns 可订阅来获取结果
   */
  show(menus: Array<{ text?: string; [key: string]: any }>, config: ActionSheetConfig = {}): Observable<any> {
    const componentRef = this.build(ActionSheetComponent);

    componentRef.instance.menus = menus;
    componentRef.instance.config = config;
    componentRef.instance.close.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    return componentRef.instance.show();
  }
}
