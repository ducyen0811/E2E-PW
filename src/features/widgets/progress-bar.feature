Feature: Progress Bar widget

  @smoke @widgets @progress-bar
  Scenario: Complete and reset the progress bar
    Given the user is on the Progress Bar page
    When the user starts the progress bar
    Then the progress bar reaches 100 percent
    When the user resets the progress bar
    Then the progress bar returns to 0 percent
