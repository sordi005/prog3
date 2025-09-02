import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class Main {
    public static void main(String[] args) {

        try {
            Class<?> clazzConstructor = Class.forName("Persona");

            System.out.println("Constructores:");
            Constructor<?>[] constructor = clazzConstructor.getConstructors();
            for (Constructor<?> c : constructor) {
                System.out.println(c);
            }
        }catch(ClassNotFoundException e) {
                e.printStackTrace();
            }

        try{
            Class<?> clazzInstance = Class.forName("Persona");

            System.out.println("\nCreando instancia con constructor vacío:");
            Constructor<?> constructor = clazzInstance.getConstructor();
            Object instance1 = constructor.newInstance();
            System.out.println("Instancia: " + instance1);

            System.out.println("\nCreando instancia con constructor sobrecargado:");
            Constructor<?> constructors = clazzInstance.getConstructor(String.class, int.class);
            Object instance2 = constructors.newInstance("Juan", 30);
            System.out.println("Instancia: " + instance2);

            System.out.println("\nManipulando Nombre:");
            Field campoNombre = clazzInstance.getDeclaredField("nombre");
            campoNombre.setAccessible(true);
            campoNombre.set(instance2, "Pedro");

            System.out.println("\nValor establecido");
            System.out.println("Nombre: " + campoNombre.get(instance2));

            System.out.println("\nMostrando instancia modificada:");
            Method methodToString = clazzInstance.getMethod("toString");
            System.out.println("toString: " + methodToString.invoke(instance2));

            System.out.println("\nInvocando método saludar:");
            Method methodSaludar = clazzInstance.getMethod("saludar");
            Object resultado = methodSaludar.invoke(instance2);
            System.out.println("Resultado del saludo: " + resultado);

            System.out.println("\nDemostrando control de accesibilidad del método saludar:");
            Method methodSaludarPrivado = clazzInstance.getDeclaredMethod("saludar");

            // En versiones modernas de Java, no podemos modificar directamente los modifiers
            // Pero podemos demostrar el control de accesibilidad con setAccessible
            System.out.println("Método saludar es público: " + Modifier.isPublic(methodSaludarPrivado.getModifiers()));

            // Simulamos restricción de acceso
            methodSaludarPrivado.setAccessible(false);
            System.out.println("Acceso por reflexión restringido con setAccessible(false)");

            // Restauramos acceso para demostrar
            methodSaludarPrivado.setAccessible(true);
            Object resultadoPrivado = methodSaludarPrivado.invoke(instance2);
            System.out.println("Resultado después de restaurar acceso: " + resultadoPrivado);

            System.out.println("\nMétodos de la clase y su visibilidad:");
            Method[] methods = clazzInstance.getDeclaredMethods();
            for (Method m : methods) {
                String visibility = Modifier.isPrivate(m.getModifiers()) ? "private" :
                                  Modifier.isPublic(m.getModifiers()) ? "public" :
                                  Modifier.isProtected(m.getModifiers()) ? "protected" : "package-private";
                System.out.println(visibility + " " + m.getName() + "()");
            }

        } catch (Exception e){
            e.printStackTrace();
        }

    }
}