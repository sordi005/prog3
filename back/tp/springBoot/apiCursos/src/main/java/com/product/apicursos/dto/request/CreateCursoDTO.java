package com.product.apicursos.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCursoDTO {

    @NotBlank(message = "Nombre obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener mínimo 3 y máximo 50 caracteres")
    private String nombre;

    @NotNull(message = "Profesor obligatorio")
    private Long profesorId;
}
