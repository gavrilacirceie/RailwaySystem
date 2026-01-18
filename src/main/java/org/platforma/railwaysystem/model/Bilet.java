package org.platforma.railwaysystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Bilet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Tren tren;

    @ManyToOne
    private TipLoc tipLoc;

    private LocalDate date;
    private Double pretTotal;
}
