package com.government.payroll.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Generic pagination response wrapper
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Pagination response wrapper")
public class PageResponse<T> {

    @Schema(description = "Page content")
    private List<T> content;

    @Schema(description = "Current page number", example = "0")
    private Integer page;

    @Schema(description = "Page size", example = "10")
    private Integer size;

    @Schema(description = "Total elements", example = "100")
    private Long totalElements;

    @Schema(description = "Total pages", example = "10")
    private Integer totalPages;

    @Schema(description = "Is last page", example = "false")
    private Boolean last;

}
