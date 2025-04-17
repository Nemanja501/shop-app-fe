import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-pagination-arrow',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination-arrow.component.html',
    styleUrl: './pagination-arrow.component.scss'
})
export class PaginationArrowComponent {
    @Input() isLeft: boolean = false;
    @Input() isRight: boolean = false;
}