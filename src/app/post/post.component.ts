import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Post } from '../models/post.interface';
import { PostsService } from '../providers/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable<Post[]>();

  post?: Post;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      tap((posts) => {
        this.post = posts.find(
          (post) => post.id === +this.route.snapshot.params['id']
        );
      })
    );
  }
}
