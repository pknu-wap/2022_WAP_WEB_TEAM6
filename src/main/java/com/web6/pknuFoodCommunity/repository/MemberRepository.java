package com.web6.pknuFoodCommunity.repository;

import com.web6.pknuFoodCommunity.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByStudentNumber(Long s_num);

    Optional<Member> findByEmail(String email);

    List<Member> findAll();
}
