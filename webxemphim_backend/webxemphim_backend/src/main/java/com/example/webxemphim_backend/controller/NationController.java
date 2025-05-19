package com.example.webxemphim_backend.controller;


import com.example.webxemphim_backend.entity.Nation;
import com.example.webxemphim_backend.service.NationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/nation")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class NationController {

    NationService nationService;

    @PostMapping("/nation")
    @CrossOrigin
    public Nation save(@RequestBody Nation nation) {
        return nationService.save(nation);
    }

    @GetMapping("/nationAll")
    @CrossOrigin
    List<Nation> getAll(){
        return nationService.getAll();
    }

    @PutMapping("/nation/{id}")
    @CrossOrigin
    public Nation update(@PathVariable String id, @RequestBody Nation nation) {
        return nationService.update(id, nation);
    }

    @DeleteMapping("/nation/{id}")
    @CrossOrigin
    String delete(@PathVariable String id){
        nationService.delete(id);
        return " deleted successfully";
    }

    @GetMapping("/nation/{id}")
    public Nation findById(@PathVariable("id")  String id) {
        return nationService.findById(id);
    }
}

