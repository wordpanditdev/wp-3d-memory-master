import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MemoryMasterQuiz from './components/MemoryMasterQuiz.vue'

import './assets/main.scss'

//createApp(App).mount('#app')

const el = document.getElementById('wp-3d-memory-master-vue')

if (el) {
	console.log('el', el)
  const fileUrl = el.dataset.file
  createApp(MemoryMasterQuiz, { fileUrl }).mount(el)
}
