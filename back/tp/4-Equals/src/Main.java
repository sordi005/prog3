import java.util.ArrayList;
import java.util.List;

/**
 * Programa principal que demuestra el uso del método equals() en Java
 * para comparar objetos por contenido en lugar de por referencia.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== TRABAJO PRÁCTICO 4: MÉTODO EQUALS() ===\n");

        System.out.println("CREANDO PRODUCTOS:");
        Producto producto1 = new Producto("01", "Laptop Dell", 1200.50);
        Producto producto2 = new Producto("01", "Mouse Logitech", 25.99);
        Producto producto3 = new Producto("03", "Laptop HP", 1100.00); // Mismo código
        Producto producto4 = new Producto("04", "Teclado", 89.99);

        System.out.println("Producto1: " + producto1);
        System.out.println("Producto2: " + producto2);
        System.out.println("Producto3: " + producto3);
        System.out.println("Producto4: " + producto4);

        System.out.println("\nCOMPARANDO CON EQUALS():");
        System.out.println("producto1.equals(producto3): " + producto1.equals(producto3));
        System.out.println("producto1.equals(producto2): " + producto1.equals(producto2));

        System.out.println("\nVERIFICANDO HASHCODE:");
        System.out.println("HashCode producto1: " + producto1.hashCode());
        System.out.println("HashCode producto3: " + producto3.hashCode());
        System.out.println("Mismo hashCode:" + (producto1.hashCode() == producto3.hashCode()));

        System.out.println("\n4CREANDO LISTA SIN DUPLICADOS:");
        List<Producto> productos = new ArrayList<>();

        if (!productos.contains(producto1)) {
            productos.add(producto1);
            System.out.println("Agregado: " + producto1);
        }

        if (!productos.contains(producto2)) {
            productos.add(producto2);
            System.out.println("✓ Agregado: " + producto2);
        }

        if (!productos.contains(producto3)) {
            productos.add(producto3);
            System.out.println("✓ Agregado: " + producto3);
        } else {
            System.out.println("⚠ Duplicado no agregado: " + producto3);
        }

        if (!productos.contains(producto4)) {
            productos.add(producto4);
            System.out.println("✓ Agregado: " + producto4);
        }

        System.out.println("\nLISTA FINAL DE PRODUCTOS:");
        for (int i = 0; i < productos.size(); i++) {
            System.out.println((i + 1) + ". " + productos.get(i));
        }

        System.out.println("\nTotal de productos únicos: " + productos.size());
    }
}