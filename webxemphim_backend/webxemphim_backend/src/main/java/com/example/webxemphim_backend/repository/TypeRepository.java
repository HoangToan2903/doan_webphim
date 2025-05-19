package com.example.webxemphim_backend.repository;

import com.example.webxemphim_backend.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, String> {
    boolean existsByName(String name);
}
