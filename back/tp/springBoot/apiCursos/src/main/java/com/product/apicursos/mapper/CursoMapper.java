package com.product.apicursos.mapper;

import com.product.apicursos.Entity.Curso;
import com.product.apicursos.Entity.Profesor;
import com.product.apicursos.dto.request.CreateCursoDTO;
import com.product.apicursos.dto.response.CursoResponseDTO;
import com.product.apicursos.dto.response.CursoSimpleDTO;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class CursoMapper {

    private final EstudianteMapper estudianteMapper;
    private  final ProfesorMapper profesorMapper;

    // Lazy para evitar dependencia circular
    public CursoMapper(@Lazy EstudianteMapper estudianteMapper, ProfesorMapper profesorMapper) {
        this.estudianteMapper = estudianteMapper;
        this.profesorMapper = profesorMapper;
    }

    public Curso toEntity (CreateCursoDTO dto, Profesor profesorEntity) {
        if (dto == null) {
            return null;
        }
        return Curso.builder()
                .name(dto.getNombre())
                .profesor(profesorEntity)
                .build();
    }

    public CursoSimpleDTO toSimpleDTO(Curso curso) {
        if (curso == null) {
            return null;
        }
        return CursoSimpleDTO.builder()
                .id(curso.getId())
                .nombre(curso.getName())
                .build();
    }

    public CursoResponseDTO toResponseDto(Curso entity) {
        if (entity == null) {
            return null;
        }
        return CursoResponseDTO.builder()
                .id(entity.getId())
                .nombre(entity.getName())
                .profesor(profesorMapper.simpleDTO(entity.getProfesor()))
                .estudiantes(entity.getEstudiantes()  != null
                        ? entity.getEstudiantes().stream()
                        .map(estudianteMapper::toSimpleDTO)
                        .collect(Collectors.toList())
                        : Collections.emptyList())
                .build();
    }


}
