package rw.ac.binarysupermarket.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "purchased")
@Data
public class Purchased {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_code", nullable = false)
    private Long productCode;
    
    @Column(name = "customer_id", nullable = false)
    private Long customerId;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private Double total;
    
    @Column(nullable = false)
    private LocalDate date;
}
