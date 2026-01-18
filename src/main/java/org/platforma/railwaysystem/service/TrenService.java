package org.platforma.railwaysystem.service;

import org.platforma.railwaysystem.model.Bilet;
import org.platforma.railwaysystem.model.Ruta;
import org.platforma.railwaysystem.model.TipLoc;
import org.platforma.railwaysystem.model.Tren;
import org.platforma.railwaysystem.repository.RutaRepository;
import org.platforma.railwaysystem.repository.TrenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TrenService {

    @Autowired
    private TrenRepository trenRepository;

    @Autowired
    private BiletService biletService;

    @Autowired
    private RutaRepository rutaRepository;

    public List<Tren> getAllTrenuri() {
        return trenRepository.findAll();
    }

    public Tren getTrenById(Long id) {
        return trenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trenul nu a fost gasit"));
    }

    public Tren createTren(Tren tren) {
        Tren savedTren = trenRepository.save(tren);

        generareBileteAutomata(savedTren);

        return savedTren;
    }
    private void generareBileteAutomata(Tren tren) {
        if (tren.getRuta() != null) {
            Ruta ruta = rutaRepository.findById((long) tren.getRuta().getId())
                    .orElseThrow(() -> new RuntimeException("Ruta nu exista"));

            if (ruta.getCategorieTren() == null) {
                System.err.println("Ruta nu are categorie tren setata!");
                return;
            }

            tren.setRuta(ruta);

            Bilet bilet = new Bilet();
            bilet.setTren(tren);
            bilet.setDate(tren.getDataPlecare());
            biletService.createBilet(bilet);
        }
    }

    public Tren updateTren(Long id, Tren trenDetails) {
        Tren tren = getTrenById(id);
        tren.setNume(trenDetails.getNume());
        tren.setOraPlecare(trenDetails.getOraPlecare());
        tren.setOraSosire(trenDetails.getOraSosire());
        tren.setRuta(trenDetails.getRuta());
        return trenRepository.save(tren);
    }

    public void deleteTren(Long id) {
        trenRepository.deleteById(id);
    }

    public List<Tren> getTrenuriByRuta(Long rutaId) {
        return trenRepository.findByRutaId(rutaId);
    }
    public List<Tren> getTrenuriByDataPlecare(LocalDate dataPlecareId) {
        return trenRepository.findByDataPlecare(dataPlecareId);
    }
    public List<Tren> getTrenuriByDataSosire(LocalDate dataSosireId) {
        return trenRepository.findByDataSosire(dataSosireId);
    }

}
