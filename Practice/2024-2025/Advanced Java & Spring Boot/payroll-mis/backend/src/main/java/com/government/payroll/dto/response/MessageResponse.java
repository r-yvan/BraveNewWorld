package com.government.payroll.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for message response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Message response")
public class MessageResponse {

    @Schema(description = "Message ID", example = "1")
    private Long id;

    @Schema(description = "Employee name", example = "John Doe")
    private String employeeName;

    @Schema(description = "Message content", example = "Dear John Doe, Your salary of 5/2026 from GOVERNMENT ERP amount 270000 has been credited successfully.")
    private String message;

    @Schema(description = "Month", example = "5")
    private Integer month;

    @Schema(description = "Year", example = "2026")
    private Integer year;

    @Schema(description = "Is read", example = "false")
    private Boolean isRead;

    @Schema(description = "Created at", example = "2026-05-28T10:00:00")
    private LocalDateTime createdAt;

}
