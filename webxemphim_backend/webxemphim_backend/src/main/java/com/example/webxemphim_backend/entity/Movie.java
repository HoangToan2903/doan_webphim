package com.example.webxemphim_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    @Lob
    String image;
    Integer duration;
    String trailer;
    Integer status;
    LocalDateTime start_date;
    @Column(columnDefinition = "TEXT")
    private String description;
    String link;
    Integer namphathanh;
    Integer episodes;
    String directors;
    String cast;
    Double rating;
    //    Double rating;
    Integer view;
    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @ManyToOne
    @JoinColumn(name = "style_id")
    private Style style;

    @ManyToMany
    @JoinTable(
            name = "movie_type",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id"))
    private List<Type> types = new ArrayList<>();
}
