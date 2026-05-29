package com.government.payroll.repository;

import com.government.payroll.entity.Payroll;
import com.government.payroll.entity.enums.PayrollStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for Payroll entity
 */
@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    Optional<Payroll> findByMonthAndYear(Integer month, Integer year);

    Boolean existsByMonthAndYear(Integer month, Integer year);

    @Query("SELECT p FROM Payroll p WHERE p.deleted = false ORDER BY p.year DESC, p.month DESC")
    Page<Payroll> findAllActive(Pageable pageable);

    @Query("SELECT p FROM Payroll p WHERE p.status = :status AND p.deleted = false ORDER BY p.year DESC, p.month DESC")
    Page<Payroll> findByStatus(@Param("status") PayrollStatus status, Pageable pageable);

}
