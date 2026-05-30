package rw.ac.binarysupermarket.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "quantities")
@Data
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_code", nullable = false)
    private Long productCode;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private String operation;
    
    @Column(nullable = false)
    private LocalDate date;
}
