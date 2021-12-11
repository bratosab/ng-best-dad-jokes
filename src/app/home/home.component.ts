import { Component, OnInit } from '@angular/core';
import { postsMock } from '../data/posts.mock';
import { Post } from '../models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'ng-best-dad-jokes';
  posts: Post[] = postsMock

  constructor() { }

  ngOnInit(): void {

  }

}
