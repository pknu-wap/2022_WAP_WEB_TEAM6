package com.web6.pknuFoodCommunity.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // local:8080으로 들어오면 호출됨
    @GetMapping("/")
    public String home() {
        return "home"; // templates의 home.html이 호출됨.
    }
}
