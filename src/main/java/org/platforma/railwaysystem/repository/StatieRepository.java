package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.Statie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatieRepository extends JpaRepository<Statie, Long> {}
