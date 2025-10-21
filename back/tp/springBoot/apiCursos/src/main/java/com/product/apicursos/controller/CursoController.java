package com.product.apicursos.controller;

import com.product.apicursos.dto.request.CreateCursoDTO;
import com.product.apicursos.dto.response.CursoResponseDTO;
import com.product.apicursos.dto.response.CursoSimpleDTO;
import com.product.apicursos.service.CursoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/cursos")
@CrossOrigin("*")
@RequiredArgsConstructor
@Validated
public class CursoController {

    private final CursoService cursoService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<CursoResponseDTO> cursos = cursoService.getAllCursos();
            return ResponseEntity.ok(cursos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/simple")
    public ResponseEntity<?> getAllSimple() {
        try {
            List<CursoSimpleDTO> cursos = cursoService.getAllCursosSimple();
            return ResponseEntity.ok(cursos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            CursoResponseDTO curso = cursoService.getCursoById(id);
            return ResponseEntity.ok(curso);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/simple")
    public ResponseEntity<?> getSimpleById(@PathVariable Long id) {
        try {
            CursoSimpleDTO dto = cursoService.getCursoSimpleById(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<?> getByEstudianteId(@PathVariable Long estudianteId) {
        try {
            List<CursoResponseDTO> cursos = cursoService.getCursosByEstudianteId(estudianteId);
            return ResponseEntity.ok(cursos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createCurso(@RequestBody @Valid CreateCursoDTO createCursoDTO) {
        try {
            CursoResponseDTO curso = cursoService.createCurso(createCursoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(curso);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCurso(@PathVariable Long id, @RequestBody @Valid CreateCursoDTO updateCursoDTO) {
        try {
            CursoResponseDTO updatedCurso = cursoService.updateCurso(id, updateCursoDTO);
            return ResponseEntity.ok(updatedCurso);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCurso(@PathVariable Long id) {
        try {
            cursoService.deleteCurso(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{cursoId}/estudiantes/{estudianteId}")
    public ResponseEntity<?> agregarEstudiante(@PathVariable Long cursoId, @PathVariable Long estudianteId) {
        try {
            CursoResponseDTO curso = cursoService.agregarEstudiante(cursoId, estudianteId);
            return ResponseEntity.ok(curso);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{cursoId}/estudiantes/{estudianteId}")
    public ResponseEntity<?> removerEstudiante(@PathVariable Long cursoId, @PathVariable Long estudianteId) {
        try {
            CursoResponseDTO curso = cursoService.removerEstudiante(cursoId, estudianteId);
            return ResponseEntity.ok(curso);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}