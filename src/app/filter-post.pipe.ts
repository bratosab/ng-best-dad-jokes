import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './models/post.interface';

@Pipe({
  name: 'filterPost'
})
export class FilterPostPipe implements PipeTransform {

  transform(posts: Post[], post?: Post): Post[] {
    return post ? posts.filter(p => p.id !== post.id): posts;
  }

}
