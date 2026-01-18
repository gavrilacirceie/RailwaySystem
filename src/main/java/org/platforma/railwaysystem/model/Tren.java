package org.platforma.railwaysystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
public class Tren {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nume;

    @ManyToOne
    private Ruta ruta;

    @ManyToOne
    private CategorieTren categorieTren;

    private LocalDate dataPlecare;
    private LocalDate dataSosire;
    private LocalTime oraPlecare;
    private LocalTime oraSosire;
}
