import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[bodyScroll]'
})
export class BodyScrollDirective {

    @Output() isAlpha = new EventEmitter();

    private _body;

    constructor() {
        this._body = document.getElementsByTagName('body')[0];
    }

    @HostListener('window:scroll') onScroll() {
        let scrollTop = this._body.scrollTop || document.documentElement.scrollTop;
        if (this._body.scrollHeight > (scrollTop + screen.height)) return;
        this.isAlpha.emit();
    }
}
