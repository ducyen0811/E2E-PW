Feature: Tool Tips widget

  @smoke @widgets @tool-tips
  Scenario: Display tooltips for button and input
    Given the user is on the Tool Tips page
    When the user hovers over the tooltip button
    Then the button tooltip is displayed
    When the user hovers over the tooltip input
    Then the input tooltip is displayed
