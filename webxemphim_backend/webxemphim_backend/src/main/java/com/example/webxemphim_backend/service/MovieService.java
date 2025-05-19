package com.example.webxemphim_backend.service;


import com.example.webxemphim_backend.dto.MovieDto;
import com.example.webxemphim_backend.entity.Movie;
import com.example.webxemphim_backend.repository.MovieRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MovieService {
    MovieRepository movieRepository;



    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }


    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Movie update(String id, Movie movie) {
        Movie movieNew = findById(id);
        movieNew.setName(movie.getName());
        movieNew.setImage(movie.getImage());
        movieNew.setDuration(movie.getDuration());
        movieNew.setTrailer(movie.getTrailer());
        movieNew.setStart_date(LocalDate.now().atStartOfDay());
        movieNew.setLink(movie.getLink());
        movieNew.setStatus(movie.getStatus());
        movieNew.setNamphathanh(movie.getNamphathanh());
        movieNew.setLink(movie.getLink());
        movieNew.setTypes(movie.getTypes());
        movieNew.setEpisodes(movie.getEpisodes());
        movieNew.setDescription(movie.getDescription());
        movieNew.setNation(movie.getNation());
        movieNew.setStyle(movie.getStyle());
        movieNew.setCast(movie.getCast());
        movieNew.setRating(movie.getRating());
        movieNew.setDirectors(movie.getDirectors());
        return movieRepository.save(movieNew);
    }


    public void delete(String id) {
        movieRepository.deleteById(id);
    }


    public Movie findById(String id) {
        return movieRepository.findById(id).orElseThrow(() -> new RuntimeException(" not found"));
    }

    public Movie findByName(String name) {
        return movieRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    public List<Movie> getMovieLe() {
        return movieRepository.movieNewLe();
    }
    public List<Movie> getMovieBo() {
        return movieRepository.movieNewBo();
    }
    public List<Movie> getMovieChieuRap() {
        return movieRepository.movieNewChieuRap();
    }
    public List<Movie> getTopMovies() {
        return movieRepository.findTopMoviesByView();
    }
    public List<Movie> listMovieRating() {
        return movieRepository.listMovieRating();
    }
    public List<Movie> filterMovies(String styleId, String nationId, String typeId, Integer namPhatHanh) {
        return movieRepository.filterMovies(styleId, nationId, typeId, namPhatHanh);
    }

    public Movie updateMovieView(String id, MovieDto movieDto) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Integer currentView = movie.getView() != null ? movie.getView() : 0;
        Integer increment = movieDto.getView() != null ? movieDto.getView() : 1;

        movie.setView(currentView + increment);
        return movieRepository.save(movie);
    }

}