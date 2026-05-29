package com.government.payroll.service;

import com.government.payroll.dto.request.DeductionRequest;
import com.government.payroll.dto.response.DeductionResponse;
import com.government.payroll.entity.Deduction;
import com.government.payroll.exception.ResourceNotFoundException;
import com.government.payroll.mapper.DeductionMapper;
import com.government.payroll.repository.DeductionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for deduction management operations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DeductionService {

    private final DeductionRepository deductionRepository;
    private final DeductionMapper deductionMapper;

    /**
     * Get all active deductions
     */
    @Transactional(readOnly = true)
    public List<DeductionResponse> getAllDeductions() {
        log.info("Fetching all active deductions");

        return deductionRepository.findAllActive().stream()
                .map(deductionMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Update deduction
     */
    @Transactional
    public DeductionResponse updateDeduction(Long id, DeductionRequest request) {
        log.info("Updating deduction with ID: {}", id);

        Deduction deduction = deductionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deduction", "id", id));

        deduction.setPercentage(request.getPercentage());
        if (request.getDescription() != null) {
            deduction.setDescription(request.getDescription());
        }

        deduction = deductionRepository.save(deduction);

        log.info("Deduction updated successfully with ID: {}", id);

        return deductionMapper.toResponse(deduction);
    }

}
