package com.example.webxemphim_backend.controller;


import com.example.webxemphim_backend.dto.EpisodesDto;
import com.example.webxemphim_backend.entity.Episodes;
import com.example.webxemphim_backend.service.EpisodesService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class EpisodesController {

    EpisodesService episodesService;

    @PostMapping("/episodes")
    @CrossOrigin
    public Episodes save(@RequestBody Episodes episodes) {
        return episodesService.save(episodes);
    }
//   too

    @GetMapping("/episodesAll")
    @CrossOrigin
    List<Episodes> getAll(){
        return episodesService.getAll();
    }

    @PutMapping("/episodes/{id}")
    @CrossOrigin
    public Episodes update(@PathVariable String id, @RequestBody Episodes episodes) {
        return episodesService.update(id, episodes);
    }

    @DeleteMapping("/episodes/{id}")
    @CrossOrigin
    String delete(@PathVariable String id){
        episodesService.delete(id);
        return " deleted successfully";
    }

    @GetMapping("/episodes/{id}")
    @CrossOrigin
    public Episodes findById(@PathVariable("id")  String id) {
        return episodesService.findById(id);
    }

    @GetMapping("/episodesALLByIdMovie/{id}")
    @CrossOrigin
    public List<Episodes> episodesALLByIdMovie(@PathVariable("id") String id) {
        List<Episodes> episodes = episodesService.EpisodesALLByIdMovie(id);

        // Sắp xếp theo name (tăng dần, alphabetically)
        episodes.sort(Comparator.comparing(Episodes::getName));

        return episodes;
    }
    @GetMapping("/movieALLEpisodes/{id}")
    @CrossOrigin
    public List<Episodes> movieALLEpisodes(@PathVariable("id")  String id) {
        return episodesService.movieALLEpisodes(id);
    }

    @PutMapping("/episodes/view/{id}")
    @CrossOrigin
    public ResponseEntity<Episodes> updateEpisodesView(@PathVariable String id, @RequestBody EpisodesDto episodesDto) {
        Episodes updatedEpisodes = episodesService.updateEpisodesView(id, episodesDto);

        return ResponseEntity.ok(updatedEpisodes);
    }
}

