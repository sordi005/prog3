import java.util.List;
import java.util.Arrays;

public class Main {
    public static <T> void imprimirLista(List<T> lista) {
        for (T elemento : lista) {
            System.out.println(elemento);
        }
    }

    public static void main(String[] args) {
        List<Integer> listaEnteros = Arrays.asList(1, 2, 3, 4, 5);
        List<String> listaCadenas = Arrays.asList("uno", "dos", "tres");

        System.out.println("Lista de enteros:");
        imprimirLista(listaEnteros);

        System.out.println("Lista de cadenas:");
        imprimirLista(listaCadenas);
    }
}