import java.util.HashMap;
import java.util.Map;


public class Main {
    public static void main(String[] args) {

        Map<String, Curso> cursos = new HashMap<>();

        cursos.put("01", new Curso("Programación I", "Gómez"));
        cursos.put("02", new Curso("Estructuras de Datos", "Pérez"));
        cursos.put("03", new Curso("POO", "Rodríguez"));
        cursos.put("04", new Curso("Bases de Datos", "Suárez"));

        String claveBuscar = "02";
        Curso recuperado = cursos.get(claveBuscar);
        System.out.println("Curso [" + claveBuscar + "]: " + recuperado);

        System.out.println("\nCursos:");
        for (Map.Entry<String, Curso> entry : cursos.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }
    }
}