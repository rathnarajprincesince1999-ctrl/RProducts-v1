package com.rathnaproducts.backend.repo;

import com.rathnaproducts.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
