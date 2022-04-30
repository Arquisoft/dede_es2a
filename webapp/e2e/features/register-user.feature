Feature: Register a user
Scenario: Register a user
  Given The application without user in session
  When We press the register button and fill the form
  Then Disconnection text appears