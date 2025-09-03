import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PutPostDto } from "./dto/put-post.dto";
import { PatchPostDto } from "./dto/patch-post.dto";

@Injectable()
export class PostsService {
  posts: any[];

  constructor() {
    this.posts = [
      { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
      { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
      { id: 3, title: 'Third Post', content: 'This is the content of the third post.' },
    ];
  }

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: string) {
    const post = this.posts.find(p => p.id === parseInt(id));
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  createPost(createPostDto: CreatePostDto) {
    const newPost = {
      id: this.posts.length + 1,
      title: createPostDto.title,
      content: createPostDto.content,
    };
    this.posts.push(newPost);
    return newPost;
  }


  updatePost(id: string, putPostDto: PutPostDto) {

    if (!putPostDto.title || !putPostDto.content){
     throw new HttpException("Error during updating post", HttpStatus.BAD_REQUEST);
    }

    this.getPostById(id);
    const updatedPost = {
      id: parseInt(id),
      title: putPostDto.title,
      content: putPostDto.content,
    };
    this.posts.splice(parseInt(id) - 1, 1, updatedPost);
    return updatedPost;
  }

  partiallyUpdatePost(id: string, patchPostDto: PatchPostDto) {
    const post = this.getPostById(id);
    const updatedPost = {
      ...post,
      ...patchPostDto,
    };
    this.posts.splice(parseInt(id) - 1, 1, updatedPost);
    return updatedPost;
  }

  deletePost(id: string) {
    this.getPostById(id);
    this.posts.splice(this.posts.findIndex(post => post.id === parseInt(id)), 1);
    return {};
  }
}
