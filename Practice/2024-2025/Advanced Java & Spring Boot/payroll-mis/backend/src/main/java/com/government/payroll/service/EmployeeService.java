package com.government.payroll.service;

import com.government.payroll.dto.request.EmployeeRequest;
import com.government.payroll.dto.response.EmployeeResponse;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.entity.Employee;
import com.government.payroll.entity.Employment;
import com.government.payroll.entity.enums.EmployeeStatus;
import com.government.payroll.exception.DuplicateResourceException;
import com.government.payroll.exception.ResourceNotFoundException;
import com.government.payroll.mapper.EmployeeMapper;
import com.government.payroll.repository.EmployeeRepository;
import com.government.payroll.repository.EmploymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for employee management operations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeeService {
  
  private final EmployeeRepository employeeRepository;
  private final EmploymentRepository employmentRepository;
  private final EmployeeMapper employeeMapper;
  
  /**
   * Get all employees with pagination
   */
  @Transactional(readOnly = true)
  public PageResponse<EmployeeResponse> getAllEmployees(int page, int size, String sortBy, String sortDir) {
    log.info("Fetching employees - page: {}, size: {}", page, size);
    
    Sort sort = sortDir.equalsIgnoreCase("desc")
      ? Sort.by(sortBy).descending()
      : Sort.by(sortBy).ascending();
    
    Pageable pageable = PageRequest.of(page, size, sort);
    Page<Employee> employeePage = employeeRepository.findAllActive(pageable);
    
    return buildPageResponse(employeePage);
  }
  
  /**
   * Get employees by status
   */
  @Transactional(readOnly = true)
  public PageResponse<EmployeeResponse> getEmployeesByStatus(EmployeeStatus status, int page, int size) {
    log.info("Fetching employees with status: {}", status);
    
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
    Page<Employee> employeePage = employeeRepository.findByStatus(status, pageable);
    
    return buildPageResponse(employeePage);
  }
  
  /**
   * Search employees
   */
  @Transactional(readOnly = true)
  public PageResponse<EmployeeResponse> searchEmployees(String search, int page, int size) {
    log.info("Searching employees with query: {}", search);
    
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
    Page<Employee> employeePage = employeeRepository.searchEmployees(search, pageable);
    
    return buildPageResponse(employeePage);
  }
  
  /**
   * Get employee by ID
   */
  @Transactional(readOnly = true)
  public EmployeeResponse getEmployeeById(Long id) {
    log.info("Fetching employee with ID: {}", id);
    
    Employee employee = employeeRepository.findByIdWithEmployment(id)
      .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
    
    return employeeMapper.toResponse(employee);
  }
  
  /**
   * Create new employee
   */
  @Transactional
  public EmployeeResponse createEmployee(EmployeeRequest request) {
    log.info("Creating new employee with code: {}", request.getEmployeeCode());
    
    // Check for duplicates
    if (employeeRepository.existsByEmail(request.getEmail())) {
      throw new DuplicateResourceException("Employee", "email", request.getEmail());
    }
    if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
      throw new DuplicateResourceException("Employee", "employeeCode", request.getEmployeeCode());
    }
    
    // Create employee
    Employee employee = employeeMapper.toEntity(request);
    if (employee.getStatus() == null) {
      employee.setStatus(EmployeeStatus.ACTIVE);
    }
    employee = employeeRepository.save(employee);
    
    // Create employment
    Employment employment = Employment.builder()
      .employee(employee)
      .department(request.getDepartment())
      .position(request.getPosition())
      .baseSalary(request.getBaseSalary())
      .build();
    employmentRepository.save(employment);
    
    // Reload employee with employment
    Long employeeId = employee.getId();
    Employee reloadedEmployee = employeeRepository.findByIdWithEmployment(employeeId)
      .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", employeeId));
    
    log.info("Employee created successfully with ID: {}", employeeId);
    
    return employeeMapper.toResponse(reloadedEmployee);
  }
  
  /**
   * Update employee
   */
  @Transactional
  public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
    log.info("Updating employee with ID: {}", id);
    
    Employee employee = employeeRepository.findByIdWithEmployment(id)
      .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
    
    // Check for duplicate email (excluding current employee)
    if (!employee.getEmail().equals(request.getEmail()) &&
      employeeRepository.existsByEmail(request.getEmail())) {
      throw new DuplicateResourceException("Employee", "email", request.getEmail());
    }
    
    // Check for duplicate employee code (excluding current employee)
    if (!employee.getEmployeeCode().equals(request.getEmployeeCode()) &&
      employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
      throw new DuplicateResourceException("Employee", "employeeCode", request.getEmployeeCode());
    }
    
    // Update employee
    employeeMapper.updateEntity(request, employee);
    employeeRepository.save(employee);
    
    // Update employment
    Employment employment = employee.getEmployment();
    if (employment == null) {
      employment = new Employment();
      employment.setEmployee(employee);
    }
    employment.setDepartment(request.getDepartment());
    employment.setPosition(request.getPosition());
    employment.setBaseSalary(request.getBaseSalary());
    employmentRepository.save(employment);
    
    // Reload employee with employment
    Employee updatedEmployee = employeeRepository.findByIdWithEmployment(id)
      .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
    
    log.info("Employee updated successfully with ID: {}", id);
    
    return employeeMapper.toResponse(updatedEmployee);
  }
  
  /**
   * Delete employee (soft delete)
   */
  @Transactional
  public void deleteEmployee(Long id) {
    log.info("Deleting employee with ID: {}", id);
    
    Employee employee = employeeRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
    
    employee.setDeleted(true);
    employee.setStatus(EmployeeStatus.TERMINATED);
    employeeRepository.save(employee);
    
    log.info("Employee deleted successfully with ID: {}", id);
  }
  
  /**
   * Build page response
   */
  private PageResponse<EmployeeResponse> buildPageResponse(Page<Employee> employeePage) {
    return PageResponse.<EmployeeResponse>builder()
      .content(employeePage.getContent().stream()
        .map(employeeMapper::toResponse)
        .toList())
      .page(employeePage.getNumber())
      .size(employeePage.getSize())
      .totalElements(employeePage.getTotalElements())
      .totalPages(employeePage.getTotalPages())
      .last(employeePage.isLast())
      .build();
  }
  
}
