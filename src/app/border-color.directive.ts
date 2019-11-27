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
        this.date = `${this.date.slice(3, 5)}.
        ${this.date.slice(0, 2)}.
        ${this.date.slice(6)}`;

        // time in ms between current date an course creation date
        const difference = new Date().getTime() - new Date(this.date).getTime();

        if (difference > 0 && difference < this.twoWeeks) {
            this.renderer.setStyle(this.element.nativeElement,
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
