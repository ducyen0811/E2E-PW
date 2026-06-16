Feature: Menu widget

  @smoke @widgets @menu
  Scenario: Navigate nested menu items by hover
    Given the user is on the Menu page
    When the user hovers through the nested menu
    Then the nested menu items are displayed
