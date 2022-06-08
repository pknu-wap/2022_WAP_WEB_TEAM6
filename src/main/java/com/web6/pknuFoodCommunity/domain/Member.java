package com.web6.pknuFoodCommunity.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member {
    private String name, email, password, major, profileImage;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentNumber;
    private int grade;


    @Builder
    public Member(String name, String email, String password, String major, Long studentNumber, int grade){
        this.name = name;
        this.email = email;
        this.password = password;
        this.major = major;
        this.studentNumber = studentNumber;
        this.grade = grade;
    }
}
