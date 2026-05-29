package com.government.payroll.repository;

import com.government.payroll.entity.Payslip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Payslip entity
 */
@Repository
public interface PayslipRepository extends JpaRepository<Payslip, Long> {

    @Query("SELECT p FROM Payslip p WHERE p.employee.id = :employeeId AND p.deleted = false ORDER BY p.payroll.year DESC, p.payroll.month DESC")
    Page<Payslip> findByEmployeeId(@Param("employeeId") Long employeeId, Pageable pageable);

    @Query("SELECT p FROM Payslip p WHERE p.payroll.id = :payrollId AND p.deleted = false")
    List<Payslip> findByPayrollId(@Param("payrollId") Long payrollId);

    @Query("SELECT p FROM Payslip p WHERE p.employee.id = :employeeId AND p.id = :id AND p.deleted = false")
    Optional<Payslip> findByIdAndEmployeeId(@Param("id") Long id, @Param("employeeId") Long employeeId);

}
