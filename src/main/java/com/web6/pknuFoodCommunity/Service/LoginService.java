package com.web6.pknuFoodCommunity.Service;

import com.web6.pknuFoodCommunity.domain.PrincipalDetail;
import com.web6.pknuFoodCommunity.domain.User;
import com.web6.pknuFoodCommunity.domain.Member;
import com.web6.pknuFoodCommunity.repository.LoginRepository;
import com.web6.pknuFoodCommunity.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class LoginService implements UserDetailsService {
    private final MemberRepository memberRepository;

    public LoginService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * 로그인
     */
//    public String checkMember(LoginForm loginInfo){
//        final String[] loginMessage = new String[1];
//        loginRepository.findByEmail(loginInfo.getEmail())
//                .ifPresentOrElse(
//                        member->{
//                            if(member.getPassword().equals(loginInfo.getPassword())) loginMessage[0] = "Success";
//                            else loginMessage[0] = "비밀번호가 일치하지 않습니다.";
//                        },
//                        ()-> loginMessage[0] = "이메일이 일치하지 않습니다.");
//        return loginMessage[0];
//    }

    @Override
    public UserDetails loadUserByUsername(String useremail) throws UsernameNotFoundException {
        Member principal = memberRepository.findByEmail(useremail)
                .orElseThrow(()-> new UsernameNotFoundException("등록되지 않은 사용자입니다"));
        User user = User.builder()
                .email(principal.getEmail())
                .password(principal.getPassword())
                .build();

        return new PrincipalDetail(user);
    }
}
