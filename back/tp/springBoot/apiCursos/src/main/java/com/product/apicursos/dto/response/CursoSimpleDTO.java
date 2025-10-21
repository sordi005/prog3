package com.product.apicursos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CursoSimpleDTO {
    private Long id;
    private String nombre;
}
