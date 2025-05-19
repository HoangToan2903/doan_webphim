package com.example.webxemphim_backend.repository;


import com.example.webxemphim_backend.entity.Episodes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EpisodesRepository extends JpaRepository<Episodes, String> {
    String movieALL = ("SELECT e.* \n" +
            "FROM websitephim.episodes AS e\n" +
            "INNER JOIN websitephim.movie AS m ON m.id = e.movie_id\n" +
            "WHERE m.id = :movieId" );
    @Query(value = movieALL, nativeQuery = true)
    List<Episodes> EpisodesALLByIdMovie(@Param("movieId") String movieId);

    String movieALLEpisodes = ("SELECT e.*\n" +
            "FROM websitephim.episodes AS e\n" +
            "JOIN websitephim.movie AS m ON m.id = e.movie_id\n" +
            "WHERE m.id = :movieId\n" +
            "ORDER BY CAST(e.name AS UNSIGNED)\n" +
            "LIMIT 1;" );
    @Query(value = movieALLEpisodes, nativeQuery = true)
    List<Episodes> movieALLEpisodes(@Param("movieId") String movieId);
}

