package com.example.webxemphim_backend.controller;


import com.example.webxemphim_backend.entity.Type;
import com.example.webxemphim_backend.service.TypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/type")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class TypeController {

    TypeService typeService;

    @PostMapping("/type")
    @CrossOrigin
    public Type save(@RequestBody Type type) {
        return typeService.save(type);
    }

    @GetMapping("/typeAll")
    @CrossOrigin
    List<Type> getAll(){
        return typeService.getAll();
    }

    @PutMapping("/type/{id}")
    @CrossOrigin
    public Type update(@PathVariable String id, @RequestBody Type type) {
        return typeService.update(id, type);
    }

    @DeleteMapping("/type/{id}")
    @CrossOrigin
    String delete(@PathVariable String id){
        typeService.delete(id);
        return " deleted successfully";
    }

    @GetMapping("/type/{id}")
    public Type findById(@PathVariable("id")  String id) {
        return typeService.findById(id);
    }
}
