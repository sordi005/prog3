import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {


        List <Producto> productos = List.of(
                new Producto("Manzana", "fruta",200.50, 100),
                new Producto("Banana", "fruta",100.0 , 150),
                new Producto("lechuga", "verdura",400.1, 80),
                new Producto("rucula", "verdura",250.75, 50)
        );
        System.out.println("\nProductos con precio mayor a 100:");
        productos.stream()
                .filter(producto -> producto.getPrecio() > 100)
                .map(Producto::getNombre)
                .sorted()
                .limit(3)
                .forEach(System.out::println);


        Map<String, Integer> prodPorCategoria = productos.stream()
                .collect(Collectors.groupingBy(
                        Producto::getCategoria,
                        Collectors.summingInt(Producto::getStock)));
        System.out.println("\nStock por categoria:");
        prodPorCategoria.forEach((categoria, stock) ->
                System.out.println(categoria + ": " + stock));

        String todosLosProductos = productos.stream()
                .map(p -> p.getNombre() + "= $" + p.getPrecio())
                .collect(Collectors.joining(" ; " ));

        System.out.println("\nTodos los productos:");
        System.out.println(todosLosProductos);


        System.out.println("\nPromedio General por categoria: ");
        Map<String, Double> precioPorCategoria = productos.stream()
                .collect(Collectors.groupingBy(
                        Producto::getCategoria,
                        Collectors.summingDouble(Producto::getPrecio)));

        precioPorCategoria.forEach((categoria, precio) ->
                System.out.println(categoria + ": $" + precio));


    }
}