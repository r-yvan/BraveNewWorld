package com.government.payroll.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.government.payroll.entity.enums.PayrollStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Payroll entity representing monthly payroll processing
 */
@Entity
@Table(name = "payrolls", 
    uniqueConstraints = @UniqueConstraint(columnNames = {"month", "year"}),
    indexes = {
        @Index(name = "idx_payroll_month_year", columnList = "month, year"),
        @Index(name = "idx_payroll_status", columnList = "status")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "month", nullable = false)
    private Integer month;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "processed_date", nullable = false)
    private LocalDate processedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private PayrollStatus status = PayrollStatus.PENDING;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_date")
    private LocalDate approvedDate;

    @Column(name = "remarks")
    private String remarks;

    @JsonIgnore
    @OneToMany(mappedBy = "payroll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payslip> payslips = new ArrayList<>();

}
