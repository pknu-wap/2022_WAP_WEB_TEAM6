package com.web6.pknuFoodCommunity.Controller;

import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.domain.Member;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//@RestController
@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberController(MemberService memberService, PasswordEncoder passwordEncoder){
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("api/auth/register")
    public String createForm(){
        return "members/createMemberForm";
    }

    @PostMapping("api/auth/register")
    public String create(Member form){
        Member member = new Member();
        member.setName(form.getName());
        member.setEmail(form.getEmail());
        member.setStudentNumber(form.getStudentNumber());
        member.setPassword(passwordEncoder.encode(form.getPassword()));
        member.setGrade(form.getGrade());
        member.setMajor(form.getMajor());
        memberService.join(member);

        return "redirect:/";
    }

    // 회원가입 데이터 등록
//    @PostMapping("api/auth/register")
//    public String createMember(@RequestBody Map<String, Object> requestData){
//        JSONObject newMember = new JSONObject(requestData);
//        System.out.println(requestData);
//        JSONObject sendMember = newMember.getJSONObject("member");
//        Member member = Member.builder()
//                .name(sendMember.getString("name"))
//                .email(sendMember.getString("email"))
//                .grade(sendMember.getInt("grade"))
//                .major(sendMember.getString("major"))
//                .password(passwordEncoder.encode(sendMember.getString("password")))
//                .studentNumber((long) sendMember.getInt("studentNo")).build();
//        memberService.join(member);
//
//        return "redirect:/";
//    }

//    @GetMapping("/members")
//    public String showMemberList(Model model){
//        List<Member> members = memberService.findMembers();
//        model.addAttribute("members", members);
//        return "members/memberList";
//    }
}
