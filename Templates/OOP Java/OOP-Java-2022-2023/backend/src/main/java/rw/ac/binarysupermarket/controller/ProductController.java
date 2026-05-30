package rw.ac.binarysupermarket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.binarysupermarket.model.Product;
import rw.ac.binarysupermarket.model.Quantity;
import rw.ac.binarysupermarket.service.ProductService;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
    
    @PostMapping("/quantity")
    public ResponseEntity<Quantity> addQuantity(@RequestBody Quantity quantity) {
        return ResponseEntity.ok(productService.addQuantity(quantity));
    }
}
