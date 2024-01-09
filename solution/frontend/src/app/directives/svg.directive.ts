import { Directive, ElementRef, Input } from "@angular/core";
import axios from "axios";

@Directive({
    selector: '[svg]'
})
export class SvgDirective {

    @Input('svg') svgName: string;
    @Input('svgFolder') svgFolder: string = 'icons';

    constructor(
        private el: ElementRef<HTMLElement>
    ) { }

    ngAfterViewInit() {
        axios.get<string>(`assets/${this.svgFolder}/${this.svgName}.svg`).then(x => {
            let svg = document.createElement("svg");
            svg.innerHTML = x.data;
            let classes: any = this.el.nativeElement.classList;
            let classList = [...classes];
            svg.firstElementChild?.classList.add(...classList);
            this.el.nativeElement.replaceWith(svg.childNodes[0])
        });
    }
}
