package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.Bilet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface BiletRepository extends JpaRepository<Bilet, Long> {
    @Query("SELECT SUM(b.pretTotal) FROM Bilet b WHERE b.date = :date AND b.tren.ruta.categorieTren.id = :categorieId")
    Double sumIncasariZi(@Param("date") LocalDate date, @Param("categorieId") Long categorieId);

    @Query("SELECT SUM(b.pretTotal) FROM Bilet b WHERE MONTH(b.date) = :luna AND YEAR(b.date) = :an AND b.tren.ruta.categorieTren.id = :categorieId")
    Double sumIncasariLuna(@Param("luna") int luna, @Param("an") int an, @Param("categorieId") Long categorieId);
}
