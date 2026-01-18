package org.platforma.railwaysystem.service;

import org.platforma.railwaysystem.model.Ruta;
import org.platforma.railwaysystem.repository.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RutaService {
    @Autowired
    private RutaRepository rutaRepository;

    public List<Ruta> getAll() { return rutaRepository.findAll(); }
    public Ruta getById(Long id) { return rutaRepository.findById(id).orElseThrow(); }
    public Ruta create(Ruta r) { return rutaRepository.save(r); }
    public Ruta update(Long id, Ruta r) {
        Ruta existing = getById(id);
        existing.setStatieStart(r.getStatieStart());
        existing.setStatieEnd(r.getStatieEnd());
        existing.setDistantaKm(r.getDistantaKm());
        existing.setCategorieTren(r.getCategorieTren());
        existing.setRangTren(r.getRangTren());
        return rutaRepository.save(existing);
    }
    public void delete(Long id) { rutaRepository.deleteById(id); }
}
