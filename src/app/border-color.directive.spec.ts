import { BorderColorDirective } from './border-color.directive';

describe('BorderColorDirective', () => {
    it('should create an instance', () => {
        const element = jasmine.createSpyObj('ElementRef', ['nativeElement']);
        const renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
        const directive = new BorderColorDirective(element, renderer);
        expect(directive).toBeTruthy();
    });
});
