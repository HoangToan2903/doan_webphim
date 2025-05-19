package com.example.webxemphim_backend.repository;

import com.example.webxemphim_backend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    String movieLe = ("SELECT m.* \n" +
            "FROM websitephim.movie m\n" +
            "JOIN websitephim.style s ON s.id = m.style_id\n" +
            "WHERE s.name = 'Phim lẻ';" );
    @Query(value = movieLe, nativeQuery = true)
    List<Movie> movieNewLe();

    String movieBo = ("SELECT m.* \n" +
            "FROM websitephim.movie m\n" +
            "JOIN websitephim.style s ON s.id = m.style_id\n" +
            "WHERE s.name = 'Phim bộ';" );
    @Query(value = movieBo, nativeQuery = true)
    List<Movie> movieNewBo();


    String movieChieuRap = ("SELECT m.* \n" +
            "FROM websitephim.movie m\n" +
            "JOIN websitephim.style s ON s.id = m.style_id\n" +
            "WHERE s.name = 'Phim chiếu rạp';" );
    @Query(value = movieChieuRap, nativeQuery = true)
    List<Movie> movieNewChieuRap();

    String topphim = ("SELECT * \n" +
            "FROM websitephim.movie \n" +
            "WHERE view IS NOT NULL AND view > 0 \n" +
            "ORDER BY view DESC \n" );
    @Query(value = topphim, nativeQuery = true)
    List<Movie> findTopMoviesByView();

    Optional<Movie> findByName(String name);



    String listMovieRating= ("SELECT m.*\n" +
            "FROM websitephim.movie m\n" +
            "WHERE rating IS NOT NULL AND rating > 0 \n" +
            "ORDER BY m.rating DESC\n" );
    @Query(value = listMovieRating, nativeQuery = true)
    List<Movie> listMovieRating();

    @Query("""
        SELECT DISTINCT m FROM Movie m
        LEFT JOIN FETCH m.nation n
        LEFT JOIN FETCH m.style s
        LEFT JOIN FETCH m.types t 
        WHERE (:styleId IS NULL OR m.style.id = :styleId)
          AND (:nationId IS NULL OR m.nation.id = :nationId)
          AND (:typeId IS NULL OR t.id = :typeId)
          AND (:namPhatHanh IS NULL OR m.namphathanh = :namPhatHanh)
    """)
    List<Movie> filterMovies(
            @Param("styleId") String styleId,
            @Param("nationId") String nationId,
            @Param("typeId") String typeId,
            @Param("namPhatHanh") Integer namPhatHanh
    );
}

