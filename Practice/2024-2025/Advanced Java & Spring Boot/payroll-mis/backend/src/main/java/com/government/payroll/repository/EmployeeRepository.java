package com.government.payroll.repository;

import com.government.payroll.entity.Employee;
import com.government.payroll.entity.enums.EmployeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Employee entity
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByEmployeeCode(String employeeCode);

    Boolean existsByEmail(String email);

    Boolean existsByEmployeeCode(String employeeCode);

    @Query("SELECT e FROM Employee e WHERE e.deleted = false")
    Page<Employee> findAllActive(Pageable pageable);

    @Query("SELECT e FROM Employee e WHERE e.status = :status AND e.deleted = false")
    Page<Employee> findByStatus(@Param("status") EmployeeStatus status, Pageable pageable);

    @Query("SELECT e FROM Employee e WHERE e.status = :status AND e.deleted = false")
    List<Employee> findByStatus(@Param("status") EmployeeStatus status);

    @Query("SELECT e FROM Employee e WHERE " +
           "(LOWER(e.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.employeeCode) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND e.deleted = false")
    Page<Employee> searchEmployees(@Param("search") String search, Pageable pageable);

    @Query("SELECT e FROM Employee e LEFT JOIN FETCH e.employment WHERE e.id = :id AND e.deleted = false")
    Optional<Employee> findByIdWithEmployment(@Param("id") Long id);

}
