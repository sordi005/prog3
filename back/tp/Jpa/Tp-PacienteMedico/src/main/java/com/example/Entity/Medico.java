package com.example.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Table(name = "medicos")
@Entity
@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@SuperBuilder
public class Medico extends Base{

    @Column(nullable = false, length = 50)
    private String nombre;
    @Column(nullable = false, length = 50)
    private String apellido;
    @Column(nullable = false)
    private  int edad;
    @Column(nullable = false, length = 50)
    private String especialidad;
    @Column(nullable = false, length = 50)
    private String matricula;

    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "medico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Consulta> consultas = new HashSet<>();

    public void addConsulta(Consulta consulta){
        if(consulta == null || consultas.contains(consulta)) return;
        consultas.add(consulta);
        if(consulta.getMedico() != this){
            consulta.setMedico(this);
        }
    }
}
