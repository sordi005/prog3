import java.util.*;
import java.util.stream.*;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        List<Alumno> alumnos = Arrays.asList(
            new Alumno("Ana", 8.5, "1A"),
            new Alumno("Luis", 6.0, "1A"),
            new Alumno("Marta", 9.0, "2B"),
            new Alumno("Pedro", 7.5, "2B"),
            new Alumno("Juan", 5.5, "1A"),
            new Alumno("Lucía", 10.0, "2B")
        );

        List<String> aprobados = alumnos.stream()
            .filter(a -> a.getNota() >= 7)
            .map(a -> a.getNombre().toUpperCase())
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Aprobados: " + aprobados);

        double promedio = alumnos.stream()
            .mapToDouble(Alumno::getNota)
            .average()
            .orElse(0.0);
        System.out.println("Promedio general: " + promedio);


        Map<String, List<Alumno>> agrupados = alumnos.stream()
            .collect(Collectors.groupingBy(Alumno::getCurso));
        System.out.println("Agrupados por curso: " + agrupados );

        List<Alumno> top3 = alumnos.stream()
            .sorted(Comparator.comparingDouble(Alumno::getNota).reversed())
            .limit(3)
            .collect(Collectors.toList());
        System.out.println("Top 3 promedios: " + top3.stream().map(Alumno::getNombre).collect(Collectors.toList()));
    }
}