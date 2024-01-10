import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";
@Directive({
    selector: '[scrollDirective]',
    standalone: true
})
export class ScrollDirective {

    @Output('scrollBottomParent') scrollBottomParent: EventEmitter<boolean> = new EventEmitter();
    @Output('scrollBottom') scrollBottom: EventEmitter<boolean> = new EventEmitter();
    @Output('scrollUp') scrollUp: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private el: ElementRef<HTMLElement>
    ) { }

    ngAfterViewInit() {
        let parentHtml = this.el.nativeElement.parentElement;
        if (parentHtml)
            this.setScroll(parentHtml, this.scrollBottomParent);
        
        let htmlEl = this.el.nativeElement;
        if (htmlEl) 
            this.setScroll(htmlEl, this.scrollBottom, this.scrollUp);
    }

    setScroll(element: HTMLElement, eventBottom: EventEmitter<boolean>, eventUp?: EventEmitter<boolean>){
        element.onscroll = () => {
            if (element.offsetHeight + element.scrollTop >= element.scrollHeight - 1) {
                eventBottom.emit(true);
            }
            if (element.scrollTop <= 0){
                eventUp?.emit(true);
            }
        };
    }
}
