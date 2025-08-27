
package models;

class Persona {
    protected String nombre;
    protected int edad;

    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public String toString() {
        return "Persona{nombre='" + this.nombre + "', edad=" + this.edad + "}";
    }
}
