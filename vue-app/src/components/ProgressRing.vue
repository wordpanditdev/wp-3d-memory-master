<template>
  <svg :width="size" :height="size">
    <circle
      :r="radius"
      :cx="size/2"
      :cy="size/2"
      stroke="#e5e7eb"
      fill="none"
      :stroke-width="strokeWidth"
    />
    <circle
      :r="radius"
      :cx="size/2"
      :cy="size/2"
      fill="none"
      stroke="gold"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="offset"
    />
  </svg>
</template>

<script>
export default {
  props: {
    progress: Number,
    size: { default: 120 },
    strokeWidth: { default: 8 }
  },
  computed: {
    radius() {
      return (this.size - this.strokeWidth) / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    offset() {
      return this.circumference - (this.progress / 100) * this.circumference
    }
  }
}
</script>
