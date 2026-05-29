package com.government.payroll.service;

import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.dto.response.PayslipResponse;
import com.government.payroll.entity.Employee;
import com.government.payroll.entity.Payslip;
import com.government.payroll.entity.User;
import com.government.payroll.exception.ResourceNotFoundException;
import com.government.payroll.exception.UnauthorizedException;
import com.government.payroll.mapper.PayslipMapper;
import com.government.payroll.repository.PayslipRepository;
import com.government.payroll.util.PdfGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for payslip operations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PayslipService {

    private final PayslipRepository payslipRepository;
    private final PayslipMapper payslipMapper;
    private final AuthService authService;
    private final PdfGenerator pdfGenerator;

    /**
     * Get payslips for current user
     */
    @Transactional(readOnly = true)
    public PageResponse<PayslipResponse> getMyPayslips(int page, int size) {
        log.info("Fetching payslips for current user");

        User currentUser = authService.getCurrentUser();
        if (currentUser.getEmployee() == null) {
            throw new ResourceNotFoundException("Employee profile not found for current user");
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Payslip> payslipPage = payslipRepository.findByEmployeeId(
                currentUser.getEmployee().getId(), pageable);

        return buildPageResponse(payslipPage);
    }

    /**
     * Get payslip by ID
     */
    @Transactional(readOnly = true)
    public PayslipResponse getPayslipById(Long id) {
        log.info("Fetching payslip with ID: {}", id);

        Payslip payslip = payslipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payslip", "id", id));

        // Check if user has access to this payslip
        User currentUser = authService.getCurrentUser();
        boolean isEmployee = currentUser.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_EMPLOYEE"));
        
        if (isEmployee && currentUser.getEmployee() != null) {
            if (!payslip.getEmployee().getId().equals(currentUser.getEmployee().getId())) {
                throw new UnauthorizedException("You don't have access to this payslip");
            }
        }

        return payslipMapper.toResponse(payslip);
    }

    /**
     * Download payslip as PDF
     */
    @Transactional(readOnly = true)
    public byte[] downloadPayslip(Long id) {
        log.info("Downloading payslip with ID: {}", id);

        Payslip payslip = payslipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payslip", "id", id));

        // Check if user has access to this payslip
        User currentUser = authService.getCurrentUser();
        boolean isEmployee = currentUser.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_EMPLOYEE"));
        
        if (isEmployee && currentUser.getEmployee() != null) {
            if (!payslip.getEmployee().getId().equals(currentUser.getEmployee().getId())) {
                throw new UnauthorizedException("You don't have access to this payslip");
            }
        }

        return pdfGenerator.generatePayslipPdf(payslip);
    }

    /**
     * Build page response
     */
    private PageResponse<PayslipResponse> buildPageResponse(Page<Payslip> payslipPage) {
        return PageResponse.<PayslipResponse>builder()
                .content(payslipPage.getContent().stream()
                        .map(payslipMapper::toResponse)
                        .toList())
                .page(payslipPage.getNumber())
                .size(payslipPage.getSize())
                .totalElements(payslipPage.getTotalElements())
                .totalPages(payslipPage.getTotalPages())
                .last(payslipPage.isLast())
                .build();
    }

}
