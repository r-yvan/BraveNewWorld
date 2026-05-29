package com.government.payroll.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for payroll processing request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Payroll processing request payload")
public class PayrollProcessRequest {

    @NotNull(message = "Month is required")
    @Min(value = 1, message = "Month must be between 1 and 12")
    @Max(value = 12, message = "Month must be between 1 and 12")
    @Schema(description = "Payroll month", example = "5")
    private Integer month;

    @NotNull(message = "Year is required")
    @Min(value = 2020, message = "Year must be 2020 or later")
    @Schema(description = "Payroll year", example = "2026")
    private Integer year;

    @Schema(description = "Remarks or notes", example = "May 2026 payroll processing")
    private String remarks;

}
