package rw.ac.binarysupermarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.ac.binarysupermarket.model.Quantity;

public interface QuantityRepository extends JpaRepository<Quantity, Long> {
}
