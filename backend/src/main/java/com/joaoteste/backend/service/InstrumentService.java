package com.joaoteste.backend.service;

import com.joaoteste.backend.dto.InstrumentDTO;
import com.joaoteste.backend.model.Instrument;
import com.joaoteste.backend.model.InstrumentType;
import com.joaoteste.backend.repository.InstrumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class InstrumentService {

    private final InstrumentRepository repository;

    public InstrumentService(InstrumentRepository repository) {
        this.repository = repository;
    }

    public Instrument create(InstrumentDTO dto) {
        Instrument instrument = new Instrument();

        instrument.setId(UUID.randomUUID());
        instrument.setName(dto.getName());
        instrument.setType(parseType(dto.getType()));
        instrument.setBrand(dto.getBrand());
        instrument.setModel(dto.getModel());
        instrument.setPrice(dto.getPrice());
        instrument.setStock(dto.getStock());

        repository.save(instrument);

        return instrument;
    }

    public List<Instrument> getAll() {
        return repository.findAll();
    }

    public Instrument getById(UUID id) {
        Instrument instrument = repository.findById(id);

        if (instrument == null) {
            throw new ResponseStatusException(NOT_FOUND, "Instrument not found with id: " + id);
        }

        return instrument;
    }

    private InstrumentType parseType(String type) {
        try {
            return InstrumentType.valueOf(type.toUpperCase());
        } catch (Exception ex) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid instrument type: " + type);
        }
    }

    public void deleteById(UUID id) {
        boolean deleted = repository.deleteById(id);

        if (!deleted) {
            throw new ResponseStatusException(NOT_FOUND, "Instrument not found with id: " + id);
        }
    }

    public Instrument update(UUID id, InstrumentDTO dto) {
        Instrument existing = repository.findById(id);

        if (existing == null) {
            throw new ResponseStatusException(NOT_FOUND, "Instrument not found with id: " + id);
        }

        existing.setName(dto.getName());
        existing.setType(parseType(dto.getType()));
        existing.setBrand(dto.getBrand());
        existing.setModel(dto.getModel());
        existing.setPrice(dto.getPrice());
        existing.setStock(dto.getStock());

        repository.update(existing);

        return existing;
    }
}