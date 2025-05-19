package com.example.webxemphim_backend.service;


import com.example.webxemphim_backend.entity.Type;
import com.example.webxemphim_backend.repository.TypeRepository;
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
public class TypeService {
    TypeRepository typeRepository;



    public Type save(Type type) {
        if (typeRepository.existsByName(type.getName())) {
            System.out.println("Tên Style đã tồn tại, không thể thêm mới."); // Ghi log thay vì ném lỗi
            return null; // Hoặc có thể trả về một giá trị mặc định
        }
        return typeRepository.save(type);
    }


    public List<Type> getAll(){
        return typeRepository.findAll();
    }

    public Type update(String id, Type type) {
        Type typeUpdate = findById(id);
        typeUpdate.setName(type.getName());
        return typeRepository.save(typeUpdate);
    }


    public void delete(String id){
        typeRepository.deleteById(id);
    }


    public Type findById(String id) {
        return typeRepository.findById(id).orElseThrow(() -> new RuntimeException("Type not found"));
    }

}
