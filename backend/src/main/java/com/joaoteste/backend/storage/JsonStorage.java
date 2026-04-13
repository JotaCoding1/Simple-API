package com.joaoteste.backend.storage;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joaoteste.backend.model.Instrument;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class JsonStorage {

    private static final String FILE_PATH = "instruments.json";
    private final ObjectMapper mapper = new ObjectMapper();

    //To do: Fazer o processo similar feito no delete para o read, para evitar que tenhamos
    //  mais de um processo lendo ao mesmo tempo.
    public List<Instrument> read() {
        try {
            File file = new File(FILE_PATH);

            if (!file.exists()) return new ArrayList<>();

            return mapper.readValue(file, new TypeReference<List<Instrument>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Error reading JSON", e);
        }
    }
    //To do: Fazer o processo similar feito no delete para o write, para evitar que tenhamos
    //  mais de um processo escrevendo ao mesmo tempo.
    public void write(List<Instrument> instruments) {
        try {
            mapper.writeValue(new File(FILE_PATH), instruments);
        } catch (Exception e) {
            throw new RuntimeException("Error writing JSON", e);
        }
    }

    public void clear() {
        write(new ArrayList<>());
    }
    //Usando synchronized para possibilitar mais de um delete ao mesmo tempo. 
    //Considerado boas práticas 
    public synchronized boolean deleteById(UUID id) {
        List<Instrument> instruments = read();
        boolean removed = instruments.removeIf(i -> i.getId() != null && i.getId().equals(id));

        if (removed) {
            write(instruments);
        }

        return removed;
    }

    public synchronized void update(Instrument updatedInstrument) {
        List<Instrument> instruments = read();
        boolean updated = false;

        for (int i = 0; i < instruments.size(); i++) {
            if (instruments.get(i).getId().equals(updatedInstrument.getId())) {
                instruments.set(i, updatedInstrument);
                updated = true;
                break;
            }
        }

        if (updated) {
            write(instruments);
        } else {
            throw new RuntimeException("Instrument not found with id: " + updatedInstrument.getId());
        }
    }

    
}