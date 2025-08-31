package com.biblioteca;

public class Main {
    public static void main(String[] args) {


        // Crear instancias de Usuario usando Builder
        Usuario usuario1 = Usuario.builder()
                .id(1L)
                .nombre("Ana")
                .email("ana@email.com")
                .build();
        Usuario usuario2 = Usuario.builder()
                .id(2L)
                .nombre("Luis")
                .email("luis@email.com")
                .build();

        // Imprimir datos de los usuarios
        System.out.println("Usuario 1: " + usuario1);
        System.out.println("Usuario 2: " + usuario2);
    }
}