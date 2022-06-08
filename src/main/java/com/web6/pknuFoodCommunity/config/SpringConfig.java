package com.web6.pknuFoodCommunity.config;

import com.web6.pknuFoodCommunity.Service.LoginService;
import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.Service.PostService;
import com.web6.pknuFoodCommunity.repository.LoginRepository;
import com.web6.pknuFoodCommunity.repository.MemberRepository;
import com.web6.pknuFoodCommunity.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;
    private final LoginRepository loginRepository;
    private final PostRepository postRepository;

    @Autowired
    public SpringConfig(MemberRepository memberRepository, LoginRepository loginRepository, PostRepository postRepository) {
        this.memberRepository = memberRepository;
        this.loginRepository = loginRepository;
        this.postRepository = postRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }

    @Bean
    public LoginService loginService() {
        return new LoginService(memberRepository);
    }

    @Bean
    public PostService postService() { return new PostService(postRepository); }

}
