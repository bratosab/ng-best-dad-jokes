import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  map,
  Observable,
  tap,
} from 'rxjs';
import { Post } from '../models/post.interface';
import { PostsService } from '../providers/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

///////////////////
//   Solution 1  //
///////////////////
// export class PostComponent implements OnInit {
//   posts$: Observable<Post[]> = new Observable<Post[]>();
//   posts?: Post[];
//   routeChangeSubscription?: Subscription;

//   post?: Post;
//   constructor(
//     private route: ActivatedRoute,
//     private postsService: PostsService
//   ) {}

//   ngOnInit(): void {
//     this.posts$ = this.postsService.getPosts().pipe(
//       tap((posts) => {
//         this.posts = posts;

//         this.post = posts.find(
//           (post) => post.slug === this.route.snapshot.params['slug']
//         );

//         this.listenForRouteChange()
//       })
//     );
//   }

//   private listenForRouteChange() {
//     this.routeChangeSubscription = this.route.params.subscribe((params) => {
//       this.post = this.posts?.find((post) => post.slug === params['slug']);
//     });
//   }
// }

///////////////////
//   Solution 2  //
///////////////////
export class PostComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable<Post[]>();
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.posts$ = combineLatest([
      this.postsService.getPosts(),
      this.route.params,
    ]).pipe(
      tap(([posts, params]) => {
        this.post = posts.find((post) => post.slug === params['slug']);
      }),
      map(([posts]) => {
        return posts;
      })
    );
  }
}
