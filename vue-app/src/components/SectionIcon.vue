<template>
  <span class="section-icon">
    {{ icon }}
  </span>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true
    }
  },

  computed: {
    icon() {
      const icons = ['⚡', '🔗', '🎯', '🏆']
      return icons[this.number - 1] || '📝'
    }
  }
}
</script>

<style scoped>
.section-icon {
  font-size: 24px;
  line-height: 1;
}
</style>
