import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Post } from '../models/post.interface';
import { PostsService } from '../providers/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable<Post[]>();
  posts?: Post[];
  routeChangeSubscription?: Subscription;

  post?: Post;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      tap((posts) => {
        this.posts = posts;

        this.post = posts.find(
          (post) => post.slug === this.route.snapshot.params['slug']
        );

        this.listenForRouteChange()
      })
    );
  }

  private listenForRouteChange() {
    this.routeChangeSubscription = this.route.params.subscribe((params) => {
      this.post = this.posts?.find((post) => post.slug === params['slug']);
    });
  }
}
