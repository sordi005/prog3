package com.example.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Table(name = "medicamentos")
@Entity
@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@SuperBuilder
public class Medicamento extends Base {
    @Column(nullable = false, length = 50)
    private String nombre;
    @Column(nullable = false, length = 50)
    private String droga;
    @Column(nullable = false)
    private int pesoEnGramos;

    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "medicamentos")
    private Set<Paciente> pacientes = new HashSet<>();

    public void addPaciente(Paciente paciente){
        if(paciente == null || pacientes.contains(paciente)) return;
        pacientes.add(paciente);
        if(!paciente.getMedicamentos().contains(this)){
            paciente.getMedicamentos().add(this);
        }
    }
}
