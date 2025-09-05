import java.util.ArrayList;
import java.util.List;

// src/Main.java
public class Main {
    public static void main(String[] args) {
        Caja<String> caja1 = new Caja<>(String.class);
        caja1.guardar("Hola");
        System.out.println("Tipo de caja1: " + caja1.getTipo().getSimpleName());

        Caja<Integer> caja2 = new Caja<>(Integer.class);
        caja2.guardar(123);
        System.out.println("Tipo de caja2: " + caja2.getTipo().getSimpleName());

        System.out.println("Comparación con colecciojnes sin genericos:");
        List lista = new ArrayList();
        lista.add("Texto");
        lista.add(123); // Se permite mezclar tipos

        String texto = (String) lista.get(0); // Correcto
        try {
            String numero = (String) lista.get(1); // Error en tiempo de ejecución: ClassCastException
        }catch (ClassCastException e) {
            System.out.println("No lanza excepcion debido a que java no tiene chequeo en tiempo de compilacion");
            System.out.println("Error de casteo: " + e.getMessage());
        }
        System.out.println(lista);
    }
}