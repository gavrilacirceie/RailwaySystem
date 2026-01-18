package org.platforma.railwaysystem.controller;

import org.platforma.railwaysystem.model.Tren;
import org.platforma.railwaysystem.service.TrenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/trenuri")
@CrossOrigin(origins = "http://localhost:3000")
public class TrenController {

    @Autowired
    private TrenService trenService;

    @GetMapping
    public List<Tren> getAllTrenuri() {
        return trenService.getAllTrenuri();
    }

    @GetMapping("/{id}")
    public Tren getTrenById(@PathVariable Long id) {
        return trenService.getTrenById(id);
    }

    @PostMapping
    public Tren createTren(@RequestBody Tren tren) {
        return trenService.createTren(tren);
    }

    @PutMapping("/{id}")
    public Tren updateTren(@PathVariable Long id, @RequestBody Tren tren) {
        return trenService.updateTren(id, tren);
    }

    @DeleteMapping("/{id}")
    public void deleteTren(@PathVariable Long id) {
        trenService.deleteTren(id);
    }

    @GetMapping("/ruta/{rutaId}")
    public List<Tren> getTrenuriByRuta(@PathVariable String rutaId) {
        return trenService.getTrenuriByRuta(Long.valueOf(rutaId));
    }
    @GetMapping("/dataPlecare/{dataPlecare}")
    public List<Tren> getTrenuriByDataPlecare(@PathVariable LocalDate dataPlecare) {
        return trenService.getTrenuriByDataPlecare(dataPlecare);
    }
    @GetMapping("/dataSosire/{dataSosire}")
    public List<Tren> getTrenuriByDataSosire(@PathVariable LocalDate dataSosire) {
        return trenService.getTrenuriByDataSosire(dataSosire);
    }
}
