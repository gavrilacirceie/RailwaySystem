package org.platforma.railwaysystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ruta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Statie statieStart;

    @ManyToOne
    private Statie statieEnd;

    private int distantaKm;

    @ManyToOne
    private CategorieTren categorieTren;

    @ManyToOne
    private RangTren rangTren;
}
