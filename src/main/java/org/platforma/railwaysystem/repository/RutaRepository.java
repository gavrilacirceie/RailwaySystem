package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.Ruta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RutaRepository extends JpaRepository<Ruta, Long> {}

