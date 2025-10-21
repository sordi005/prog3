package com.product.apicursos.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CursoResponseDTO {
    private Long id;
    private String nombre;
    private ProfesorSimpleDTO profesor;
    private List<EstudianteSimpleDTO> estudiantes;
}
