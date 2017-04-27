import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[bodyScroll]'
})
export class BodyScrollDirective {

    @Input() alpha: number;
    @Output() isAlpha = new EventEmitter();

    private _body;

    constructor(private _element: ElementRef) {
        this._body = document.getElementsByTagName('body')[0];
    }

    @HostListener('window:scroll') onScroll() {
        let scrollTop = this._body.scrollTop || document.documentElement.scrollTop;
        console.log('qw');
        if (this._body.scrollHeight > (scrollTop + screen.height)) return;
        this.isAlpha.emit();
    }
}
