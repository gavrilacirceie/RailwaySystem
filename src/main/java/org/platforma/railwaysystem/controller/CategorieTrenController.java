package org.platforma.railwaysystem.controller;

import org.platforma.railwaysystem.model.CategorieTren;
import org.platforma.railwaysystem.repository.CategorieTrenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorii-tren")
@CrossOrigin(origins = "http://localhost:3000")
public class CategorieTrenController {
    @Autowired
    private CategorieTrenRepository repository;

    @GetMapping
    public List<CategorieTren> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public CategorieTren getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public CategorieTren create(@RequestBody CategorieTren c) {
        return repository.save(c);
    }

    @PutMapping("/{id}")
    public CategorieTren update(@PathVariable Long id, @RequestBody CategorieTren c) {
        CategorieTren existing = getById(id);
        existing.setNume(c.getNume());
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
