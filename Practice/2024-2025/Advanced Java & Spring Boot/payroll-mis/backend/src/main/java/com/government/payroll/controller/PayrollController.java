package com.government.payroll.controller;

import com.government.payroll.dto.request.PayrollProcessRequest;
import com.government.payroll.dto.response.ApiResponse;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.dto.response.PayrollResponse;
import com.government.payroll.service.PayrollService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for payroll processing operations
 */
@RestController
@RequestMapping("/api/v1/payroll")
@RequiredArgsConstructor
@Tag(name = "Payroll", description = "Payroll processing endpoints")
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/process")
    @Operation(summary = "Process payroll", description = "Process payroll for a given month and year")
    public ResponseEntity<ApiResponse<PayrollResponse>> processPayroll(
            @Valid @RequestBody PayrollProcessRequest request) {
        
        PayrollResponse response = payrollService.processPayroll(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Payroll processed successfully", response));
    }

    @GetMapping
    @Operation(summary = "Get all payrolls", description = "Get paginated list of all payrolls")
    public ResponseEntity<ApiResponse<PageResponse<PayrollResponse>>> getAllPayrolls(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<PayrollResponse> response = payrollService.getAllPayrolls(page, size);
        return ResponseEntity.ok(ApiResponse.success("Payrolls retrieved successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get payroll by ID", description = "Get payroll details by ID")
    public ResponseEntity<ApiResponse<PayrollResponse>> getPayrollById(
            @Parameter(description = "Payroll ID") @PathVariable Long id) {
        
        PayrollResponse response = payrollService.getPayrollById(id);
        return ResponseEntity.ok(ApiResponse.success("Payroll retrieved successfully", response));
    }

    @PutMapping("/{id}/approve")
    @Operation(summary = "Approve payroll", description = "Approve payroll and update payslip statuses")
    public ResponseEntity<ApiResponse<PayrollResponse>> approvePayroll(
            @Parameter(description = "Payroll ID") @PathVariable Long id) {
        
        PayrollResponse response = payrollService.approvePayroll(id);
        return ResponseEntity.ok(ApiResponse.success("Payroll approved successfully", response));
    }

}
