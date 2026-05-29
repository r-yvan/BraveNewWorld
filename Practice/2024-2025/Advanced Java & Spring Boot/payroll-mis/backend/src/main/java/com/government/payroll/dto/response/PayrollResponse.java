package com.government.payroll.dto.response;

import com.government.payroll.entity.enums.PayrollStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for payroll response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Payroll response")
public class PayrollResponse {

    @Schema(description = "Payroll ID", example = "1")
    private Long id;

    @Schema(description = "Month", example = "5")
    private Integer month;

    @Schema(description = "Year", example = "2026")
    private Integer year;

    @Schema(description = "Processed date", example = "2026-05-28")
    private LocalDate processedDate;

    @Schema(description = "Status", example = "PENDING")
    private PayrollStatus status;

    @Schema(description = "Approved by", example = "admin@gov.rw")
    private String approvedBy;

    @Schema(description = "Approved date", example = "2026-05-29")
    private LocalDate approvedDate;

    @Schema(description = "Remarks", example = "May 2026 payroll")
    private String remarks;

    @Schema(description = "Number of payslips", example = "50")
    private Integer payslipCount;

}
