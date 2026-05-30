package rw.ac.binarysupermarket.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long code;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "product_type", nullable = false)
    private String productType;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(name = "in_date")
    private LocalDate inDate;
    
    private String image;
    
    @Column(name = "available_quantity")
    private Integer availableQuantity = 0;
}
