package com.example.webxemphim_backend.controller;


import com.example.webxemphim_backend.dto.MovieDto;
import com.example.webxemphim_backend.entity.Movie;
import com.example.webxemphim_backend.entity.Nation;
import com.example.webxemphim_backend.entity.Style;
import com.example.webxemphim_backend.entity.Type;
import com.example.webxemphim_backend.repository.TypeRepository;
import com.example.webxemphim_backend.service.MovieService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;


@RestController
//@RequestMapping("/movie")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class MovieController {

    MovieService movieService;
    TypeRepository typeRepository;

    @PostMapping("/movie")
    @CrossOrigin
//    public Movie save(@RequestBody Movie movie) {
//        return movieService.save(movie);
//    }

    public ResponseEntity<Movie> save(@RequestParam("name") String name,
                                      @RequestParam(value = "image", required = false) MultipartFile image,
                                      @RequestParam("description") String description,
                                      @RequestParam("duration") Integer duration,
                                      @RequestParam(value = "episodes", required = false) String episodes, // Đổi kiểu thành String
                                      @RequestParam("link") String link,
                                      @RequestParam("namphathanh") Integer namphathanh,
                                      @RequestParam("status") Integer status,
                                      @RequestParam("trailer") String trailer,
                                      @RequestParam("nation") Nation nation,
                                      @RequestParam("style") Style style,
                                      @RequestParam("type") List<Type> type,
                                      @RequestParam("directors") String directors,
                                      @RequestParam("cast") String cast,
                                      @RequestParam("rating") Double rating) {
        try {
            Movie movie = new Movie();
            movie.setName(name);
            movie.setDescription(description);
            movie.setDuration(duration);
            Integer episodess = (episodes == null || episodes.trim().isEmpty()) ? 1 : Integer.parseInt(episodes);
            movie.setEpisodes(episodess);
            movie.setLink(link);
            movie.setNamphathanh(namphathanh);
            movie.setStart_date(LocalDate.now().atStartOfDay());
            movie.setStatus(status);
            movie.setTrailer(trailer);
            movie.setNation(nation);
            movie.setStyle(style);
            movie.setTypes(type);
            movie.setDirectors(directors);
            movie.setCast(cast);
            movie.setRating(rating);
//            List<Type> types = typeRepository.findAllById(type);
//            movie.setTypes(types);
            if (image != null && !image.isEmpty()) {
                byte[] imageData = image.getBytes();
                String base64Image = Base64.getEncoder().encodeToString(imageData);
                movie.setImage(base64Image); // Lưu ảnh dưới dạng Base64
            }

            Movie savedMovie = movieService.save(movie);
            return ResponseEntity.ok(savedMovie);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/movieAll")
    @CrossOrigin
    List<Movie> getAll(){
        return movieService.getAll();
    }

    @GetMapping("/listMovieRating")
    @CrossOrigin
    List<Movie> listMovieRating(){
        return movieService.listMovieRating();
    }

    @GetMapping("/movieLe")
    @CrossOrigin
    List<Movie> getMovieLe(){
        return movieService.getMovieLe();
    }

    @GetMapping("/movieBo")
    @CrossOrigin
    List<Movie> getMovieBo(){
        return movieService.getMovieBo();
    }

    @GetMapping("/movieChieuRap")
    @CrossOrigin
    List<Movie> getMovieChieuRap(){
        return movieService.getMovieChieuRap();
    }

    @GetMapping("/topphim")
    @CrossOrigin
    List<Movie> getMovieTop(){
        return movieService.getTopMovies();
    }

    @PutMapping("/movie/{id}")
    @CrossOrigin
    public Movie update(@PathVariable String id, @RequestBody Movie movie) {
        return movieService.update(id, movie);
    }

    @DeleteMapping("/movie/{id}")
    @CrossOrigin
    String delete(@PathVariable String id){
        movieService.delete(id);
        return " deleted successfully";
    }

    @GetMapping("/movie/{id}")
    @CrossOrigin
    public Movie findById(@PathVariable("id")  String id) {
        return movieService.findById(id);
    }

//    @GetMapping("/movie/{name}")
    @CrossOrigin
    @GetMapping("/movie/name/{name}")
    public Movie findByName(@PathVariable String name) {
        return movieService.findByName(name);
    }


    @GetMapping("/filter")
    @CrossOrigin
    public ResponseEntity<List<Movie>> filterMovies(
            @RequestParam(required = false) String styleId,
            @RequestParam(required = false) String nationId,
            @RequestParam(required = false) String typeId,
            @RequestParam(required = false) Integer namPhatHanh
    ) {
        List<Movie> movies = movieService.filterMovies(styleId, nationId, typeId, namPhatHanh);
        return ResponseEntity.ok(movies);
    }

    @PutMapping("/movie/view/{id}")
    @CrossOrigin
    public ResponseEntity<Movie> updateMovieView(@PathVariable String id, @RequestBody MovieDto movieDto) {
        Movie updatedMovie = movieService.updateMovieView(id, movieDto);

        return ResponseEntity.ok(updatedMovie);
    }
}

