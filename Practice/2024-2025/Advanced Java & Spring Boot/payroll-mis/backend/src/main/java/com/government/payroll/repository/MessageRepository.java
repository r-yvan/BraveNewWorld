package com.government.payroll.repository;

import com.government.payroll.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Message entity
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE m.employee.id = :employeeId AND m.deleted = false ORDER BY m.createdAt DESC")
    Page<Message> findByEmployeeId(@Param("employeeId") Long employeeId, Pageable pageable);

    @Query("SELECT m FROM Message m WHERE m.deleted = false ORDER BY m.createdAt DESC")
    Page<Message> findAllActive(Pageable pageable);

}
