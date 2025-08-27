package models;

public class Estudiante extends Persona {
    private String carrera;

    public Estudiante(String nombre, int edad, String carrera) {
        super(nombre, edad);
        this.carrera = carrera;
    }

    public String toString() {
        String var10000 = super.toString().substring(7, super.toString().length() - 1);
        return "Estudiante{" + var10000 + ", carrera='" + this.carrera + "'}";
    }
}
