package com.product.apicursos.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cursos")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "profesor_id",nullable = false)
    private Profesor profesor;

    @ManyToMany(mappedBy = "cursos")
    private Set<Estudiante> estudiantes = new  HashSet<>();

}
