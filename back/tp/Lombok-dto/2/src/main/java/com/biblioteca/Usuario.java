package com.biblioteca;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class Usuario {
    private Long id;
    private String nombre;
    private String email;
}

