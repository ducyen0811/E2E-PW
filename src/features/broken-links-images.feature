Feature: Broken Links - Images

  @elements @broken-links-images
  Scenario: Verify valid and broken images and links
    Given the user is on the Broken Links - Images page
    Then the valid and broken images are displayed correctly
    And the valid link navigates to the home page
    And the broken link navigates to an error page
