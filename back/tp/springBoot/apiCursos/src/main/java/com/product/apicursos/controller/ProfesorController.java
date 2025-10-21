package com.product.apicursos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.product.apicursos.dto.request.CreateProfesorDTO;
import com.product.apicursos.dto.response.ProfesorResponseDTO;
import com.product.apicursos.service.ProfesorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/profesores")
@CrossOrigin("*")
@RequiredArgsConstructor
@Validated
public class ProfesorController {
    
    private final ProfesorService profesorService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<ProfesorResponseDTO> profesores = profesorService.findAll();
            return ResponseEntity.ok(profesores);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            ProfesorResponseDTO profesor = profesorService.getProfesorById(id);
            return ResponseEntity.ok(profesor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createProfesor(@RequestBody @Valid CreateProfesorDTO createProfesorDTO) {
        try {
            ProfesorResponseDTO profesor = profesorService.createProfesor(createProfesorDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(profesor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfesor(@PathVariable Long id, 
                                           @RequestBody @Valid CreateProfesorDTO updateProfesorDTO) {
        try {
            ProfesorResponseDTO updatedProfesor = profesorService.updateProfesor(id, updateProfesorDTO);
            return ResponseEntity.ok(updatedProfesor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProfesor(@PathVariable Long id) {
        try {
            profesorService.deleteProfesor(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}