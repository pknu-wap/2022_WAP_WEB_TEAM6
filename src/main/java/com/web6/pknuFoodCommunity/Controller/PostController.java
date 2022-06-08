package com.web6.pknuFoodCommunity.Controller;

import com.web6.pknuFoodCommunity.Service.MemberService;
import com.web6.pknuFoodCommunity.Service.PostService;
import com.web6.pknuFoodCommunity.domain.Member;
import com.web6.pknuFoodCommunity.domain.Post;
import com.web6.pknuFoodCommunity.domain.PrincipalDetail;
import com.web6.pknuFoodCommunity.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

//@RestController
@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    private final PostService postService;
    private final MemberService memberService;

    @Autowired
    public PostController(PostService postService, MemberService memberService){
        this.postService = postService;
        this.memberService = memberService;
    }

    @GetMapping("api/auth/post")
    public String createForm(){
        return "members/post";
    }

    @PostMapping("api/auth/post")
    public String savePost(HttpServletRequest request, @AuthenticationPrincipal PrincipalDetail user) {
        String useremail = user.getUsername();
        System.out.println(useremail);
        Optional<Member> member = memberService.findByEmail(useremail);
        String username = member.get().getName();

        Post postInfo = Post.builder()
                .title(request.getParameter("title"))
                .desc(request.getParameter("desc"))
                .category(request.getParameter("category"))
                .username(username)
                .useremail(useremail)
                .build();
        System.out.println(postInfo.getUseremail());
        postService.savePosting(postInfo);

        return "redirect:/";
    }

    @GetMapping("api/post")
    public String showMemberList(Model model){
        List<Post> posts = postService.findPosts();
        model.addAttribute("posts", posts);
        return "members/postList";
    }

//    @PostMapping("api/auth/post")
//    public ResponseEntity<Message> login(@RequestBody Map<String, Object> requestData) {
//        JSONObject loginMember = new JSONObject(requestData);
//        Message message = new Message();
//
//        JSONObject checkMember = loginMember.getJSONObject("postInform");
//
//        Post postInfo = Post.builder()
//                .title(checkMember.getString("title"))
//                .desc(checkMember.getString("desc"))
//                .category(checkMember.getString("category"))
//                .build();
//
//        System.out.println(postInfo.getTitle());
//        System.out.println(postInfo.getDesc());
//
//        postService.savePosting(postInfo);
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//
//        message.setMessage("Success");
//        return new ResponseEntity<>(message, headers, HttpStatus.OK);
//    }

}
