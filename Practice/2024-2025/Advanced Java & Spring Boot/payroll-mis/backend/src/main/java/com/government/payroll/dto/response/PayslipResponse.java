package com.government.payroll.dto.response;

import com.government.payroll.entity.enums.PaymentStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for payslip response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Payslip response")
public class PayslipResponse {

    @Schema(description = "Payslip ID", example = "1")
    private Long id;

    @Schema(description = "Employee name", example = "John Doe")
    private String employeeName;

    @Schema(description = "Employee code", example = "EMP001")
    private String employeeCode;

    @Schema(description = "Month", example = "5")
    private Integer month;

    @Schema(description = "Year", example = "2026")
    private Integer year;

    @Schema(description = "Base salary", example = "500000")
    private BigDecimal baseSalary;

    @Schema(description = "House amount", example = "70000")
    private BigDecimal houseAmount;

    @Schema(description = "Transport amount", example = "70000")
    private BigDecimal transportAmount;

    @Schema(description = "Gross salary", example = "640000")
    private BigDecimal grossSalary;

    @Schema(description = "Employee tax", example = "150000")
    private BigDecimal employeeTax;

    @Schema(description = "Pension", example = "30000")
    private BigDecimal pension;

    @Schema(description = "Medical insurance", example = "25000")
    private BigDecimal medicalInsurance;

    @Schema(description = "Others", example = "25000")
    private BigDecimal others;

    @Schema(description = "Total deductions", example = "230000")
    private BigDecimal totalDeductions;

    @Schema(description = "Net salary", example = "270000")
    private BigDecimal netSalary;

    @Schema(description = "Payment status", example = "PENDING")
    private PaymentStatus paymentStatus;

}
