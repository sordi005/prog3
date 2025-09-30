package com.example;

import com.example.Entity.*;
import jakarta.persistence.*;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("miUnidad");
        EntityManager em = null;
        EntityTransaction tx = null;

        try {
            em = emf.createEntityManager();
            tx = em.getTransaction();
            tx.begin();

            System.out.println("\nTRABAJO PRÁCTICO JPA - CLINICA MÉDICA\n");

            System.out.println("\nCreando entidades...");

            // Crear medicamentos primero
            Medicamento med1 = Medicamento.builder()
                    .nombre("Aspirina")
                    .droga("Ácido acetilsalicílico")
                    .pesoEnGramos(500)
                    .build();

            Medicamento med2 = Medicamento.builder()
                    .nombre("Loratadina")
                    .droga("Antihistamínico")
                    .pesoEnGramos(10)
                    .build();

            Medicamento med3 = Medicamento.builder()
                    .nombre("Omeprazol")
                    .droga("Inhibidor de la bomba de protones")
                    .pesoEnGramos(20)
                    .build();

            // Persistir medicamentos primero
            em.persist(med1);
            em.persist(med2);
            em.persist(med3);

            // Crear médicos
            Medico m1 = Medico.builder()
                    .nombre("AnaMaria")
                    .apellido("Gonzalez")
                    .especialidad("Cardiologia")
                    .matricula("MED12345")
                    .edad(45)
                    .build();

            Medico m2 = Medico.builder()
                    .nombre("Laura")
                    .apellido("Martinez")
                    .especialidad("Dermatologia")
                    .matricula("MED67890")
                    .edad(38)
                    .build();

            // Crear pacientes con sus historias clínicas
            HistoriaClinica hc1 = HistoriaClinica.builder()
                    .descripcion("Paciente con antecedentes de hipertension.")
                    .build();

            HistoriaClinica hc2 = HistoriaClinica.builder()
                    .descripcion("Paciente con alergias estacionales.")
                    .build();

            Paciente p1 = Paciente.builder()
                    .nombre("Juan")
                    .apellido("yordi")
                    .dni(12345678)
                    .edad(30)
                    .obraSocial("Swiss Medical")
                    .fechaNacimiento(LocalDate.of(1993, 3, 20))
                    .sexo('M')
                    .historiaClinica(hc1)
                    .build();

            Paciente p2 = Paciente.builder()
                    .nombre("Maria")
                    .apellido("Garcia")
                    .dni(87654321)
                    .edad(25)
                    .obraSocial("OSDE")
                    .fechaNacimiento(LocalDate.of(1998, 5, 15))
                    .sexo('F')
                    .historiaClinica(hc2)
                    .build();

            Paciente p3 = Paciente.builder()
                    .nombre("Carlos")
                    .apellido("Lopez")
                    .dni(11223344)
                    .edad(40)
                    .obraSocial(null)
                    .fechaNacimiento(LocalDate.of(1983, 7, 10))
                    .sexo('N')
                    .build();

            // Establecer relación bidireccional para historias clínicas
            hc1.setPaciente(p1);
            hc2.setPaciente(p2);

            // Establecer relaciones ManyToMany Paciente-Medicamento
            p1.addMedicamento(med1);
            p1.addMedicamento(med2);
            p2.addMedicamento(med3);

            // Crear consultas y establecer relaciones
            Consulta c1 = Consulta.builder()
                    .fecha(LocalDate.of(2023, 10, 1))
                    .diagnostico("Angina de pecho")
                    .medico(m1)
                    .paciente(p1)
                    .build();

            Consulta c2 = Consulta.builder()
                    .fecha(LocalDate.of(2023, 11, 5))
                    .diagnostico("Dermatitis")
                    .medico(m2)
                    .paciente(p2)
                    .build();

            Consulta c3 = Consulta.builder()
                    .fecha(LocalDate.of(2023, 12, 15))
                    .diagnostico("Paciente sano")
                    .medico(m2)
                    .paciente(p3)
                    .build();

            Consulta c4 = Consulta.builder()
                    .fecha(LocalDate.of(2024, 1, 20))
                    .diagnostico("Migraña")
                    .medico(m1)
                    .paciente(p3)
                    .build();

            // Usar los métodos helper para establecer relaciones bidireccionales
            p1.addConsulta(c1);
            p2.addConsulta(c2);
            p3.addConsulta(c3);
            p3.addConsulta(c4);

            System.out.println("Persistiendo datos...");

            // Persistir médicos y pacientes - las consultas se persistirán automáticamente por cascade
            em.persist(m1);
            em.persist(m2);
            em.persist(p1);
            em.persist(p2);
            em.persist(p3);

            System.out.println("Datos persistidos correctamente!\n");


            //listar todos los pacientes
            System.out.println("Listado de pacientes Mayores a 30 años:");
            TypedQuery<Paciente> query = em.createQuery("SELECT p FROM Paciente p WHERE (edad > 30)", Paciente.class);
            query.getResultList().forEach(System.out::println);

            //Listar un médico junto con sus consultas.
            //Listar consultas de un médico específico
                System.out.println("\nConsultas realizadas por Dr. Laura Martinez:");
                TypedQuery<Object[]> queryMedicoEspecifico = em.createQuery(
                "SELECT c.fecha, c.diagnostico, p.nombre, p.apellido " +
                "FROM Consulta c JOIN c.medico m JOIN c.paciente p " +
                "WHERE m.nombre = :nombre AND m.apellido = :apellido " +
                "ORDER BY c.fecha", Object[].class);
                queryMedicoEspecifico.setParameter("nombre", "Laura");
                queryMedicoEspecifico.setParameter("apellido", "Martinez");
                queryMedicoEspecifico.getResultList().forEach(result -> {
                LocalDate fecha = (LocalDate) result[0];
                String diagnostico = (String) result[1];
                String nombrePaciente = (String) result[2];
                String apellidoPaciente = (String) result[3];
                System.out.println("Fecha: " + fecha + " | Diagnóstico: " + diagnostico + 
                                " | Paciente: " + nombrePaciente + " " + apellidoPaciente);
                });


            //Mostrar todos los medicamentos asociados a un paciente
            System.out.println("\nMedicamentos asociados al paciente Juan yordi:");
            TypedQuery<Medicamento> queryMed = em.createQuery("SELECT m FROM Paciente p JOIN p.medicamentos m WHERE p.nombre = :nombre AND p.apellido = :apellido", Medicamento.class);
            queryMed.setParameter("nombre", "Juan");
            queryMed.setParameter("apellido", "yordi");
            queryMed.getResultList().forEach(System.out::println);


            //Listar las consultas con su diagnóstico y el nombre del paciente.
            System.out.println("\nConsultas con diagnóstico y nombre del paciente:");
            TypedQuery<Object[]> queryCons = em.createQuery("SELECT c.diagnostico, p.nombre, p.apellido FROM Consulta c JOIN c.paciente p", Object[].class);
            queryCons.getResultList().forEach(result -> {
                String diagnostico = (String) result[0];
                String nombrePaciente = (String) result[1];
                String apellidoPaciente = (String) result[2];
                System.out.println("Diagnóstico: " + diagnostico + ", Paciente: " + nombrePaciente + " " + apellidoPaciente);
            });

            //Calcular el promedio de edad de los pacientes (redondeado a 2 decimales).
            TypedQuery<Double> queryAvg = em.createQuery("SELECT ROUND(AVG(p.edad), 2) FROM Paciente p", Double.class);
            Double promedioEdad = queryAvg.getSingleResult();
            System.out.println("\nPromedio de edad de los pacientes: " + promedioEdad);


            //Listar todos los pacientes que tienen una obra social específica
            System.out.println("\nPacientes con obra social OSDE:");
            TypedQuery<Paciente> queryObraSocial = em.createQuery("SELECT p FROM Paciente p WHERE p.obraSocial = :obraSocial", Paciente.class);
            queryObraSocial.setParameter("obraSocial", "OSDE");
            queryObraSocial.getResultList().
                    forEach(System.out::println);

            //Mostrar los médicos y la cantidad de consultas que atendieron.
            System.out.println("\nMédicos y la cantidad de consultas que atendieron:");
            TypedQuery<Object[]> queryMedicos = em.createQuery("SELECT m.nombre, m.apellido, COUNT(c) FROM Medico m LEFT JOIN m.consultas c GROUP BY m.id", Object[].class);
            queryMedicos.getResultList().forEach(result -> {
                String nombreMedico = (String) result[0];
                String apellidoMedico = (String) result[1];
                Long cantidadConsultas = (Long) result[2];
                System.out.println("Dr. " + nombreMedico + " " + apellidoMedico + " | Consultas atendidas: " + cantidadConsultas);
            });


            TypedQuery<Object[]> queryMulti = em.createQuery("SELECT p.nombre, p.apellido, h.descripcion FROM Paciente p JOIN p.historiaClinica h", Object[].class);
            queryMulti.getResultList().forEach(result -> {
                String nombrePaciente = (String) result[0];
                String apellidoPaciente = (String) result[1];
                String descripcionHistorial = (String) result[2];
                System.out.println("Paciente: " + nombrePaciente + " " + apellidoPaciente + " | Historial: " + descripcionHistorial);
            });

            System.out.println("\n ======================== Fin del programa ============================\n");

            tx.commit();

        } catch (Exception e) {
            System.err.println("Error de persistencia: " + e.getMessage());
            e.printStackTrace();
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
            if (emf != null && emf.isOpen()) {
                emf.close();
            }
        }
    }
}