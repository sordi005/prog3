package com.product.apicursos.service;

import com.product.apicursos.Entity.Curso;
import com.product.apicursos.Entity.Estudiante;
import com.product.apicursos.Entity.Profesor;
import com.product.apicursos.Excepcion.ResourceNotFoundException;
import com.product.apicursos.dto.request.CreateCursoDTO;
import com.product.apicursos.dto.response.CursoResponseDTO;
import com.product.apicursos.dto.response.CursoSimpleDTO;
import com.product.apicursos.mapper.CursoMapper;
import com.product.apicursos.repository.CursoRepository;
import com.product.apicursos.repository.EstudianteRepository;
import com.product.apicursos.repository.ProfesorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CursoService {

    private final CursoRepository cursoRepository;
    private final ProfesorRepository profesorRepository;
    private final EstudianteRepository estudianteRepository;
    private final CursoMapper cursoMapper;
    
    // crear
    public CursoResponseDTO createCurso(CreateCursoDTO dto) {

        Profesor profesor = profesorRepository.findById(dto.getProfesorId())
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con ID: " + dto.getProfesorId()));

        if (cursoRepository.existsByName(dto.getNombre())) {
            throw new IllegalArgumentException("Ya existe un curso con el nombre: " + dto.getNombre());
        }

        Curso curso = cursoMapper.toEntity(dto, profesor);

        Curso cursoGuardado = cursoRepository.save(curso);

        return cursoMapper.toResponseDto(cursoGuardado);

    }

    // actualizar
    public CursoResponseDTO updateCurso(Long id, CreateCursoDTO dto) {
        Curso cursoExistente = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + id));

        cursoExistente.setName(dto.getNombre());

        if (dto.getProfesorId() != null &&
            !dto.getProfesorId().equals(cursoExistente.getProfesor().getId())) {

            Profesor nuevoProfesor = profesorRepository.findById(dto.getProfesorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con ID: " + dto.getProfesorId()));
            cursoExistente.setProfesor(nuevoProfesor);

        }
        Curso cursoActualizado = cursoRepository.save(cursoExistente);

        return cursoMapper.toResponseDto(cursoActualizado);
    }

    public void deleteCurso(Long id) {
        if (!cursoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Curso no encontrado con ID: " + id);
        }

        cursoRepository.deleteById(id);
    }

    // agregar estudiante a curso
    public CursoResponseDTO agregarEstudiante(Long cursoId, Long estudianteId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + cursoId));

        Estudiante estudiante = estudianteRepository.findById(estudianteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con ID: " + estudianteId));

        if (curso.getEstudiantes().contains(estudiante)) {
            throw new IllegalArgumentException("El estudiante ya está inscrito en este curso");
        }

        curso.getEstudiantes().add(estudiante);
        estudiante.getCursos().add(curso);

        Curso cursoActualizado = cursoRepository.save(curso);

        return cursoMapper.toResponseDto(cursoActualizado);
    }

    // remover estudiante de curso
    public CursoResponseDTO removerEstudiante(Long cursoId, Long estudianteId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + cursoId));

        Estudiante estudiante = estudianteRepository.findById(estudianteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con ID: " + estudianteId));
        if (!curso.getEstudiantes().contains(estudiante)) {
            throw new IllegalArgumentException("El estudiante no está inscrito en este curso");
        }
        if (!estudiante.getCursos().contains(curso)) {
            throw new IllegalArgumentException("El curso no está asociado con este estudiante");
            
        }
        curso.getEstudiantes().remove(estudiante);
        estudiante.getCursos().remove(curso);

        Curso cursoActualizado = cursoRepository.save(curso);

        return cursoMapper.toResponseDto(cursoActualizado);
    }

    // leer
    @Transactional(readOnly = true)
    public List<CursoSimpleDTO> getAllCursosSimple() {
        return cursoRepository.findAll().stream()
                .map(cursoMapper::toSimpleDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CursoResponseDTO> getAllCursos() {
        return cursoRepository.findAll().stream()
                .map(cursoMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CursoResponseDTO getCursoById(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + id));

        return cursoMapper.toResponseDto(curso);
    }

    @Transactional(readOnly = true)
    public CursoSimpleDTO getCursoSimpleById(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + id));

        return cursoMapper.toSimpleDTO(curso);
    }

    // Buscar cursos por profesor
    @Transactional(readOnly = true)
    public List<CursoSimpleDTO> getCursosByProfesorId(Long profesorId) {
        if (!profesorRepository.existsById(profesorId)) {
            throw new ResourceNotFoundException("Profesor no encontrado con ID: " + profesorId);
        }

        return cursoRepository.findByProfesorId(profesorId).stream()
                .map(cursoMapper::toSimpleDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CursoResponseDTO> getCursosByEstudianteId(Long estudianteId) {
        if (!estudianteRepository.existsById(estudianteId)) {
            throw new ResourceNotFoundException("Estudiante no encontrado con ID: " + estudianteId);
        }

        return cursoRepository.findByEstudiantesId(estudianteId).stream()
                .map(cursoMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    // Verificar si existe
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return cursoRepository.existsById(id);
    }

   
}