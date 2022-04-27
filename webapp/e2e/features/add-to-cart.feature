Feature: Adding an item to the Shopping Cart
Scenario: The cart is empty
  Given The empty Cart
  When I press the add to cart item button
  Then The cart should have an item