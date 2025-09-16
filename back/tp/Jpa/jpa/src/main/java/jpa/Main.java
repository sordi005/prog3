package jpa;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Crear la fábrica de EntityManager (se crea una sola vez en toda la app)
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("miUnidad");
        EntityManager em = emf.createEntityManager();

        try {
            // ============================
            // CREATE - Insertar datos
            // ============================
            em.getTransaction().begin(); // inicia la transacción

            Usuario usuario = new Usuario("Giuliano", "Espejo");

            Autor autor1 = new Autor("Gabriel García Márquez");
            Autor autor2 = new Autor("Antoine de Saint-Exupéry");

            Libro libro1 = new Libro("Cien Años de Soledad");
            libro1.addAutor(autor1); // relación N-M

            Libro libro2 = new Libro("El Principito");
            libro2.addAutor(autor2);

            Prestamo prestamo1 = new Prestamo(LocalDate.now(), libro1);
            usuario.addPrestamo(prestamo1); // relación Usuario-Prestamo

            // Persistir en BD (INSERTs)
            em.persist(usuario);
            em.persist(libro1);
            em.persist(libro2);
            em.persist(autor1);
            em.persist(autor2);

            em.getTransaction().commit(); // confirma cambios
            System.out.println("✅ Datos iniciales guardados en la BD");

            // ============================
            // READ - Obtener datos
            // ============================
            System.out.println("\n📌 Lista de usuarios en BD:");
            List<Usuario> usuarios = em.createQuery("SELECT u FROM Usuario u", Usuario.class).getResultList();
            usuarios.forEach(u -> {
                System.out.println(u);
                u.getPrestamos().forEach(System.out::println);
            });

            // ============================
            // UPDATE - Modificar un dato
            // ============================
            em.getTransaction().begin();
            Usuario usuarioExistente = em.find(Usuario.class, usuario.getId()); // buscar por ID
            if (usuarioExistente != null) {
                usuarioExistente.setApellido("Actualizado"); // modificar campo
                em.merge(usuarioExistente); // merge asegura persistencia
                System.out.println("\n✏️ Usuario actualizado: " + usuarioExistente);
            }
            em.getTransaction().commit();

            // ============================
            // DELETE - Eliminar un dato
            // ============================
            em.getTransaction().begin();
            Libro libroAEliminar = em.find(Libro.class, libro2.getId()); // buscar libro por ID
            if (libroAEliminar != null) {
                em.remove(libroAEliminar); // elimina registro
                System.out.println("\n🗑️ Libro eliminado: " + libroAEliminar.getTitulo());
            }
            em.getTransaction().commit();

            // ============================
            // QUERY con parámetros (JPQL)
            // ============================
            System.out.println("\n🔍 Búsqueda de usuario por nombre:");
            List<Usuario> encontrados = em.createQuery(
                            "SELECT u FROM Usuario u WHERE u.nombre = :nombre", Usuario.class)
                    .setParameter("nombre", "Giuliano") // parámetro dinámico
                    .getResultList();

            encontrados.forEach(System.out::println);

        } catch (Exception e) {
            // rollback si algo falla en la transacción activa
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            em.close();  // libera la conexión
            emf.close(); // cierra el pool
        }
    }
}
