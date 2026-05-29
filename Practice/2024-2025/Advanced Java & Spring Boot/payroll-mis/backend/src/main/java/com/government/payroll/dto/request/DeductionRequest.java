package com.government.payroll.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for deduction update request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Deduction update request payload")
public class DeductionRequest {

    @NotNull(message = "Percentage is required")
    @DecimalMin(value = "0.0", message = "Percentage must be at least 0")
    @DecimalMax(value = "100.0", message = "Percentage must not exceed 100")
    @Schema(description = "Deduction percentage", example = "30.0")
    private BigDecimal percentage;

    @Schema(description = "Deduction description", example = "Employee tax deduction")
    private String description;

}
