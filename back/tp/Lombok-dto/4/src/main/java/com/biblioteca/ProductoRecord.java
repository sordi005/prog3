package com.biblioteca;

public record ProductoRecord(String codigo, String nombre, double precio) {
    public ProductoRecord(Producto producto) {
        this(producto.getCodigo(), producto.getNombre(), producto.getPrecio());
    }

    @Override
    public String toString() {
        return "ProductoRecord{" +
                "codigo='" + codigo + '\'' +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                '}';
    }
}
