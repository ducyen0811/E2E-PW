Feature: Check Box

  @smoke @elements @check-box
  Scenario: Select a checkbox tree item
    Given the user is on the Check Box page
    When the user selects the Home checkbox
    Then the selected checkbox results are displayed
