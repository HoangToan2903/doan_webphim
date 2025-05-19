package com.example.webxemphim_backend.repository;

import com.example.webxemphim_backend.entity.Style;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StyleRepository extends JpaRepository<Style, String> {
}

