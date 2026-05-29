package com.government.payroll.controller;

import com.government.payroll.dto.request.LoginRequest;
import com.government.payroll.dto.request.RefreshTokenRequest;
import com.government.payroll.dto.request.RegisterRequest;
import com.government.payroll.dto.response.ApiResponse;
import com.government.payroll.dto.response.AuthResponse;
import com.government.payroll.entity.User;
import com.government.payroll.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * REST controller for authentication operations
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication and authorization endpoints")
public class AuthController {
  
  private final AuthService authService;
  
  @PostMapping("/register")
  @Operation(summary = "Register new user", description = "Register a new user with email and password")
  public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
    AuthResponse response = authService.register(request);
    return ResponseEntity.ok(ApiResponse.success("User registered successfully", response));
  }
  
  @PostMapping("/login")
  @Operation(summary = "Login user", description = "Authenticate user and generate JWT tokens")
  public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
    AuthResponse response = authService.login(request);
    return ResponseEntity.ok(ApiResponse.success("Login successful", response));
  }
  
  @PostMapping("/refresh")
  @Operation(summary = "Refresh access token", description = "Generate new access token using refresh token")
  public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
    AuthResponse response = authService.refreshToken(request);
    return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
  }
  
  @GetMapping("/me")
  @Operation(summary = "Get current user", description = "Get currently authenticated user information")
  public ResponseEntity<ApiResponse<Map<String, Object>>> getCurrentUser() {
    User user = authService.getCurrentUser();
    
    Map<String, Object> userData = new HashMap<>();
    userData.put("id", user.getId());
    userData.put("email", user.getEmail());
    userData.put("enabled", user.getEnabled());
    userData.put("roles", user.getRoles().stream()
      .map(role -> role.getName().name())
      .collect(Collectors.toSet()));
    
    if (user.getEmployee() != null) {
      Map<String, Object> employeeData = new HashMap<>();
      employeeData.put("id", user.getEmployee().getId());
      employeeData.put("fullName", user.getEmployee().getFullName());
      employeeData.put("employeeCode", user.getEmployee().getEmployeeCode());
      employeeData.put("status", user.getEmployee().getStatus());
      userData.put("employee", employeeData);
    }
    
    return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", userData));
  }
  
}
