package com.web6.pknuFoodCommunity.repository;

import com.web6.pknuFoodCommunity.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByUsername(String username);
    List<Post> findAll();
}
