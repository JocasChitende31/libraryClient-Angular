import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-list-user',
  templateUrl: './book-list-user.component.html',
  styleUrls: ['./book-list-user.component.css']
})
export class BookListUserComponent implements OnInit {

  serverUnvaliable: String = '';
  bgDanger: String = '';
  qtdT: Number = 0;
  bookId: any;
  books: Book[] = [];
  categories: Category[] = [];

  constructor(
    private bookService: BookServiceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookId = this.route.snapshot.params['id'];
    if (this.books.length <= 0) {
    setTimeout(() => {
        this.serverUnvaliable = 'Serviço temporariamente indisponível';
        this.bgDanger = 'bg-danger';
      }, 3500);
    }
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.findAll().subscribe(data => {
      this.books = data;

      let i = 0;
      for (let index = 0; index < data.length; index++) {
        i++;
      }
      this.qtdT = i;
    });
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;

    })

  }
 
  onDelete(bookId: any) {
    this.bookService.deleteBook(bookId).subscribe(data => {
      console.log(bookId);
      this.goToBookList();
    })
  }
  goToBookList() {
    this.router.navigate(['/books']);
    window.location.reload();
  }


}
