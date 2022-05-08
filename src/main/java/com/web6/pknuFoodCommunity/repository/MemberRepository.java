package com.web6.pknuFoodCommunity.repository;

import com.web6.pknuFoodCommunity.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);

    Optional<Member> findByStudentNumber(Long s_num);

    Optional<Member> findByName(String name);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByPassword(String password);

    Optional<Member> findByMajor(String major);

    Optional<Member> findByProfileImage(String profile_image);

    Optional<Member> findByGrade(int grade);

    List<Member> findAll();
}
