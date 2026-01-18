package org.platforma.railwaysystem.service;

import org.platforma.railwaysystem.model.Statie;
import org.platforma.railwaysystem.repository.StatieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatieService {
    @Autowired
    private StatieRepository statieRepository;

    public List<Statie> getAll() { return statieRepository.findAll(); }
    public Statie getById(Long id) { return statieRepository.findById(id).orElseThrow(); }
    public Statie create(Statie s) { return statieRepository.save(s); }
    public Statie update(Long id, Statie s) {
        Statie existing = getById(id);
        existing.setNume(s.getNume());
        return statieRepository.save(existing);
    }
    public void delete(Long id) { statieRepository.deleteById(id); }
}
