Feature: Dynamic Properties

  @smoke @elements @dynamic-properties
  Scenario: Verify dynamic element properties
    Given the user is on the Dynamic Properties page
    Then the dynamic buttons reach their expected states

  @elements @dynamic-properties @state
  Scenario: Verify dynamic elements initial state before waiting
    Given the user is on the Dynamic Properties page
    Then the dynamic buttons start in their initial states
