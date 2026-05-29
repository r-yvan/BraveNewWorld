package com.government.payroll.controller;

import com.government.payroll.dto.response.ApiResponse;
import com.government.payroll.dto.response.MessageResponse;
import com.government.payroll.dto.response.PageResponse;
import com.government.payroll.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for message operations
 */
@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
@Tag(name = "Messages", description = "Employee message/notification endpoints")
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/my")
    @Operation(summary = "Get my messages", description = "Get paginated list of messages for current user")
    public ResponseEntity<ApiResponse<PageResponse<MessageResponse>>> getMyMessages(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<MessageResponse> response = messageService.getMyMessages(page, size);
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved successfully", response));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get all messages", description = "Get paginated list of all messages (Admin/Manager only)")
    public ResponseEntity<ApiResponse<PageResponse<MessageResponse>>> getAllMessages(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<MessageResponse> response = messageService.getAllMessages(page, size);
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved successfully", response));
    }

}
