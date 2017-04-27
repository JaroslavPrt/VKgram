import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[bodyScroll]'
})
export class BodyScrollDirective {

    @Input() alpha: number;
    @Output() isAlpha = new EventEmitter();

    private _body;

    constructor() {
        this._body = document.getElementsByTagName('body')[0];
    }

    @HostListener('window:scroll') onScroll() {
        let currentAlpha = this._body.scrollHeight - this._body.scrollTop
        if (currentAlpha > this.alpha) return;
        this.isAlpha.emit();
    }
}
