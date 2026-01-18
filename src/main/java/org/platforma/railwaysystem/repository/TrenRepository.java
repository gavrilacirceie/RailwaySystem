package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.Bilet;
import org.platforma.railwaysystem.model.Tren;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrenRepository extends JpaRepository<Tren, Long> {
    List<Tren> findByRutaId(Long rutaId);
    @Query("SELECT t from Tren t WHERE DATE(t.dataPlecare)= :dataPlecare")
    List<Tren> findByDataPlecare(java.time.LocalDate dataPlecare);
    @Query ("SELECT t from Tren t WHERE DATE(t.dataSosire) = :dataSosire")
    List<Tren> findByDataSosire(java.time.LocalDate dataSosire);
}
