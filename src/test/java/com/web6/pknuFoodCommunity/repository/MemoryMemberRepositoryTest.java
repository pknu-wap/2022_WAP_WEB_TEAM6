package com.web6.pknuFoodCommunity.repository;

import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class MemoryMemberRepositoryTest {

    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach() {
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach() {
        memberRepository.clearStore();
    }

    @Test
    public void save() {
        Member member = new Member();
        member.setName("spring");

        memberRepository.save(member);

        Member result = memberRepository.findByStudentNumber(member.getStudentNumber()).get();
        assertThat(result).isEqualTo(member);
    }

    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("spring1");
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        memberRepository.save(member2);

        Member result = memberRepository.findByName("spring1").get();

        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("spring1");
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        memberRepository.save(member2);

        List<Member> result = memberRepository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }


}