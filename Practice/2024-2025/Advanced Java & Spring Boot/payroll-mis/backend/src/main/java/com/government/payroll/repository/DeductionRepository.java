package com.government.payroll.repository;

import com.government.payroll.entity.Deduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Deduction entity
 */
@Repository
public interface DeductionRepository extends JpaRepository<Deduction, Long> {

    Optional<Deduction> findByDeductionName(String deductionName);

    Boolean existsByDeductionName(String deductionName);

    @Query("SELECT d FROM Deduction d WHERE d.isActive = true AND d.deleted = false")
    List<Deduction> findAllActive();

}
