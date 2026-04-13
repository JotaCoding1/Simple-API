package com.joaoteste.backend.repository;

import com.joaoteste.backend.model.Instrument;
import com.joaoteste.backend.storage.JsonStorage;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class InstrumentRepository {

    private final JsonStorage storage;

    public InstrumentRepository(JsonStorage storage) {
        this.storage = storage;
    }

    public List<Instrument> findAll() {
        return storage.read();
    }

    public void save(Instrument instrument) {
        List<Instrument> list = storage.read();
        list.add(instrument);
        storage.write(list);
    }

    public Instrument findById(UUID id) {
        return storage.read()
                .stream()
                .filter(i -> i.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public boolean deleteById(UUID id) {
        return storage.deleteById(id);
    }

    public void update(Instrument instrument) {
        storage.update(instrument);
    }
}