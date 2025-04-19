import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    isOptionsVisible: boolean = false;

    constructor(private router: Router) {}

    onSearch(event: Event) {
        console.log((event.target as HTMLTextAreaElement).value);
        const search = (event.target as HTMLTextAreaElement).value;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([`/search/${search}`])});
    }

    redirectToProfile() {
        const userId = localStorage.getItem('userId');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([`/user/${userId}`])});
    }

    toogleOptions() {
        this.isOptionsVisible = !this.isOptionsVisible
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }
}