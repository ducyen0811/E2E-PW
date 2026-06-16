Feature: Auto Complete widget

  @smoke @widgets @auto-complete
  Scenario: Select multiple and single auto-complete values
    Given the user is on the Auto Complete page
    When the user selects multiple auto-complete colors
    And the user selects a single auto-complete color
    Then the selected auto-complete colors are displayed
