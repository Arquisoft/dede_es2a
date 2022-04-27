Feature: Paying an item
Scenario: Paying an item
  Given An item is in the cart
  When We press the order button
  Then The pay page appears