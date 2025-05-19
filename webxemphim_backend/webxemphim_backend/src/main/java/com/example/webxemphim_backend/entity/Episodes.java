package com.example.webxemphim_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Episodes {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String link;
    Integer name;
    Integer view;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
