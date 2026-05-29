package com.government.payroll.config;

import com.government.payroll.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration for the application
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  
  private final JwtAuthenticationFilter jwtAuthFilter;
  private final UserDetailsService userDetailsService;
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
      .cors(cors -> cors.configure(http))
      .authorizeHttpRequests(auth -> auth
        // Public endpoints
        .requestMatchers("/api/v1/auth/**").permitAll()
        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html", "/api-docs/**").permitAll()
        .requestMatchers("/actuator/**").permitAll()
        
        // Employee endpoints
        .requestMatchers(HttpMethod.GET, "/api/v1/employees/**").hasAnyRole("ADMIN", "MANAGER", "EMPLOYEE")
        .requestMatchers(HttpMethod.POST, "/api/v1/employees").hasAnyRole("ADMIN", "MANAGER")
        .requestMatchers(HttpMethod.PUT, "/api/v1/employees/**").hasAnyRole("ADMIN", "MANAGER")
        .requestMatchers(HttpMethod.DELETE, "/api/v1/employees/**").hasRole("ADMIN")
        
        // Payroll endpoints
        .requestMatchers(HttpMethod.POST, "/api/v1/payroll/process").hasAnyRole("ADMIN", "MANAGER")
        .requestMatchers(HttpMethod.GET, "/api/v1/payroll/**").hasAnyRole("ADMIN", "MANAGER")
        .requestMatchers(HttpMethod.PUT, "/api/v1/payroll/*/approve").hasRole("ADMIN")
        
        // Payslip endpoints
        .requestMatchers("/api/v1/payslips/my/**").hasAnyRole("ADMIN", "MANAGER", "EMPLOYEE")
        .requestMatchers("/api/v1/payslips/**").hasAnyRole("ADMIN", "MANAGER", "EMPLOYEE")
        
        // Deduction endpoints
        .requestMatchers(HttpMethod.GET, "/api/v1/deductions/**").hasAnyRole("ADMIN", "MANAGER")
        .requestMatchers(HttpMethod.PUT, "/api/v1/deductions/**").hasRole("ADMIN")
        
        // Message endpoints
        .requestMatchers("/api/v1/messages/**").hasAnyRole("ADMIN", "MANAGER", "EMPLOYEE")
        
        // All other requests require authentication
        .anyRequest().authenticated()
      )
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .authenticationProvider(authenticationProvider())
      .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
  }
  
  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
  
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
