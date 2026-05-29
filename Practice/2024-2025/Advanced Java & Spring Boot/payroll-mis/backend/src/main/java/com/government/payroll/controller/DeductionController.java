package com.government.payroll.controller;

import com.government.payroll.dto.request.DeductionRequest;
import com.government.payroll.dto.response.ApiResponse;
import com.government.payroll.dto.response.DeductionResponse;
import com.government.payroll.service.DeductionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for deduction management operations
 */
@RestController
@RequestMapping("/api/v1/deductions")
@RequiredArgsConstructor
@Tag(name = "Deductions", description = "Deduction management endpoints")
public class DeductionController {
  
  private final DeductionService deductionService;
  
  @GetMapping
  @Operation(summary = "Get all deductions", description = "Get list of all active deductions")
  public ResponseEntity<ApiResponse<List<DeductionResponse>>> getAllDeductions() {
    List<DeductionResponse> response = deductionService.getAllDeductions();
    return ResponseEntity.ok(ApiResponse.success("Deductions retrieved successfully", response));
  }
  
  @PutMapping("/{id}")
  @Operation(summary = "Update deduction", description = "Update deduction percentage")
  public ResponseEntity<ApiResponse<DeductionResponse>> updateDeduction(
    @Parameter(description = "Deduction ID") @PathVariable Long id,
    @Valid @RequestBody DeductionRequest request) {
    
    DeductionResponse response = deductionService.updateDeduction(id, request);
    return ResponseEntity.ok(ApiResponse.success("Deduction updated successfully", response));
  }
  
}
