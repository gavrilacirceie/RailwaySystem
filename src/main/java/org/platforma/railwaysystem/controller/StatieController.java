package org.platforma.railwaysystem.controller;

import org.platforma.railwaysystem.model.Statie;
import org.platforma.railwaysystem.service.StatieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statii")
@CrossOrigin(origins="http://localhost:3000")
public class StatieController {
    @Autowired
    private StatieService service;

    @GetMapping
    public List<Statie> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Statie getById(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public Statie create(@RequestBody Statie s) { return service.create(s); }
    @PutMapping("/{id}") public Statie update(@PathVariable Long id,@RequestBody Statie s) { return service.update(id,s); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}

