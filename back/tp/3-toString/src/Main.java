
public class Main {
    public static void main(String[] args) {
        Curso curso1 = new Curso("Estructuras de Datos", "Prof. Carlos Ruiz");
        Curso curso2 = new Curso("Programación III", "Prof. Ana Gómez");

        curso1.agregarEstudiante(new Estudiante("Juan Pérez", 1001));
        curso1.agregarEstudiante(new Estudiante("María López", 1002));
        curso1.agregarEstudiante(new Estudiante("Pedro Sánchez", 1003));

        curso2.agregarEstudiante(new Estudiante("Lucía Fernández", 2001));
        curso2.agregarEstudiante(new Estudiante("Sofía Martínez", 2002));

        System.out.println(curso1);
        System.out.println(curso2);
    }
}