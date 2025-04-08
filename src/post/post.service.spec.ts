import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './post';
import { Repository } from 'typeorm';

describe('PostService', () => {
  let postService: PostService;
  let postRepository: Repository<Post>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  it('should be return all posts', async () => {
    jest.spyOn(postRepository, "find").mockResolvedValue([]);
    await postService.getAllPosts();
    expect(postRepository.find).toHaveBeenCalled();
  });

  it('should be return postById', async () => {
    jest.spyOn(postRepository, "findOneBy").mockResolvedValue(null);
    await postService.getPostById(1);
    expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should be create post', async () => {
    const mockPostData = { title: "Test", author: "Author" };
    jest.spyOn(postRepository, 'create').mockReturnValue(mockPostData as any);
    jest.spyOn(postRepository, 'save').mockResolvedValue(null);

    await postService.createPost(mockPostData as any);

    expect(postRepository.create).toHaveBeenCalledWith(mockPostData);
    expect(postRepository.save).toHaveBeenCalled();
  });


  it('should be delete post', async () => {
    jest.spyOn(postRepository, "findOneBy").mockResolvedValue(null);
    jest.spyOn(postRepository, 'remove').mockResolvedValue(null);

    await postService.removePost(1);

    expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(postRepository.remove).toHaveBeenCalled();
  });

  it('should be update post', async () => {
    jest.spyOn(postRepository, "findOneBy").mockResolvedValue(null);
    jest.spyOn(postRepository, 'save').mockResolvedValue(null);

    await postService.updatePost(1, { title: "Updated" });

    expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(postRepository.save).toHaveBeenCalled();
  });
});
