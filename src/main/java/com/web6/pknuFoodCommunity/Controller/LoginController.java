package com.web6.pknuFoodCommunity.Controller;

import com.web6.pknuFoodCommunity.Service.LoginService;
import com.web6.pknuFoodCommunity.domain.User;
import com.web6.pknuFoodCommunity.domain.Message;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//@RestController
@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService){
        this.loginService = loginService;
    }

    @GetMapping("api/auth/login")
    public String loginForm(@RequestParam(value = "error", required = false) String error,
                            @RequestParam(value = "exception", required = false) String exception, Model model) {
        model.addAttribute("error", error);
        model.addAttribute("exception", exception);
        return "members/loginForm";
    }

//    @PostMapping("api/auth/login")
//    public void login(@RequestBody Map<String, Object> requestData) {
//        JSONObject loginMember = new JSONObject(requestData);
////        Message message = new Message();
//
//        JSONObject checkMember = loginMember.getJSONObject("loginInform");
//
//        User loginInfo = User.builder()
//                .email(checkMember.getString("email"))
//                .password(checkMember.getString("password"))
//                .build();
//
//        loginService.loadUserByUsername(checkMember.getString("email"));


//        System.out.println(loginInfo.getEmail());
//        System.out.println(loginInfo.getPassword());
//
//        String isLoginSuccess = loginService.checkMember(loginInfo);
//        System.out.println(isLoginSuccess);
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        if(isLoginSuccess.equals("Success")){
//            message.setMessage(isLoginSuccess);
//            return new ResponseEntity<>(message, headers, HttpStatus.OK);
//        }
//        else{
//            message.setMessage(isLoginSuccess);
//            return new ResponseEntity<>(message, headers, HttpStatus.UNAUTHORIZED);
//        }
}
