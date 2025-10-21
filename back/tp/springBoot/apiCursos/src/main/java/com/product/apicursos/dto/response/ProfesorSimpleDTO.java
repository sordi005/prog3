package com.product.apicursos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfesorSimpleDTO {
    private Long id;
    private String nombre;
    private String apellido;
}
