package com.government.payroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main application class for Government ERP Payroll Management System
 *
 * @author Government ERP Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.government.payroll.repository")
public class PayrollErpApplication {
  public static void main(String[] args) {
    SpringApplication.run(PayrollErpApplication.class, args);
  }
  
}
