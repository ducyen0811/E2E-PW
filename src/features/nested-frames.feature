Feature: Nested Frames

  @smoke @alerts-frame-windows @nested-frames
  Scenario: Verify content inside nested frames
    Given the user is on the Nested Frames page
    Then the parent and child nested frames display their text
