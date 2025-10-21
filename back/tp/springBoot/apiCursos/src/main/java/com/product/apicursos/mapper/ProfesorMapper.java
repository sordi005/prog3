package com.product.apicursos.mapper;

import com.product.apicursos.Entity.Profesor;
import com.product.apicursos.dto.request.CreateProfesorDTO;
import com.product.apicursos.dto.response.ProfesorResponseDTO;
import com.product.apicursos.dto.response.ProfesorSimpleDTO;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class ProfesorMapper {

    private final CursoMapper cursoMapper;

    public ProfesorMapper(CursoMapper cursoMapper) {
        this.cursoMapper = cursoMapper;
    }

    public Profesor toEntity(CreateProfesorDTO dto) {
        if (dto == null) {
            return null;
        }
        return Profesor.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .email(dto.getEmail())
                .fechaNacimiento(dto.getFechaNacimiento())
                .build();
    }

    public CreateProfesorDTO toDTO(Profesor entity) {
        if (entity == null) {
            return null;
        }
        return CreateProfesorDTO.builder()
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .email(entity.getEmail())
                .fechaNacimiento(entity.getFechaNacimiento())
                .build();
    }

    public ProfesorSimpleDTO simpleDTO(Profesor entity) {
        if (entity == null) {
            return null;
        }
        return ProfesorSimpleDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .build();
    }

    public ProfesorResponseDTO toResponseDto(Profesor entity) {
        if (entity == null) {
            return null;
        }
        return ProfesorResponseDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .email(entity.getEmail())
                .fechaNacimiento(entity.getFechaNacimiento())
                .cursos(entity.getCursos() != null
                        ? entity.getCursos().stream()
                        .map(cursoMapper::toSimpleDTO)
                        .collect(Collectors.toList())
                        : Collections.emptyList())
                .build();
    }

}
