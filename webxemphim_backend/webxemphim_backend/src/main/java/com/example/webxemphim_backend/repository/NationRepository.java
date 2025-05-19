package com.example.webxemphim_backend.repository;

import com.example.webxemphim_backend.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationRepository extends JpaRepository<Nation, String> {
}

