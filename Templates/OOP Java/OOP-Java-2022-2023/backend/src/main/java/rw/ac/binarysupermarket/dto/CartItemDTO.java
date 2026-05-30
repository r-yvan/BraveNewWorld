package rw.ac.binarysupermarket.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long productCode;
    private Integer quantity;
}
