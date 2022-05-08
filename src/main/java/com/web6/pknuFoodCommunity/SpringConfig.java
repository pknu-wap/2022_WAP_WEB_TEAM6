package com.web6.pknuFoodCommunity;

import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.repository.JpaMemberRepository;
import com.web6.pknuFoodCommunity.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;

    @Autowired
    public SpringConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }

}
