package com.government.payroll.controller;

import com.government.payroll.dto.request.EmployeeRequest;
import com.government.payroll.dto.response.ApiResponse;
import com.government.payroll.dto.response.EmployeeResponse;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.entity.enums.EmployeeStatus;
import com.government.payroll.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for employee management operations
 */
@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@Tag(name = "Employees", description = "Employee management endpoints")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "Get all employees", description = "Get paginated list of all employees")
    public ResponseEntity<ApiResponse<PageResponse<EmployeeResponse>>> getAllEmployees(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        PageResponse<EmployeeResponse> response = employeeService.getAllEmployees(page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Employees retrieved successfully", response));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get employees by status", description = "Get paginated list of employees by status")
    public ResponseEntity<ApiResponse<PageResponse<EmployeeResponse>>> getEmployeesByStatus(
            @Parameter(description = "Employee status") @PathVariable EmployeeStatus status,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<EmployeeResponse> response = employeeService.getEmployeesByStatus(status, page, size);
        return ResponseEntity.ok(ApiResponse.success("Employees retrieved successfully", response));
    }

    @GetMapping("/search")
    @Operation(summary = "Search employees", description = "Search employees by name, email, or employee code")
    public ResponseEntity<ApiResponse<PageResponse<EmployeeResponse>>> searchEmployees(
            @Parameter(description = "Search query") @RequestParam String query,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<EmployeeResponse> response = employeeService.searchEmployees(query, page, size);
        return ResponseEntity.ok(ApiResponse.success("Search completed successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID", description = "Get employee details by ID")
    public ResponseEntity<ApiResponse<EmployeeResponse>> getEmployeeById(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        
        EmployeeResponse response = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(ApiResponse.success("Employee retrieved successfully", response));
    }

    @PostMapping
    @Operation(summary = "Create employee", description = "Create a new employee")
    public ResponseEntity<ApiResponse<EmployeeResponse>> createEmployee(
            @Valid @RequestBody EmployeeRequest request) {
        
        EmployeeResponse response = employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee created successfully", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update employee", description = "Update existing employee")
    public ResponseEntity<ApiResponse<EmployeeResponse>> updateEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {
        
        EmployeeResponse response = employeeService.updateEmployee(id, request);
        return ResponseEntity.ok(ApiResponse.success("Employee updated successfully", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee", description = "Delete employee (soft delete)")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(ApiResponse.success("Employee deleted successfully"));
    }

}
