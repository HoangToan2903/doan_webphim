package com.example.webxemphim_backend.service;

import com.example.webxemphim_backend.entity.Nation;
import com.example.webxemphim_backend.repository.NationRepository;
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
public class NationService {
    NationRepository nationRepository;



    public Nation save(Nation nation) {
        return nationRepository.save(nation);
    }

    public List<Nation> getAll(){
        return nationRepository.findAll();
    }

    public Nation update(String id, Nation nation) {
        Nation nationUpdate = findById(id);
        nationUpdate.setName(nation.getName());
        return nationRepository.save(nationUpdate);
    }


    public void delete(String id){
        nationRepository.deleteById(id);
    }


    public Nation findById(String id) {
        return nationRepository.findById(id).orElseThrow(() -> new RuntimeException(" not found"));
    }

}