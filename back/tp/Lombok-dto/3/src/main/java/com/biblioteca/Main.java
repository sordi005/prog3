package com.biblioteca;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Producto prod1 = new Producto("P001", "Libro Java", 1500.0, "Juan Perez");
        Producto prod2 = new Producto("P002", "Libro Python", 1800.0, "Ana Gomez");
        Producto prod3 = new Producto("P003", "Libro C++", 1200.0, "Luis Torres");

        ProductoDTO dto1 = new ProductoDTO();
        dto1.setCodigo(prod1.getCodigo());
        dto1.setNombre(prod1.getNombre());
        dto1.setPrecio(prod1.getPrecio());

        ProductoDTO dto2 = new ProductoDTO();
        dto2.setCodigo(prod2.getCodigo());
        dto2.setNombre(prod2.getNombre());
        dto2.setPrecio(prod2.getPrecio());

        ProductoDTO dto3 = new ProductoDTO();
        dto3.setCodigo(prod3.getCodigo());
        dto3.setNombre(prod3.getNombre());
        dto3.setPrecio(prod3.getPrecio());

        List<ProductoDTO> listaDTO = new ArrayList<>();
        listaDTO.add(dto1);
        listaDTO.add(dto2);
        listaDTO.add(dto3);

        System.out.println("Lista de ProductoDTO:");
        for (ProductoDTO dto : listaDTO) {
            System.out.println("Codigo: " + dto.getCodigo() + ", Nombre: " + dto.getNombre() + ", Precio: " + dto.getPrecio());
        }
    }
}