package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.CategorieTren;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieTrenRepository extends JpaRepository<CategorieTren, Long> {}

