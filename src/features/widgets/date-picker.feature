Feature: Date Picker widget

  @smoke @widgets @date-picker
  Scenario: Update date picker values
    Given the user is on the Date Picker page
    When the user sets the date picker date
    And the user sets the date and time picker value
    Then the date picker values are updated
