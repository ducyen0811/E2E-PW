Feature: Links

  @smoke @elements @links
  Scenario: Verify Links page navigation and API response links
    Given the user is on the Links page
    When the user opens the Home link in a new tab
    Then the Links page remains visible
    When the user opens each API response link
    Then each API response message is displayed
