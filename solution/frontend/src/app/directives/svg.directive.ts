import { Directive, ElementRef, Input, SimpleChanges } from "@angular/core";
import axios from "axios";

@Directive({
    selector: '[svg]',
    standalone: true
})
export class SvgDirective {

    @Input('svg') svgName: string;
    @Input('svgFolder') svgFolder: string = 'icons';

    constructor(
        private el: ElementRef<HTMLElement>
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['svgName']) {
            axios.get<string>(`assets/${this.svgFolder}/${this.svgName}.svg`).then(x => {
                let parent = this.el.nativeElement;
                parent.innerHTML = x.data;
                let svg = parent.getElementsByTagName('svg')[0];
                let classes: any = parent.classList;
                let classList = [...classes];
                svg.classList.add(...classList);
                console.log('SVG');
            });
        }
    }
}
