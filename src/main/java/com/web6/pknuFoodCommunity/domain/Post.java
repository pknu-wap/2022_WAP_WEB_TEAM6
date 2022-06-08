package com.web6.pknuFoodCommunity.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Post {
    String title, desc, photo, username, category, useremail;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder
    public Post(String title, String desc, String photo, String username, String category, String useremail){
        this.title = title;
        this.desc = desc;
        this.photo = photo;
        this.username = username;
        this.category = category;
        this.useremail = useremail;
    }
}
