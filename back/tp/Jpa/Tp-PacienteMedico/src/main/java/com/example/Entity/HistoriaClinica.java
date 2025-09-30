package com.example.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Table(name = "historia_clinica")  // nombre entre comillas
@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class HistoriaClinica extends Base{  // debe extender de Base
    @Column(nullable = false, length = 100)
    private String descripcion;

    @OneToOne(mappedBy = "historiaClinica")
    private Paciente paciente;
}