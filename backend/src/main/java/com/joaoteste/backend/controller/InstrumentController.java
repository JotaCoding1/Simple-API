package com.joaoteste.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.joaoteste.backend.dto.InstrumentDTO;
import com.joaoteste.backend.model.Instrument;
import com.joaoteste.backend.service.InstrumentService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/instruments")
public class InstrumentController {

    private final InstrumentService service;

    public InstrumentController(InstrumentService service) {
        this.service = service;
    }

    @PostMapping
    public Instrument create(@RequestBody InstrumentDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<Instrument> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Instrument getById(@PathVariable UUID id) {
        return service.getById(id);
    
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable UUID id) {
        service.deleteById(id);
    }

    @PutMapping("/{id}")
    public Instrument update(@PathVariable UUID id, @RequestBody InstrumentDTO dto) {
        return service.update(id, dto);
    }
}