Feature: Buttons

  @smoke @elements @buttons
  Scenario: Trigger all button click actions
    Given the user is on the Buttons page
    When the user performs all button click actions
    Then all button click messages are displayed

  @elements @buttons @negative
  Scenario: Single click does not trigger the double-click action
    Given the user is on the Buttons page
    When the user single-clicks the double-click button
    Then the double-click message is not displayed
