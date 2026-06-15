Feature: Buttons

  @smoke @elements @buttons
  Scenario: Trigger all button click actions
    Given the user is on the Buttons page
    When the user performs all button click actions
    Then all button click messages are displayed
