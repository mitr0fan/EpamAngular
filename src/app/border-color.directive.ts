import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appBorderColor]',
})
export class BorderColorDirective implements OnInit {
    @Input() date: string;

    private twoWeeks: number = 14 * 24 * 3600 * 1000; // two weeks in ms
    private borderParametersCurrentCourse = '5px solid #a0ff97';
    private borderParametersFutureCourse = '5px solid #2a5885';

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        const difference = new Date().getTime() - +this.date;

        if (difference > 0 && difference < this.twoWeeks) {
            this.renderer.setStyle(
                this.element.nativeElement,
                'border',
                this.borderParametersCurrentCourse
            );
        } else if (difference < 0) {
            this.renderer.setStyle(
                this.element.nativeElement,
                'border',
                this.borderParametersFutureCourse
            );
        }
    }
}
