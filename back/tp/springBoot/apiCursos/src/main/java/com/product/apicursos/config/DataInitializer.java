package com.product.apicursos.config;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.product.apicursos.Entity.Curso;
import com.product.apicursos.Entity.Estudiante;
import com.product.apicursos.Entity.Profesor;
import com.product.apicursos.repository.CursoRepository;
import com.product.apicursos.repository.EstudianteRepository;
import com.product.apicursos.repository.ProfesorRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final ProfesorRepository profesorRepository;
    private final EstudianteRepository estudianteRepository;
    private final CursoRepository cursoRepository;

    @Override
    public void run(String... args) throws Exception {
        
        log.info("Iniciando carga de datos de prueba...");

        // ========== CREAR PROFESORES ==========
        Profesor profesor1 = profesorRepository.save(Profesor.builder()
                .nombre("Carlos")
                .apellido("García")
                .email("carlos.garcia@universidad.edu")
                .fechaNacimiento(LocalDate.of(1975, 5, 15))
                .build());

        Profesor profesor2 = profesorRepository.save(Profesor.builder()
                .nombre("María")
                .apellido("López")
                .email("maria.lopez@universidad.edu")
                .fechaNacimiento(LocalDate.of(1980, 8, 20))
                .build());

        Profesor profesor3 = profesorRepository.save(Profesor.builder()
                .nombre("Juan")
                .apellido("Martínez")
                .email("juan.martinez@universidad.edu")
                .fechaNacimiento(LocalDate.of(1970, 3, 10))
                .build());

        log.info("profesores creados");

        // ========== CREAR ESTUDIANTES ==========
        Estudiante estudiante1 = estudianteRepository.save(Estudiante.builder()
                .nombre("Ana")
                .apellido("Rodríguez")
                .email("ana.rodriguez@alumno.edu")
                .matricula("2024001")
                .fechaNacimiento(LocalDate.of(2002, 4, 12))
                .cursos(new HashSet<>())
                .build());

        Estudiante estudiante2 = estudianteRepository.save(Estudiante.builder()
                .nombre("Pedro")
                .apellido("Sánchez")
                .email("pedro.sanchez@alumno.edu")
                .matricula("2024002")
                .fechaNacimiento(LocalDate.of(2001, 7, 23))
                .cursos(new HashSet<>())
                .build());

        Estudiante estudiante3 = estudianteRepository.save(Estudiante.builder()
                .nombre("Laura")
                .apellido("Fernández")
                .email("laura.fernandez@alumno.edu")
                .matricula("2024003")
                .fechaNacimiento(LocalDate.of(2003, 1, 5))
                .cursos(new HashSet<>())
                .build());

        Estudiante estudiante4 = estudianteRepository.save(Estudiante.builder()
                .nombre("Diego")
                .apellido("Gómez")
                .email("diego.gomez@alumno.edu")
                .matricula("2024004")
                .fechaNacimiento(LocalDate.of(2002, 9, 18))
                .cursos(new HashSet<>())
                .build());

        Estudiante estudiante5 = estudianteRepository.save(Estudiante.builder()
                .nombre("Sofía")
                .apellido("Díaz")
                .email("sofia.diaz@alumno.edu")
                .matricula("2024005")
                .fechaNacimiento(LocalDate.of(2001, 11, 30))
                .cursos(new HashSet<>())
                .build());

        log.info("estudiantes creados");

        // ========== CREAR CURSOS ==========
        Curso curso1 = cursoRepository.save(Curso.builder()
                .name("Programación III")
                .profesor(profesor1)
                .estudiantes(new HashSet<>())
                .build());

        Curso curso2 = cursoRepository.save(Curso.builder()
                .name("Base de Datos II")
                .profesor(profesor2)
                .estudiantes(new HashSet<>())
                .build());

        Curso curso3 = cursoRepository.save(Curso.builder()
                .name("Desarrollo Web")
                .profesor(profesor1)
                .estudiantes(new HashSet<>())
                .build());

        Curso curso4 = cursoRepository.save(Curso.builder()
                .name("Arquitectura de Software")
                .profesor(profesor3)
                .estudiantes(new HashSet<>())
                .build());

        log.info("cursos creados");

        // Programación III - 3 estudiantes
        curso1.getEstudiantes().add(estudiante1);
        curso1.getEstudiantes().add(estudiante2);
        curso1.getEstudiantes().add(estudiante3);
        estudiante1.getCursos().add(curso1);
        estudiante2.getCursos().add(curso1);
        estudiante3.getCursos().add(curso1);

        // Base de Datos II - 2 estudiantes
        curso2.getEstudiantes().add(estudiante1);
        curso2.getEstudiantes().add(estudiante4);
        estudiante1.getCursos().add(curso2);
        estudiante4.getCursos().add(curso2);

        // Desarrollo Web - 4 estudiantes
        curso3.getEstudiantes().add(estudiante2);
        curso3.getEstudiantes().add(estudiante3);
        curso3.getEstudiantes().add(estudiante4);
        curso3.getEstudiantes().add(estudiante5);
        estudiante2.getCursos().add(curso3);
        estudiante3.getCursos().add(curso3);
        estudiante4.getCursos().add(curso3);
        estudiante5.getCursos().add(curso3);

        // Arquitectura de Software - 2 estudiantes
        curso4.getEstudiantes().add(estudiante1);
        curso4.getEstudiantes().add(estudiante5);
        estudiante1.getCursos().add(curso4);
        estudiante5.getCursos().add(curso4);

        cursoRepository.saveAll(List.of(curso1, curso2, curso3, curso4));
        estudianteRepository.saveAll(List.of(estudiante1, estudiante2, estudiante3, estudiante4, estudiante5));

        log.info("Datos de pruebas Guardados");
    }


}
