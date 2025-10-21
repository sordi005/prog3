package com.product.apicursos.mapper;

import com.product.apicursos.Entity.Estudiante;
import com.product.apicursos.dto.request.CreateEstudianteDTO;
import com.product.apicursos.dto.response.EstudianteResponseDTO;
import com.product.apicursos.dto.response.EstudianteSimpleDTO;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class EstudianteMapper {

    private final CursoMapper cursoMapper;

    public EstudianteMapper(CursoMapper cursoMapper) {
        this.cursoMapper = cursoMapper;
    }

    public Estudiante toEntity(CreateEstudianteDTO dto) {
       return Estudiante.builder()
               .nombre(dto.getNombre())
               .apellido(dto.getApellido())
               .email(dto.getEmail())
               .matricula(dto.getMatricula())
               .fechaNacimiento(dto.getFechaNacimiento())
               .build();
    }

    public EstudianteResponseDTO toResponse(Estudiante entity) {
        return EstudianteResponseDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .email(entity.getEmail())
                .matricula(entity.getMatricula())
                .fechaNacimiento(entity.getFechaNacimiento())
                .cursos(entity.getCursos() != null
                        ? entity.getCursos().stream()
                            .map(cursoMapper::toSimpleDTO)
                            .collect(Collectors.toList())
                        : Collections.emptyList())
                .build();

    }

    public EstudianteSimpleDTO toSimpleDTO(Estudiante entity) {
        return EstudianteSimpleDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .matricula(entity.getMatricula())
                .build();
    }



}
