package jpa;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "libros")
@Data
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @ManyToMany
    @JoinTable(name = "libro_autor",
            joinColumns = @JoinColumn(name = "libro_id"),
            inverseJoinColumns = @JoinColumn(name = "autor_id"))
    private Set<Autor> autores = new HashSet<>();

    public Libro() {}
    public Libro(String titulo) {
        this.titulo = titulo;
    }

    public void addAutor(Autor autor) {
        autores.add(autor);
        autor.getLibros().add(this);
    }

    @Override
    public String toString() {
        return "Libro{" + "id=" + id + ", titulo='" + titulo + '\'' + '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titulo);
    }
}
