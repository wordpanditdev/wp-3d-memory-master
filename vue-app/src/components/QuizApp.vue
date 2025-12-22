<template>
  <div class="memory-master-quiz">

    <!-- ================= PREREQ ================= -->
    <div v-if="screen === 'prereq'" :style="{ padding: '24px 16px', maxWidth: '560px', margin: '0 auto' }">
        <div class="card animate-fade-in-up" :style="{ padding: '32px 28px' }">

            <!-- {/* Header */} -->
            <div :style="{textAlign: 'center', marginBottom: '28px' }">
                <div :style="{ 
                    width: '72px',
                    height: '72px',
                    background: 'linear-gradient(135deg, #fef7ed 0%, #f0d9c4 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '32px',
                }">
                    🏆
                </div>
                <h1 class="font-display" :style="{
                    fontSize: '28px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--slate-900)'
                }">
                    {{ quizData.quiz_title }}
                </h1>
                <div class="badge badge-gold">
                    <span>📅</span>
                    <span>{{ quizData.date_range }}</span>
                </div>
            </div>

            <!-- {/* Warning Card */} -->
            <div :style="{ 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                border: '1px solid #fcd34d'
            }">
                <div :style="{ display: 'flex', gap: '12px', alignItems: 'flex-start' }">
                    <span :style="{ fontSize: '24px' } ">⚠️</span>
                    <div>
                        <h3 :style="{ fontWeight: '700', color: '#92400e', marginBottom: '4px', fontSize: '15px' }">
                            Important Prerequisite
                        </h3>
                        <p :style="{ color: '#a16207', fontSize: '14px', lineHeight: '1.5' }">
                            This quiz tests retention from the past 3 days. Complete the daily GK posts and quizzes first for the best experience.
                        </p>
                    </div>
                </div>
            </div>

            <!-- {/* Study Materials */} -->
            <div :style="{ marginBottom: '24px' }">
                <h3 :style="{ fontWeight: '700', marginBottom: '12px', fontSize: '15px', color: 'var(--slate-700)' }">
                    📚 Study Materials
                </h3>

                <div :style="{ display: 'flex', flexDirection: 'column', gap: '8px' }">
                  <a
                    v-for="(link, i) in quizData.prerequisites"
                    :key="i"
                    :href="link.url"
                    target="_blank"
                    class="study-link"
                  >
                    <div :class="'study-link-icon' +  link.type ">
                        {{ link.type === 'post' ? '📖' : '✍️' }}
                    </div>
                    <div :style="{ flex: 1, minWidth: 0  }">
                        <h4 :style="{ fontWeight: '600', fontSize: '14px', color: 'var(--slate-800)' }">
                            {{ link.title }}
                        </h4>
                        <p :style="{ fontSize: '13px', color: 'var(--slate-500)' }">
                            {{link.date }}
                        </p>
                    </div>
                    <span :style="{ color: 'var(--slate-400)', fontSize: '18px' }">→</span>
                    <!-- {{ link.title }} – {{ link.date }} -->
                  </a>
                </div>
            </div>

            <!-- {/* Confirmation */} -->
            <div :style="{ borderTop: '1px solid var(--slate-200)', paddingTop: '20px' }">

                <label class="quiz-checkbox" 
                    :style="{ 
                        display: 'flex', 
                        gap: '12px', 
                        cursor: 'pointer',
                        marginBottom: '16px',
                        alignItems: 'flex-start'
                    }">
                    <input type="checkbox" v-model="hasCompletedPrereq" />
                    <span  :style="{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: '1.5' }">I confirm I've completed all Daily GK posts and quizzes for the best quiz experience.</span>
                </label>

                <button
                    class="btn-primary"
                    :style="{ width: '100%' }"
                    :disabled="!hasCompletedPrereq"
                    @click="handleScreenChange('intro')"
                >
                    <span> {{ hasCompletedPrereq ? 'Proceed to Challenge →' : 'Please confirm prerequisites' }}</span>
                </button>
            </div>
        </div>
    </div>

    <!-- ================= INTRO ================= -->
    <div v-if="screen === 'intro'" :style="{ padding: '24px 16px', maxWidth: '720px', margin: '0 auto' }">
        <div class="card animate-fade-in-up" :style="{ padding: '36px 28px' }">
            <!-- {/* Header */} -->
            <div :style="{ textAlign: 'center', marginBottom: '32px' }">
                <div :style="{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, var(--slate-800) 0%, var(--slate-900) 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '36px',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.2)'
                }">
                    🏆
                </div>
                <h1 class="font-display" :style="{ 
                    fontSize: '32px', 
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--slate-900)'
                }">
                    {{ quizData.quiz_title }}
                </h1>
                <p :style="{ color: 'var(--gold-600)', fontWeight: '600', fontSize: '16px' }">
                    {{ quizData.date_range }}
                </p>
            </div>

            <!-- {/* Stats Row */} -->
            <div :style="{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '32px',
                marginBottom: '32px',
                padding: '20px',
                background: 'var(--slate-50)',
                borderRadius: '16px'
            }">
                <div :style="{ textAlign: 'center' }">
                    <div class="font-display" :style="{ fontSize: '28px', fontWeight: '700', color: 'var(--slate-800)' }">
                        {{ totalQuestions }}
                    </div>
                    <div :style="{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }">Questions</div>
                </div>
                <div :style="{ width: '1px', background: 'var(--slate-200)' }" />
                <div :style="{ textAlign: 'center' }">
                    <div class="font-display" :style="{ fontSize: '28px', fontWeight: '700', color: 'var(--slate-800)' }">
                        {{ maxScore }}
                    </div>
                    <div :style="{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }">Total Points</div>
                </div>
                <div :style="{ width: '1px', background: 'var(--slate-200)' }" />
                <div :style="{ textAlign: 'center' }">
                    <div class="font-display" :style="{ fontSize: '28px', fontWeight: '700', color: 'var(--slate-800)' }">
                        {{ sections.length }}
                    </div>
                    <div :style="{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }">Sections</div>
                </div>
            </div>

            <!-- {/* Section Cards */} -->
            <div :style="{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
            }">
                <div
                  v-for="(section, i) in sections"
                  :key="i"
                  :class="'section-card ' + sectionColors[i] + ' animate-fade-in-up ' + 'delay-' + (i + 1)"
                >
                    <SectionIcon :number="section.section_number" />
                    <h3 class="quiz-section-title">{{ section.title }}</h3>
                    <p class="quiz-section-subtitle">{{ section.subtitle }}</p>
                    <div :style="{ flex: 1 }">
                        <div :style="{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }">
                            Section {{ section.section_number }}
                        </div>
                        <h3 :style="{ fontWeight: '700', fontSize: '16px', marginBottom: '4px', color: 'var(--slate-800)' }">
                            {{ section.title }}
                        </h3>
                        <p :style="{ fontSize: '13px', color: 'var(--slate-600)', marginBottom: '12px', lineHeight: '1.5' }">
                            {{ section.subtitle }}
                        </p>
                        <div :style="{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'var(--slate-100)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: 'var(--slate-700)'
                        }">
                            <span>{{ section.questions.length }} Q</span>
                            <span :style="{ color: 'var(--slate-400)' }">×</span>
                            <span>{{ section.points_per_question }} pt</span>
                            <span :style="{ color: 'var(--slate-400)' }">=</span>
                            <span :style="{ color: 'var(--gold-600)' }">{{ section.questions.length * section.points_per_question }} pts</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- {/* Start Button */} -->
            <button class="btn-primary animate-fade-in-up delay-5" 
                @click="handleScreenChange('quiz')" 
                :style="{ width: '100%' }">
                Begin the Challenge →
            </button>
        </div>
    </div>

    <!-- ================= QUIZ ================= -->
    <div v-if="screen === 'quiz'" :style="{ padding: '24px 16px', maxWidth: '800px', margin: '0 auto' }">
        <!-- {/* Progress Header */} -->
        <div class="card-elevated animate-fade-in" :style="{ padding: '20px 24px', marginBottom: '20px' }">
            <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }">
                <div>
                    <span :style="{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }">Progress</span>
                </div>
                <div :style="{ display: 'flex', alignItems: 'baseline', gap: '4px' }">
                    <span class="font-display" :style="{ fontSize: '24px', fontWeight: '700', color: 'var(--slate-800)' }">
                        {{ answeredCount }}
                    </span>
                    <span :style="{ color: 'var(--slate-400)', fontSize: '14px' }">/ {{ totalQuestions }}</span>
                </div>
            </div>
            <div :style="{ 
                width: '100%', 
                height: '8px', 
                background: 'var(--slate-100)',
                borderRadius: '100px',
                overflow: 'hidden'
            }">
                <div :style="{
                    width: progress + '%',
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--slate-800) 0%,' + currentColor + '100%)',
                    borderRadius: '100px',
                    transition: 'width 0.4s ease'
                }" />
            </div>
            
            <!-- {/* Section Pills */} -->
            <div :style="{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }">
                <button
                  v-for="(s, i) in sections"
                  :key="i"
                  class="quiz-section-tab"
                  :class="{ 'quiz-section-tab--active': i === currentSectionIdx }"
                  @click="currentSectionIdx = i"
                  :style="{
                        padding: '8px 14px',
                        borderRadius: '100px',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: currentSectionIdx === i ? 'var(--slate-800)' : 'var(--slate-100)',
                        color: currentSectionIdx === i ? 'white' : 'var(--slate-600)'
                    }"
                >
                  {{ s.title }}
                </button>
            </div>
        </div>

        <!-- {/* Section Content */} -->
        <div class="card animate-fade-in-up" :style="{ padding: '32px 28px' }">
            <!-- {/* Section Header */} -->
            <div :style="{ marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid var(--slate-200)' }">
                <div :style="{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }">
                    <div :style="{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, '+ currentColor+'20 0%, '+currentColor+'40 100%)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }">
                        <SectionIcon :number="sections[currentSectionIdx].section_number" />
                    </div>
                    <div>
                        <h2 class="font-display" :style="{ fontSize: '24px', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '4px' }">
                            {{ sections[currentSectionIdx].title }}
                        </h2>
                        <p :style="{ fontSize: '14px', color: 'var(--slate-500)' }">{{ sections[currentSectionIdx].subtitle }}</p>
                    </div>
                </div>
                <p :style="{ 
                    fontSize: '14px', 
                    color: 'var(--slate-600)', 
                    lineHeight: '1.6',
                    background: 'var(--slate-50)',
                    padding: '16px',
                    borderRadius: '12px'
                }">
                    {{ sections[currentSectionIdx].description }}
                </p>
            </div>

            <!-- {/* Questions */} -->
            <div :style="{ display: 'flex', flexDirection: 'column', gap: '24px' }">
                <div
                  v-for="(q, qi) in sections[currentSectionIdx].questions"
                  :key="qi"
                  class="question-card"
                >
                    <div :style="{ display: 'flex', gap: '14px', marginBottom: '16px' }">
                        <div class="question-number">{{ qi + 1 }}</div>
                        <div :style="{ flex: 1 }">
                            <p :style="{ fontWeight: '600', fontSize: '15px', lineHeight: '1.6', color: 'var(--slate-800)', marginBottom: '8px' }">
                                {{ q.question }}
                            </p>
                            <span v-if = "q.day_reference" class="badge badge-blue" :style="{ fontSize: '12px' }">
                                📅 {{ q.day_reference }}
                            </span>
                            
                        </div>
                    </div>
                    <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '50px' }">
                        <label
                            v-for="(opt, oi) in q.options"
                            :key="oi"
                            class = "option-card"
                            :class="answers[getQID(qi)] === oi ? 'selected' : ''"
                          >
                            <input
                              type="radio"
                              :name="`q_${qi}`"
                              :checked="answers[getQID(qi)] === oi"
                              @change="setAnswer(getQID(qi), oi)"
                              style=" display: none;"
                            />
                            <div :style="{ display: 'flex', alignItems: 'flex-start', gap: '12px' }">
                                <div class="option-marker">
                                    {{ String.fromCharCode(65 + oi) }}
                                </div>
                                <span :style="{ fontSize: '14px', lineHeight: '1.5', color: 'var(--slate-700)' }">
                                    {{ opt }}
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>



            <!-- {/* Navigation */} -->
            <div :style="{ display: 'flex', gap: '12px', marginTop: '32px' }">
                <button
                    v-if = "currentSectionIdx > 0"
                    class="btn-secondary"
                    @click="currentSectionIdx = currentSectionIdx - 1"
                    :style="{ flex: 1 }">
                    ← Previous
                </button>

                <button
                    class="btn-primary"
                    @click="
                      currentSectionIdx === sections.length - 1
                        ? calculateScore()
                        : currentSectionIdx++"
                    :style="{ flex: currentSectionIdx > 0 ? 1 : '100%' }" >

                    {{ currentSectionIdx === sections.length - 1 ? 'Submit & View Results' : 'Continue to Next Section →' }}
                </button>
            </div>
        </div>
    </div>

    <!-- ================= RESULTS ================= -->
    <div v-if="screen === 'results'" class="quiz-container quiz-results">
      <h2 class="quiz-results-score">
        Score: {{ score }} / {{ maxScore }}
      </h2>

      <button
        class="btn-secondary btn-full"
        @click="
          screen = 'prereq';
          answers = {};
          currentSectionIdx = 0;
          hasCompletedPrereq = false
        "
      >
        Retake Quiz
      </button>
    </div>

  </div>
</template>

<script>
import ProgressRing from './ProgressRing.vue'
import SectionIcon from './SectionIcon.vue'

export default {
  components: {
    ProgressRing,
    SectionIcon
  },

  props: {
    fileUrl: {
      type: String,
      required: true
    }
  },

  data() {

    let quizUrl = 'http://wpquiz.local/wp-json/quiz/v1/data?file=' + this.fileUrl
    //let quizUrl = memoryMasterScript.restUrl + '?file=' + this.fileUrl

    return {
      screen: 'prereq',
      answers: {},
      hasCompletedPrereq: false,
      currentSectionIdx: 0,
      score: 0,
      animateIn: true,
      quizData : [],
      quizJsonUrlWp : quizUrl,
      sectionColors : ['blue', 'emerald', 'violet', 'gold']
    }
  },

  mounted() {
    this.fetchQuizData();
  },

  computed: {
    sections() {
      return this.quizData.sections
    },

    totalQuestions() {
      return this.sections.reduce((a, s) => a + s.questions.length, 0)
    },

    answeredCount() {
      return Object.keys(this.answers).length
    },

    progress() {
      return (this.answeredCount / this.totalQuestions) * 100
    },

    maxScore() {
      return this.sections.reduce(
        (a, s) => a + s.questions.length * s.points_per_question,
        0
      )
    }
  },

  watch: {
    screen() {
      this.animateIn = true
    }
  },

  methods: {
    async fetchQuizData() {
      try {
        const response = await fetch(this.quizJsonUrlWp);
        this.quizData = await response.json();
        this.quizLoaded = true;
      } catch (error) {
        console.error('Error loading quiz JSON:', error);
      }
    },
    handleScreenChange(screen) {
      this.animateIn = false
      setTimeout(() => {
        this.screen = screen
        window.scrollTo(0, 0)
      }, 200)
    },

    setAnswer(qId, optionIdx) {
      this.answers[qId] = optionIdx
    },

    calculateScore() {
      let total = 0
      let globalIdx = 0

      this.sections.forEach(section => {
        section.questions.forEach(q => {
          const qId = `q_${globalIdx}`
          if (this.answers[qId] === q.correct_index) {
            total += section.points_per_question
          }
          globalIdx++
        })
      })

      this.score = total
      this.screen = 'results'
      window.scrollTo(0, 0)
    },

    getQID(idx){
        const globalIdx = this.sections.slice(0, this.currentSectionIdx).reduce((acc, s) => acc + s.questions.length, 0) + idx;
        const qId = `q_${globalIdx}`;

        return qId
    }
  }
}
</script>
