package com.web6.pknuFoodCommunity.Service;

import com.web6.pknuFoodCommunity.domain.Post;
import com.web6.pknuFoodCommunity.repository.PostRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /**
     * 글저장
     */
    public Long savePosting(Post post) {
        postRepository.save(post);
        return post.getId();
    }

    public List<Post> findPosts(){
        return postRepository.findAll();
    }

}
