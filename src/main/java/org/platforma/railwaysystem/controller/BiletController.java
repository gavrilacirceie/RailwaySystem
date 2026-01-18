package org.platforma.railwaysystem.controller;

import org.platforma.railwaysystem.model.Bilet;
import org.platforma.railwaysystem.service.BiletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/bilete")
@CrossOrigin(origins="http://localhost:3000")
public class BiletController {
    @Autowired
    private BiletService service;

    @GetMapping
    public List<Bilet> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Bilet getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public Bilet create(@RequestBody Bilet b) { return service.create(b); }
    @PutMapping("/{id}") public Bilet update(@PathVariable Long id,@RequestBody Bilet b) { return service.update(id,b); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }

    @GetMapping("/incasari/zi")
    public Double incasariZi(@RequestParam String data, @RequestParam Long categorieId){
        LocalDate d = LocalDate.parse(data);
        return service.incasariZi(d, categorieId);
    }

    @GetMapping("/incasari/luna")
    public Double incasariLuna(@RequestParam int luna, @RequestParam int an, @RequestParam Long categorieId){
        return service.incasariLuna(luna, an, categorieId);
    }
}

