import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Alumno> alumnos = new ArrayList<>();
        alumnos.add(new Alumno("Ana", 9.1));
        alumnos.add(new Alumno("Luis", 7.5));
        alumnos.add(new Alumno("Marta", 8.0));
        alumnos.add(new Alumno("Ana", 9.1)); // duplicado permitido

        for (Alumno alumno : alumnos) {
            System.out.println(alumno);
        }
    }
}