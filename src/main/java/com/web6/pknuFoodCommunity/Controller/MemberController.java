package com.web6.pknuFoodCommunity.Controller;

import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService){
        this.memberService = memberService;
    }

    @GetMapping("members/new")
    public String createForm(){
        return "members/createMemberForm";
    }

    // 데이터를 등록할 때 Post를 사용함
    @PostMapping("members/new")
    public String create(MemberForm form){
        Member member = new Member();
        member.setName(form.getName());
        member.setEmail(form.getEmail());
        member.setStudentNumber(form.getStudentNumber());
        member.setPassword(form.getPassword());
        member.setGrade(form.getGrade());
        member.setMajor(form.getMajor());
        memberService.join(member);

        return "redirect:/";
    }

    @GetMapping("/members")
    public String list(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members); // model 객체는 Controller에서 생성된 데이터를 담아 View로 전달할 때 사용하는 객체
        return "members/memberList";
    }
}
