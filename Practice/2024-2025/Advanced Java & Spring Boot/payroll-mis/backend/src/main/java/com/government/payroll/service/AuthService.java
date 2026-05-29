package com.government.payroll.service;

import com.government.payroll.dto.request.LoginRequest;
import com.government.payroll.dto.request.RefreshTokenRequest;
import com.government.payroll.dto.request.RegisterRequest;
import com.government.payroll.dto.response.AuthResponse;
import com.government.payroll.entity.Role;
import com.government.payroll.entity.User;
import com.government.payroll.entity.enums.RoleName;
import com.government.payroll.exception.DuplicateResourceException;
import com.government.payroll.exception.ResourceNotFoundException;
import com.government.payroll.repository.RoleRepository;
import com.government.payroll.repository.UserRepository;
import com.government.payroll.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service for authentication operations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final UserDetailsService userDetailsService;
  
  /**
   * Register a new user
   */
  @Transactional
  public AuthResponse register(RegisterRequest request) {
    log.info("Registering new user with email: {}", request.getEmail());
    
    // Check if user already exists
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new DuplicateResourceException("User", "email", request.getEmail());
    }
    
    // Create new user
    User user = User.builder()
      .email(request.getEmail())
      .password(passwordEncoder.encode(request.getPassword()))
      .enabled(true)
      .build();
    
    // Assign roles
    Set<Role> roles = new HashSet<>();
    if (request.getRoles() != null && !request.getRoles().isEmpty()) {
      for (String roleName : request.getRoles()) {
        Role role = roleRepository.findByName(RoleName.valueOf(roleName))
          .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleName));
        roles.add(role);
      }
    } else {
      // Default role is EMPLOYEE
      Role employeeRole = roleRepository.findByName(RoleName.ROLE_EMPLOYEE)
        .orElseThrow(() -> new ResourceNotFoundException("Role", "name", "ROLE_EMPLOYEE"));
      roles.add(employeeRole);
    }
    user.setRoles(roles);
    
    // Save user
    userRepository.save(user);
    log.info("User registered successfully: {}", user.getEmail());
    
    // Generate tokens
    UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
    String accessToken = jwtService.generateToken(userDetails);
    String refreshToken = jwtService.generateRefreshToken(userDetails);
    
    return AuthResponse.builder()
      .accessToken(accessToken)
      .refreshToken(refreshToken)
      .tokenType("Bearer")
      .email(user.getEmail())
      .roles(user.getRoles().stream()
        .map(role -> role.getName().name())
        .collect(Collectors.toSet()))
      .build();
  }
  
  /**
   * Authenticate user and generate tokens
   */
  @Transactional(readOnly = true)
  public AuthResponse login(LoginRequest request) {
    log.info("Authenticating user: {}", request.getEmail());
    
    // Authenticate user
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getEmail(),
        request.getPassword()
      )
    );
    
    // Load user details
    User user = userRepository.findByEmailWithRoles(request.getEmail())
      .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));
    
    UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
    
    // Generate tokens
    String accessToken = jwtService.generateToken(userDetails);
    String refreshToken = jwtService.generateRefreshToken(userDetails);
    
    log.info("User authenticated successfully: {}", user.getEmail());
    
    return AuthResponse.builder()
      .accessToken(accessToken)
      .refreshToken(refreshToken)
      .tokenType("Bearer")
      .email(user.getEmail())
      .roles(user.getRoles().stream()
        .map(role -> role.getName().name())
        .collect(Collectors.toSet()))
      .build();
  }
  
  /**
   * Refresh access token using refresh token
   */
  @Transactional(readOnly = true)
  public AuthResponse refreshToken(RefreshTokenRequest request) {
    log.info("Refreshing access token");
    
    // Extract username from refresh token
    String username = jwtService.extractUsername(request.getRefreshToken());
    
    // Load user details
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    
    // Validate refresh token
    if (!jwtService.validateToken(request.getRefreshToken(), userDetails)) {
      throw new IllegalArgumentException("Invalid refresh token");
    }
    
    // Generate new access token
    String accessToken = jwtService.generateToken(userDetails);
    
    User user = userRepository.findByEmailWithRoles(username)
      .orElseThrow(() -> new ResourceNotFoundException("User", "email", username));
    
    log.info("Access token refreshed successfully for user: {}", username);
    
    return AuthResponse.builder()
      .accessToken(accessToken)
      .refreshToken(request.getRefreshToken())
      .tokenType("Bearer")
      .email(user.getEmail())
      .roles(user.getRoles().stream()
        .map(role -> role.getName().name())
        .collect(Collectors.toSet()))
      .build();
  }
  
  /**
   * Get current authenticated user
   */
  @Transactional(readOnly = true)
  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();
    return userRepository.findByEmailWithRoles(email)
      .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
  }
  
}
