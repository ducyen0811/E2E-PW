Feature: Resizable interaction

  @smoke @interactions @resizable
  Scenario: Resize the restricted box
    Given the user is on the Resizable page
    When the user resizes the restricted box
    Then the restricted box size is increased
