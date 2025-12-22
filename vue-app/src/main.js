import { createApp } from 'vue'
import './style.css'
import './assets/main.scss'
import './assets/tailwind.css';
import MemoryMasterQuiz from './components/MemoryMasterQuiz.vue'
import QuizApp from './components/QuizApp.vue'

function loadTailwind() {
  if (document.getElementById('tailwind-cdn')) {
    const link = document.createElement('script');
    link.src = 'https://cdn.tailwindcss.com';
    link.id = 'tailwind-cdn';
    document.head.appendChild(link);
  }
}

//loadTailwind();

//createApp(App).mount('#app')

const el = document.getElementById('wp-3d-memory-master-vue')

if (el) {
  const fileUrl = el.dataset.file
  createApp(QuizApp, { fileUrl }).mount(el)
}
