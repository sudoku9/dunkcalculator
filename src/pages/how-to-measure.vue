<template>
  <div class="measure-guide">
    <h1>How to Take Accurate Measurements</h1>
    
    <div class="measurement-sections">
      <section class="guide-section">
        <h2>Height Measurement</h2>
        <div class="guide-content">
          <img src="@/assets/images/height-measure.svg" alt="Height measurement guide">
          <div class="instructions">
            <h3>Required Equipment</h3>
            <ul>
              <li>Flat wall</li>
              <li>Measuring tape</li>
              <li>Level surface</li>
            </ul>
            
            <h3>Steps</h3>
            <ol>
              <li>Stand against a flat wall</li>
              <li>Keep your feet flat on the ground</li>
              <li>Look straight ahead</li>
              <li>Use a flat object to mark your height</li>
              <li>Measure from the floor to the mark</li>
            </ol>
          </div>
        </div>
      </section>

      <section class="guide-section">
        <h2>Standing Reach</h2>
        <div class="guide-content">
          <img src="@/assets/images/reach-measure.svg" alt="Standing reach measurement">
          <div class="instructions">
            <h3>Required Equipment</h3>
            <ul>
              <li>Flat wall</li>
              <li>Measuring tape</li>
              <li>Marker or tape</li>
            </ul>
            
            <h3>Steps</h3>
            <ol>
              <li>Stand facing a wall</li>
              <li>Reach up as high as possible</li>
              <li>Keep your feet flat</li>
              <li>Mark the highest point you can reach</li>
              <li>Measure from the floor to the mark</li>
            </ol>
          </div>
        </div>
      </section>

      <section class="guide-section">
        <h2>Vertical Jump</h2>
        <div class="guide-content">
          <img src="@/assets/images/vertical-measure.svg" alt="Vertical jump measurement">
          <div class="instructions">
            <h3>Method 1: Jump and Touch</h3>
            <ol>
              <li>Mark your standing reach height</li>
              <li>Jump and touch the wall at highest point</li>
              <li>Measure the difference between marks</li>
            </ol>

            <h3>Method 2: Vertical Jump Device</h3>
            <ol>
              <li>Use a Vertec or similar device</li>
              <li>Follow device instructions</li>
              <li>Take multiple measurements</li>
              <li>Record your best jump</li>
            </ol>
          </div>
        </div>
      </section>
    </div>

    <div class="measurement-tips">
      <h2>Pro Tips</h2>
      <ul>
        <li>Take measurements in the morning for consistency</li>
        <li>Wear athletic shoes you normally play in</li>
        <li>Take multiple measurements and use the average</li>
        <li>Have someone assist you for better accuracy</li>
        <li>Record all measurements for progress tracking</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToMeasure',
  head() {
    return {
      title: 'How to Take Accurate Measurements | Basketball Dunk Calculator',
      meta: [
        {
          name: 'description',
          content: 'Learn how to accurately measure your height, standing reach, and vertical jump for the basketball dunk calculator.'
        }
      ]
    }
  }
}
</script>