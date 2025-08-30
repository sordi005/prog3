public class Curso {
    private String nombre;
    private String docente;

    // Constructor
    public Curso(String nombre, String docente) {
        this.nombre = nombre;
        this.docente = docente;
    }

    public String getNombre() { return nombre; }
    public String getDocente() { return docente; }

    @Override
    public String toString() {
        return "Curso{nombre='" + nombre + "', docente='" + docente + "'}";
    }
}
