package com.example.webxemphim_backend.controller;


import com.example.webxemphim_backend.entity.Style;
import com.example.webxemphim_backend.service.StyleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/style")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class StyleController {

    StyleService styleService;

    @PostMapping("/style")
    @CrossOrigin
    public Style save(@RequestBody Style style) {
        return styleService.save(style);
    }

    @GetMapping("/styleAll")
    @CrossOrigin
    List<Style> getAll(){
        return styleService.getAll();
    }

    @PutMapping("/style/{id}")
    @CrossOrigin
    public Style update(@PathVariable String id, @RequestBody Style style) {
        return styleService.update(id, style);
    }

    @DeleteMapping("/style/{id}")
    @CrossOrigin
    String delete(@PathVariable String id){
        styleService.delete(id);
        return " deleted successfully";
    }

    @GetMapping("/style/{id}")
    public Style findById(@PathVariable("id")  String id) {
        return styleService.findById(id);
    }
}

