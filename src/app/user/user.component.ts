import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  id!: string;
  user!: User;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.userService.getById(this.id).subscribe({
      next: (response: any) => {
        console.log('user response', response);
        this.user = response.user;
      },
      error: err => console.log('user err', err)
    })
  }
}
