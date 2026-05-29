package com.government.payroll.service;

import com.government.payroll.dto.request.PayrollProcessRequest;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.dto.response.PayrollResponse;
import com.government.payroll.entity.*;
import com.government.payroll.entity.enums.EmployeeStatus;
import com.government.payroll.entity.enums.PaymentStatus;
import com.government.payroll.entity.enums.PayrollStatus;
import com.government.payroll.exception.PayrollProcessingException;
import com.government.payroll.exception.ResourceNotFoundException;
import com.government.payroll.mapper.PayrollMapper;
import com.government.payroll.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service for payroll processing operations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;
    private final DeductionRepository deductionRepository;
    private final PayslipRepository payslipRepository;
    private final MessageRepository messageRepository;
    private final PayrollMapper payrollMapper;
    private final AuthService authService;

    /**
     * Process payroll for a given month and year
     */
    @Transactional
    public PayrollResponse processPayroll(PayrollProcessRequest request) {
        log.info("Processing payroll for {}/{}", request.getMonth(), request.getYear());

        // Check if payroll already exists for this month/year
        if (payrollRepository.existsByMonthAndYear(request.getMonth(), request.getYear())) {
            throw new PayrollProcessingException(
                    String.format("Payroll already exists for %d/%d", request.getMonth(), request.getYear()));
        }

        // Get all active employees
        List<Employee> activeEmployees = employeeRepository.findByStatus(EmployeeStatus.ACTIVE);
        if (activeEmployees.isEmpty()) {
            throw new PayrollProcessingException("No active employees found for payroll processing");
        }

        // Get all active deductions
        List<Deduction> deductions = deductionRepository.findAllActive();
        Map<String, BigDecimal> deductionMap = new HashMap<>();
        for (Deduction deduction : deductions) {
            deductionMap.put(deduction.getDeductionName(), deduction.getPercentage());
        }

        // Create payroll record
        Payroll payroll = Payroll.builder()
                .month(request.getMonth())
                .year(request.getYear())
                .processedDate(LocalDate.now())
                .status(PayrollStatus.PENDING)
                .remarks(request.getRemarks())
                .build();
        payroll = payrollRepository.save(payroll);

        // Process each employee
        for (Employee employee : activeEmployees) {
            if (employee.getEmployment() == null) {
                log.warn("Employee {} has no employment record, skipping", employee.getEmployeeCode());
                continue;
            }

            Payslip payslip = calculatePayslip(employee, payroll, deductionMap);
            payslipRepository.save(payslip);
        }

        log.info("Payroll processed successfully for {}/{} with {} employees", 
                request.getMonth(), request.getYear(), activeEmployees.size());

        return payrollMapper.toResponse(payroll);
    }

    /**
     * Calculate payslip for an employee
     */
    private Payslip calculatePayslip(Employee employee, Payroll payroll, Map<String, BigDecimal> deductionMap) {
        BigDecimal baseSalary = employee.getEmployment().getBaseSalary();

        // Calculate allowances
        BigDecimal housePercentage = deductionMap.getOrDefault("House", BigDecimal.valueOf(14.0));
        BigDecimal transportPercentage = deductionMap.getOrDefault("Transport", BigDecimal.valueOf(14.0));
        
        BigDecimal houseAmount = baseSalary.multiply(housePercentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal transportAmount = baseSalary.multiply(transportPercentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        // Calculate gross salary
        BigDecimal grossSalary = baseSalary.add(houseAmount).add(transportAmount);

        // Calculate deductions
        BigDecimal employeeTaxPercentage = deductionMap.getOrDefault("EmployeeTax", BigDecimal.valueOf(30.0));
        BigDecimal pensionPercentage = deductionMap.getOrDefault("Pension", BigDecimal.valueOf(6.0));
        BigDecimal medicalPercentage = deductionMap.getOrDefault("MedicalInsurance", BigDecimal.valueOf(5.0));
        BigDecimal othersPercentage = deductionMap.getOrDefault("Others", BigDecimal.valueOf(5.0));

        BigDecimal employeeTax = baseSalary.multiply(employeeTaxPercentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal pension = baseSalary.multiply(pensionPercentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal medicalInsurance = baseSalary.multiply(medicalPercentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal others = baseSalary.multiply(othersPercentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        BigDecimal totalDeductions = employeeTax.add(pension).add(medicalInsurance).add(others);

        // Validate deductions don't exceed gross salary
        if (totalDeductions.compareTo(grossSalary) > 0) {
            throw new PayrollProcessingException(
                    String.format("Total deductions exceed gross salary for employee %s", 
                            employee.getEmployeeCode()));
        }

        // Calculate net salary
        BigDecimal netSalary = baseSalary.subtract(totalDeductions);

        return Payslip.builder()
                .employee(employee)
                .payroll(payroll)
                .baseSalary(baseSalary)
                .houseAmount(houseAmount)
                .transportAmount(transportAmount)
                .grossSalary(grossSalary)
                .employeeTax(employeeTax)
                .pension(pension)
                .medicalInsurance(medicalInsurance)
                .others(others)
                .totalDeductions(totalDeductions)
                .netSalary(netSalary)
                .paymentStatus(PaymentStatus.PENDING)
                .build();
    }

    /**
     * Get all payrolls with pagination
     */
    @Transactional(readOnly = true)
    public PageResponse<PayrollResponse> getAllPayrolls(int page, int size) {
        log.info("Fetching payrolls - page: {}, size: {}", page, size);

        Pageable pageable = PageRequest.of(page, size);
        Page<Payroll> payrollPage = payrollRepository.findAllActive(pageable);

        return buildPageResponse(payrollPage);
    }

    /**
     * Get payroll by ID
     */
    @Transactional(readOnly = true)
    public PayrollResponse getPayrollById(Long id) {
        log.info("Fetching payroll with ID: {}", id);

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll", "id", id));

        return payrollMapper.toResponse(payroll);
    }

    /**
     * Approve payroll
     */
    @Transactional
    public PayrollResponse approvePayroll(Long id) {
        log.info("Approving payroll with ID: {}", id);

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll", "id", id));

        if (payroll.getStatus() != PayrollStatus.PENDING) {
            throw new PayrollProcessingException("Only pending payrolls can be approved");
        }

        // Get current user
        User currentUser = authService.getCurrentUser();

        // Update payroll status
        payroll.setStatus(PayrollStatus.APPROVED);
        payroll.setApprovedBy(currentUser.getEmail());
        payroll.setApprovedDate(LocalDate.now());
        payroll = payrollRepository.save(payroll);

        // Update payslips and create messages
        List<Payslip> payslips = payslipRepository.findByPayrollId(id);
        for (Payslip payslip : payslips) {
            payslip.setPaymentStatus(PaymentStatus.PAID);
            payslipRepository.save(payslip);

            // Create payment message
            String messageText = String.format(
                    "Dear %s, Your salary of %d/%d from GOVERNMENT ERP amount %s has been credited successfully.",
                    payslip.getEmployee().getFullName(),
                    payroll.getMonth(),
                    payroll.getYear(),
                    payslip.getNetSalary()
            );

            Message message = Message.builder()
                    .employee(payslip.getEmployee())
                    .message(messageText)
                    .month(payroll.getMonth())
                    .year(payroll.getYear())
                    .isRead(false)
                    .build();
            messageRepository.save(message);
        }

        log.info("Payroll approved successfully with ID: {}", id);

        return payrollMapper.toResponse(payroll);
    }

    /**
     * Build page response
     */
    private PageResponse<PayrollResponse> buildPageResponse(Page<Payroll> payrollPage) {
        return PageResponse.<PayrollResponse>builder()
                .content(payrollPage.getContent().stream()
                        .map(payrollMapper::toResponse)
                        .toList())
                .page(payrollPage.getNumber())
                .size(payrollPage.getSize())
                .totalElements(payrollPage.getTotalElements())
                .totalPages(payrollPage.getTotalPages())
                .last(payrollPage.isLast())
                .build();
    }

}
