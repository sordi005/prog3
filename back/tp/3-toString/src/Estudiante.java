public class Estudiante {
    private String nombre;
    private int legajo;

    public Estudiante(String nombre, int legajo) {
        this.nombre = nombre;
        this.legajo = legajo;
    }

    public String getNombre() {
        return nombre;
    }

    public int getLegajo() {
        return legajo;
    }

    @Override
    public String toString() {
        return "Estudiante: " + nombre + " (Legajo: " + legajo + ")";
    }
}

