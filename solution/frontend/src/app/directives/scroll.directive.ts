import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";
@Directive({
    selector: '[scrollBottom]',
    standalone: true
})
export class ScrollDirective {

    @Output('scrollBottom') scrollBottom: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private el: ElementRef<HTMLElement>
    ) { }

    ngAfterViewInit() {
        // Works only with parent scroll conteiner
        let htmlEl = this.el.nativeElement.parentElement!;
        if (!htmlEl) return;

        htmlEl.onscroll = () => {
            if (htmlEl.offsetHeight + htmlEl.scrollTop >= htmlEl.scrollHeight - 1) {
                this.scrollBottom.emit(true);
            }
        };
    }
}
