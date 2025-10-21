package com.product.apicursos.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class EstudianteResponseDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String matricula;
    private LocalDate fechaNacimiento;
    private List<CursoSimpleDTO> cursos;
}
