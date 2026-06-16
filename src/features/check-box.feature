Feature: Check Box

  @smoke @elements @check-box
  Scenario: Select a checkbox tree item
    Given the user is on the Check Box page
    When the user selects the Home checkbox
    Then the selected checkbox results are displayed

  @elements @check-box @state
  Scenario: Clear checkbox selection by clicking Home again
    Given the user is on the Check Box page
    When the user selects the Home checkbox
    And the user clears the Home checkbox selection
    Then no checkbox results are displayed
