import java.util.HashSet;
import java.util.Set;


public class Main {
    public static void main(String[] args) {

        Set<Producto> productos = new HashSet<>();

        productos.add(new Producto("A1", "Leche"));
        productos.add(new Producto("A2", "Pan"));
        productos.add(new Producto("A3", "Queso"));

        boolean agregado = productos.add(new Producto("A1", "Leche entera"));
        System.out.println("Se agregó el duplicado con código A1: " + agregado);

        System.out.println("Tamaño del set (sin duplicados por código): " + productos.size());
        System.out.println("Contenido del set:");
        for (Producto p : productos) {
            System.out.println(p);
        }
    }
}