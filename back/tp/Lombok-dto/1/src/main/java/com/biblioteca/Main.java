package com.biblioteca;


public class Main {
    public static void main(String[] args) {

        // Instancia usando constructor lleno
        Persona persona1 = new Persona("Juan", 25);
        System.out.println("Persona1: nombre=" + persona1.getNombre() + ", edad=" + persona1.getEdad());

        // Instancia usando constructor vacío e setters
        Persona persona2 = new Persona();
        persona2.setNombre("Ana");
        persona2.setEdad(30);
        System.out.println("Persona2: nombre=" + persona2.getNombre() + ", edad=" + persona2.getEdad());
    }
}