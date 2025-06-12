import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../category-sidebar.service';
import { Category } from '../../category';
import { CommonModule } from '@angular/common'; // ✅ Importa esto
import { HttpClientModule } from '@angular/common/http'; // si usas HttpClient en el HTML
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<number | null>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  onSelectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }
}
