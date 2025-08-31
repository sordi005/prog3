package com.biblioteca;


import java.util.*;

public class Main {
    public static void main(String[] args) {
        Producto p1 = new Producto("A001", "Lapicera", "Bic", 25.5);
        Producto p2 = new Producto("A002", "Cuaderno", "Rivadavia", 120.0);
        Producto p3 = new Producto("A003", "Goma", "Pelikan", 15.0);

        ProductoRecord r1 = new ProductoRecord("B001", "Regla", 30.0);
        ProductoRecord r2 = new ProductoRecord("B002", "Cartuchera", 200.0);

        ProductoRecord r3 = new ProductoRecord(p1);
        ProductoRecord r4 = new ProductoRecord(p2);
        ProductoRecord r5 = new ProductoRecord(p3);

        List<Object> productos = new ArrayList<>();
        productos.add(p1);
        productos.add(p2);
        productos.add(p3);
        productos.add(r1);
        productos.add(r2);
        productos.add(r3);
        productos.add(r4);
        productos.add(r5);

        System.out.println("Lista de productos:");
        for (Object prod : productos) {
            System.out.println(prod);
        }
    }
}