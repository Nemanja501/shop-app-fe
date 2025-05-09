import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProductService } from '../../shared/services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent{
  postProductForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    user_id: new FormControl(localStorage.getItem('userId'))
  });

  constructor(private productService: ProductService, private router: Router) {}

  get name() {
    return this.postProductForm.get('name'); 
  }

  get price() {
    return this.postProductForm.get('price'); 
  }

  get image() {
    return this.postProductForm.get('image'); 
  }

  get user_id() {
    return this.postProductForm.get('user_id')?.value;
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    console.log('image', file);
    this.postProductForm.patchValue({image: file});
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.postProductForm.get('name')?.value!);
    formData.append('price', this.postProductForm.get('price')?.value!);
    formData.append('image', this.postProductForm.get('image')?.value!);
    formData.append('user_id', this.postProductForm.get('user_id')?.value!);
    console.log('form data', formData);
    this.productService.postProduct(formData).subscribe({
      next: (response: any) => {
        console.log('post prod res', response);
        this.router.navigate([`/user/${this.user_id}`])
      },
      error: err => console.log('post prod err', err)
    })
  }
}
