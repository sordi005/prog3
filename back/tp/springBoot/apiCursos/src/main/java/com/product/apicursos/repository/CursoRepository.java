package com.product.apicursos.repository;

import com.product.apicursos.Entity.Curso;
import com.product.apicursos.dto.response.CursoSimpleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByProfesorId(Long profesorId);
}
