package com.government.payroll.controller;

import com.government.payroll.dto.response.ApiResponse;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.dto.response.PayslipResponse;
import com.government.payroll.service.PayslipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for payslip operations
 */
@RestController
@RequestMapping("/api/v1/payslips")
@RequiredArgsConstructor
@Tag(name = "Payslips", description = "Payslip management endpoints")
public class PayslipController {

    private final PayslipService payslipService;

    @GetMapping("/my")
    @Operation(summary = "Get my payslips", description = "Get paginated list of payslips for current user")
    public ResponseEntity<ApiResponse<PageResponse<PayslipResponse>>> getMyPayslips(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<PayslipResponse> response = payslipService.getMyPayslips(page, size);
        return ResponseEntity.ok(ApiResponse.success("Payslips retrieved successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get payslip by ID", description = "Get payslip details by ID")
    public ResponseEntity<ApiResponse<PayslipResponse>> getPayslipById(
            @Parameter(description = "Payslip ID") @PathVariable Long id) {
        
        PayslipResponse response = payslipService.getPayslipById(id);
        return ResponseEntity.ok(ApiResponse.success("Payslip retrieved successfully", response));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Download payslip PDF", description = "Download payslip as PDF document")
    public ResponseEntity<byte[]> downloadPayslip(
            @Parameter(description = "Payslip ID") @PathVariable Long id) {
        
        byte[] pdfBytes = payslipService.downloadPayslip(id);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "payslip_" + id + ".pdf");
        headers.setContentLength(pdfBytes.length);
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

}
