package com.example.webxemphim_backend.service;


import com.example.webxemphim_backend.dto.EpisodesDto;
import com.example.webxemphim_backend.entity.Episodes;
import com.example.webxemphim_backend.repository.EpisodesRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class EpisodesService {
    EpisodesRepository episodesRepository;



    public Episodes save(Episodes episodes) {

        return episodesRepository.save(episodes);
    }

    public List<Episodes> getAll(){
        return episodesRepository.findAll();
    }

    public Episodes update(String id, Episodes episodes) {
        Episodes episodesUpdate = findById(id);
        episodesUpdate.setLink(episodes.getLink());
        episodesUpdate.setName(episodes.getName());
        return episodesRepository.save(episodesUpdate);
    }


    public void delete(String id){
        episodesRepository.deleteById(id);
    }


    public Episodes findById(String id) {
        return episodesRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
    }
    public List<Episodes> EpisodesALLByIdMovie(String movieId) {
        return episodesRepository.EpisodesALLByIdMovie(movieId);
    }

    public List<Episodes> movieALLEpisodes(String movieId) {
        return episodesRepository.movieALLEpisodes(movieId);
    }

    public Episodes updateEpisodesView(String id, EpisodesDto episodesDto) {
        Episodes episodes = episodesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Integer currentView = episodes.getView() != null ? episodes.getView() : 0;
        Integer increment = episodesDto.getView() != null ? episodesDto.getView() : 1;

        episodes.setView(currentView + increment);
        return episodesRepository.save(episodes);
    }

}