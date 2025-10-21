package com.product.apicursos.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.product.apicursos.Entity.Curso;
import com.product.apicursos.Entity.Estudiante;
import com.product.apicursos.Excepcion.ResourceNotFoundException;
import com.product.apicursos.dto.request.CreateEstudianteDTO;
import com.product.apicursos.dto.response.EstudianteResponseDTO;
import com.product.apicursos.mapper.EstudianteMapper;
import com.product.apicursos.repository.EstudianteRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;
    private final EstudianteMapper estudianteMapper;

    public EstudianteResponseDTO createEstudiante(CreateEstudianteDTO dto) {

        if(estudianteRepository.existsByMatricula(dto.getMatricula())) {
            throw new IllegalArgumentException("Ya existe un estudiante con la matrícula: " + dto.getMatricula());
        }

        Estudiante estudiante = estudianteMapper.toEntity(dto);
        Estudiante savedEstudiante = estudianteRepository.save(estudiante);
        return estudianteMapper.toResponse(savedEstudiante);
    }

    public EstudianteResponseDTO updateEstudiante(Long id, CreateEstudianteDTO dto) {
       
        Estudiante estudianteExistente = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con ID: " + id));

        if (!estudianteExistente.getMatricula().equals(dto.getMatricula()) && 
        estudianteRepository.existsByMatricula(dto.getMatricula())) {

            throw new IllegalArgumentException("Ya existe un estudiante con la matrícula: " + dto.getMatricula());
        }

        estudianteExistente.setNombre(dto.getNombre());
        estudianteExistente.setApellido(dto.getApellido());
        estudianteExistente.setEmail(dto.getEmail());
        estudianteExistente.setFechaNacimiento(dto.getFechaNacimiento());
        estudianteExistente.setMatricula(dto.getMatricula());

        Estudiante estudianteActualizado = estudianteRepository.save(estudianteExistente);
        return estudianteMapper.toResponse(estudianteActualizado);
    }

    public void deleteEstudiante(Long id) {
    Estudiante estudiante = estudianteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con ID: " + id));

    // Limpiar relaciones bidireccionales
    for (Curso curso : estudiante.getCursos()) {
        curso.getEstudiantes().remove(estudiante);
    }
    estudiante.getCursos().clear(); // Limpiar también del lado del estudiante
    
    estudianteRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<EstudianteResponseDTO> getAllEstudiantes() {
        List<Estudiante> estudiantes = estudianteRepository.findAll();
        return estudiantes.stream()
                .map(estudianteMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EstudianteResponseDTO getEstudianteById(Long id) {
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con ID: " + id));

        return estudianteMapper.toResponse(estudiante);
    }

}
