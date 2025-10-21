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

import com.product.apicursos.dto.request.CreateEstudianteDTO;
import com.product.apicursos.dto.response.EstudianteResponseDTO;
import com.product.apicursos.service.EstudianteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/estudiantes")
@CrossOrigin("*")
@RequiredArgsConstructor
@Validated
public class EstudianteController {
    
    private final EstudianteService estudianteService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<EstudianteResponseDTO> estudiantes = estudianteService.getAllEstudiantes();
            return ResponseEntity.ok(estudiantes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            EstudianteResponseDTO estudiante = estudianteService.getEstudianteById(id);
            return ResponseEntity.ok(estudiante);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createEstudiante(@RequestBody @Valid CreateEstudianteDTO createEstudianteDTO) {
        try {
            EstudianteResponseDTO estudiante = estudianteService.createEstudiante(createEstudianteDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(estudiante);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEstudiante(@PathVariable Long id, 
                                             @RequestBody @Valid CreateEstudianteDTO updateEstudianteDTO) {
        try {
            EstudianteResponseDTO updatedEstudiante = estudianteService.updateEstudiante(id, updateEstudianteDTO);
            return ResponseEntity.ok(updatedEstudiante);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstudiante(@PathVariable Long id) {
        try {
            estudianteService.deleteEstudiante(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}