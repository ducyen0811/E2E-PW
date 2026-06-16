Feature: Select Menu widget

  @smoke @widgets @select-menu
  Scenario: Select standard and multi-select menu values
    Given the user is on the Select Menu page
    When the user selects values from the select menus
    Then the select menu values are displayed
