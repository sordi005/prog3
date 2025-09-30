package com.example.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Table(name = "pacientes")
@Entity
@Setter
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@SuperBuilder
public class Paciente extends  Base {
    @Column(nullable = false, length = 50)
    private String nombre;
    @Column(nullable = false, length = 50)
    private String apellido;
    @Column(nullable = false)
    private  int edad;
    @Column(nullable = false, length = 10)
    private int dni;
    @Column(nullable = true, length = 50)
    private String obraSocial;
    @Column(nullable = true, length = 50)
    private LocalDate fechaNacimiento;
    @Column(nullable = true, length = 1)
    char sexo;

    @Builder.Default
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Consulta> consultas = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "historia_clinica_id", nullable = true)
    private HistoriaClinica historiaClinica;

    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "pacientes_medicamentos",
            joinColumns = @JoinColumn(name = "paciente_id"),
            inverseJoinColumns = @JoinColumn(name = "medicamento_id")
    )
    private Set<Medicamento> medicamentos = new HashSet<>();

    public void addConsulta(Consulta consulta){
        if(consulta == null || consultas.contains(consulta)) return;
        consultas.add(consulta);
        if(consulta.getPaciente() == null || consulta.getPaciente() != this){
            consulta.setPaciente(this);
        }
    }

    public void addMedicamento(Medicamento medicamento){
        if(medicamento == null || medicamentos.contains(medicamento)) return;
        medicamentos.add(medicamento);
        if(!medicamento.getPacientes().contains(this)){
            medicamento.addPaciente(this);
        }
    }

}
