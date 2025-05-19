package com.example.webxemphim_backend.service;


import com.example.webxemphim_backend.entity.Style;
import com.example.webxemphim_backend.repository.StyleRepository;
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
public class StyleService {
    StyleRepository styleReository;



    public Style save(Style style) {
        return styleReository.save(style);
    }

    public List<Style> getAll(){
        return styleReository.findAll();
    }

    public Style update(String id, Style style) {
        Style styleUpdate = findById(id);
        styleUpdate.setName(style.getName());
        return styleReository.save(styleUpdate);
    }


    public void delete(String id){
        styleReository.deleteById(id);
    }


    public Style findById(String id) {
        return styleReository.findById(id).orElseThrow(() -> new RuntimeException(" not found"));
    }

}