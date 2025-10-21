package com.product.apicursos.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.product.apicursos.Entity.Profesor;
import com.product.apicursos.Excepcion.ResourceNotFoundException;
import com.product.apicursos.dto.request.CreateProfesorDTO;
import com.product.apicursos.dto.response.ProfesorResponseDTO;
import com.product.apicursos.mapper.ProfesorMapper;
import com.product.apicursos.repository.ProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfesorService {

    private final ProfesorRepository profesorRepository;
    private final ProfesorMapper profesorMapper;
    
    // crear
    public ProfesorResponseDTO createProfesor(CreateProfesorDTO profesorDTO) {

        if (profesorRepository.existsByEmail(profesorDTO.getEmail())) {
            throw new IllegalArgumentException("Ya existe un profesor con el email: " + profesorDTO.getEmail());
        }

        Profesor profesor = profesorMapper.toEntity(profesorDTO);
        Profesor savedProfesor = profesorRepository.save(profesor);
        return profesorMapper.toResponseDto(savedProfesor);
    }

    // actualizar
    public ProfesorResponseDTO updateProfesor(Long id, CreateProfesorDTO dto) {
        Profesor profesorExistente = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con ID: " + id));

        //Compreuba que el email no este repetido y no sea el mismo del profesor que se esta actualizando
        if (!profesorExistente.getEmail().equals(dto.getEmail()) && 
        profesorRepository.existsByEmail(dto.getEmail())) {

            throw new IllegalArgumentException("Ya existe un profesor con el email: " + dto.getEmail());
        }

        profesorExistente.setNombre(dto.getNombre());
        profesorExistente.setApellido(dto.getApellido());
        profesorExistente.setEmail(dto.getEmail());
        profesorExistente.setFechaNacimiento(dto.getFechaNacimiento());

        Profesor profesorActualizado = profesorRepository.save(profesorExistente);
        return profesorMapper.toResponseDto(profesorActualizado);
    }

    // eliminar
    public void deleteProfesor(Long id) {

        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + id));

        profesorRepository.delete(profesor);
    }

    @Transactional(readOnly = true)
    public List<ProfesorResponseDTO> findAll() {
        return profesorRepository.findAll()
                .stream()
                .map(profesorMapper::toResponseDto)
                .collect(Collectors.toList());
    }
   
    @Transactional(readOnly = true)
    public ProfesorResponseDTO getProfesorById(Long id) {
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + id));

        return profesorMapper.toResponseDto(profesor);
    }

}
