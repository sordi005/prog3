package com.product.apicursos.repository;

import com.product.apicursos.Entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByProfesorId(Long profesorId);
    List<Curso> findByEstudiantesId(Long estudianteId);
    Boolean existsByName(String name);
}
