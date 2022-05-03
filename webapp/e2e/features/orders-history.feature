Feature: Seeing my orders history
Scenario: The orders history has orders
  Given A user with some orders 
  When I click the orders history button
  Then Orders must be seen