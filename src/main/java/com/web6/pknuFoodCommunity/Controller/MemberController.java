package com.web6.pknuFoodCommunity.Controller;

import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.domain.Member;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

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
    public String create(@RequestBody Map<String, Object> requestData){
        JSONObject newMember = new JSONObject(requestData);
        Member member = new Member();
        JSONObject sendMember = newMember.getJSONObject("member");
        member.setName(sendMember.getString("name"));
        member.setEmail(sendMember.getString("email"));
        member.setGrade(sendMember.getInt("grade"));
        member.setMajor(sendMember.getString("major"));
        member.setPassword(sendMember.getString("password"));
        member.setStudentNumber((long) sendMember.getInt("studentNo"));

        memberService.join(member);

        return "redirect:/";
    }

    @GetMapping("/members")
    public String list(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}
