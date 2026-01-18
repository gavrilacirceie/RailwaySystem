package org.platforma.railwaysystem.service;

import org.platforma.railwaysystem.model.Bilet;
import org.platforma.railwaysystem.model.Ruta;
import org.platforma.railwaysystem.repository.BiletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BiletService {
    @Autowired
    private BiletRepository biletRepository;

    public List<Bilet> getAll() { return biletRepository.findAll(); }
    public Bilet getById(Long id) { return biletRepository.findById(id).orElseThrow(); }
    public Bilet create(Bilet b) { return biletRepository.save(b); }
    public Bilet update(Long id, Bilet b) {
        Bilet existing = getById(id);
        existing.setTren(b.getTren());
        existing.setTipLoc(b.getTipLoc());
        existing.setDate(b.getDate());
        existing.setPretTotal(b.getPretTotal());
        return biletRepository.save(existing);
    }
    public void delete(Long id) { biletRepository.deleteById(id); }

    public Double incasariZi(LocalDate data, Long categorieId) {
        Double suma = biletRepository.sumIncasariZi(data, categorieId);
        return suma != null ? suma : 0.0;
    }

    public Double incasariLuna(int luna, int an, Long categorieId) {
        Double suma = biletRepository.sumIncasariLuna(luna, an, categorieId);
        return suma != null ? suma : 0.0;
    }

    public Bilet createBilet(Bilet b) {
        if (b.getTren() != null && b.getTren().getRuta() != null) {
            Ruta ruta = b.getTren().getRuta();
            Double tarifPerKm = ruta.getCategorieTren().getTarifPerKm();
            int distanta = ruta.getDistantaKm();

            Double pretTotal = distanta * tarifPerKm;
            b.setPretTotal(pretTotal);
        }
        return biletRepository.save(b);
    }
}

