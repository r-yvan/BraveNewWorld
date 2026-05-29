package com.government.payroll.entity;

import com.government.payroll.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Payslip entity representing individual employee payslips
 */
@Entity
@Table(name = "payslips", indexes = {
    @Index(name = "idx_payslip_employee", columnList = "employee_id"),
    @Index(name = "idx_payslip_payroll", columnList = "payroll_id"),
    @Index(name = "idx_payslip_payment_status", columnList = "payment_status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payslip extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payroll_id", nullable = false)
    private Payroll payroll;

    @Column(name = "base_salary", nullable = false, precision = 15, scale = 2)
    private BigDecimal baseSalary;

    @Column(name = "house_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal houseAmount;

    @Column(name = "transport_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal transportAmount;

    @Column(name = "gross_salary", nullable = false, precision = 15, scale = 2)
    private BigDecimal grossSalary;

    @Column(name = "employee_tax", nullable = false, precision = 15, scale = 2)
    private BigDecimal employeeTax;

    @Column(name = "pension", nullable = false, precision = 15, scale = 2)
    private BigDecimal pension;

    @Column(name = "medical_insurance", nullable = false, precision = 15, scale = 2)
    private BigDecimal medicalInsurance;

    @Column(name = "others", nullable = false, precision = 15, scale = 2)
    private BigDecimal others;

    @Column(name = "total_deductions", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalDeductions;

    @Column(name = "net_salary", nullable = false, precision = 15, scale = 2)
    private BigDecimal netSalary;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 20)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

}
