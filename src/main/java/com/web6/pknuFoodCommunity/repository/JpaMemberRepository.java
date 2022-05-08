package com.web6.pknuFoodCommunity.repository;

import com.web6.pknuFoodCommunity.domain.Member;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JpaMemberRepository implements MemberRepository {
    private final EntityManager em;
    private static Map<Long, Member> store = new HashMap<>();

    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findByStudentNumber(Long s_num) {
        Member member = em.find(Member.class, s_num);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        List<Member> result = em.createQuery("select m from Member m where m.email = :email", Member.class)
                .setParameter("email", email)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public Optional<Member> findByPassword(String password) {
        List<Member> result = em.createQuery("select m from Member m where m.password = :password", Member.class)
                .setParameter("password", password)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public Optional<Member> findByMajor(String major) {
        return Optional.empty();
    }

    @Override
    public Optional<Member> findByProfileImage(String profile_image) {
        return Optional.empty();
    }

    @Override
    public Optional<Member> findByGrade(int grade) {
        return Optional.empty();
    }

    @Override
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }

    // 객체를 대상으로 쿼리를 날린다.

    public void clearStore() {
        store.clear();
    }
}