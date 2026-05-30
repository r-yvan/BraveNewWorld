package rw.ac.binarysupermarket.dto;

import lombok.Data;
import java.util.List;

@Data
public class CheckoutRequest {
    private List<CartItemDTO> items;
}
