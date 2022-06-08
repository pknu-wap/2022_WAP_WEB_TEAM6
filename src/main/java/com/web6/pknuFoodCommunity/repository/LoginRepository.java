package com.web6.pknuFoodCommunity.repository;

import com.web6.pknuFoodCommunity.domain.Member;
import com.web6.pknuFoodCommunity.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
