package com.product.apicursos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EstudiateSimpleDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String matricula;
}
