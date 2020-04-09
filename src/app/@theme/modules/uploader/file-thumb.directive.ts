import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {genImageUrl} from '../../../@core/core/utils';
import {fileToBase64} from '../../../utils/utils';

/**
 * 创建缩略图
 */
@Directive({selector: '[weui-thumb]'})
export class FileThumbDirective implements OnChanges {
  /**
   * 文件对象，必填项
   */
  @Input('weui-thumb') file: File;

  constructor(private el: ElementRef) {
  }

  private render() {
    fileToBase64(this.file, (url) => {
      this.el.nativeElement.style.backgroundImage = `url(${url})`;
    });
  }

  ngOnChanges(): void {
    this.render();
  }
}
