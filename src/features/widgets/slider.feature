Feature: Slider widget

  @smoke @widgets @slider
  Scenario: Move the slider to a target value
    Given the user is on the Slider page
    When the user moves the slider to 75
    Then the slider value should be 75
