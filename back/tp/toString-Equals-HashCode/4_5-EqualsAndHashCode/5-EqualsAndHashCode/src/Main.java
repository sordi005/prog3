import java.util.HashSet;
import java.util.Set;


public class Main {
    public static void main(String[] args) {
        System.out.println("=== TRABAJO PRÁCTICO: EQUALS Y HASHCODE ===\n");

        // Crear un HashSet de productos
        Set<Producto> productos = new HashSet<>();

        // Agregar productos, algunos con códigos repetidos
        productos.add(new Producto("P001", "Laptop", 1500.00));
        productos.add(new Producto("P002", "Mouse", 25.50));
        productos.add(new Producto("P003", "Teclado", 75.00));

        // Intentar agregar productos con códigos repetidos (no se duplicarán)
        productos.add(new Producto("P001", "Laptop Gaming", 2000.00)); // Mismo código P001
        productos.add(new Producto("P002", "Mouse Inalámbrico", 45.00)); // Mismo código P002
        productos.add(new Producto("P003", "Teclado Mecánico", 120.00)); // Mismo código P003

        // Mostrar productos en HashSet (sin duplicados)
        System.out.println("Productos en HashSet (sin duplicados):");
        for (Producto producto : productos) {
            System.out.println(producto);
        }

        System.out.println("\nTotal de productos únicos: " + productos.size());

        // Verificar que hashCode() y equals() son consistentes
        System.out.println("\n=== VERIFICACIÓN DE CONSISTENCIA ===");
        Producto p1 = new Producto("P001", "Producto A", 100.0);
        Producto p2 = new Producto("P001", "Producto B", 200.0);

        System.out.println("¿Son iguales?: " + p1.equals(p2));
        System.out.println("¿Mismo hashCode?: " + (p1.hashCode() == p2.hashCode()));
    }
}