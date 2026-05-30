package rw.ac.binarysupermarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.ac.binarysupermarket.model.Customer;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
    boolean existsByEmail(String email);
}
