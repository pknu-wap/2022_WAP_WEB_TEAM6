package com.web6.pknuFoodCommunity.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Data
@Getter @Setter
public class Message {
    private String message;

    public Message() {
        this.message = null;
    }
}
