public class Alumno {
    private String nombre;
    private double nota;
    private String curso;

    public Alumno(String nombre, double nota, String curso) {
        this.nombre = nombre;
        this.nota = nota;
        this.curso = curso;
    }

    public String getNombre() { return nombre; }
    public double getNota() { return nota; }
    public String getCurso() { return curso; }


}