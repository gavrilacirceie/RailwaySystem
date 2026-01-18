package org.platforma.railwaysystem.controller;

import org.platforma.railwaysystem.model.Ruta;
import org.platforma.railwaysystem.service.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rute")
@CrossOrigin(origins="http://localhost:3000")
public class RutaController {
    @Autowired
    private RutaService service;

    @GetMapping
    public List<Ruta> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Ruta getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public Ruta create(@RequestBody Ruta r) { return service.create(r); }
    @PutMapping("/{id}") public Ruta update(@PathVariable Long id,@RequestBody Ruta r) { return service.update(id,r); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
