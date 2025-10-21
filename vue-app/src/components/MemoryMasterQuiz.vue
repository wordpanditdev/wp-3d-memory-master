<template>
  <div class="memory-master-quiz">
    <!-- 📘 PREREQUISITE SCREEN -->
    <div v-if="screen === 'prereq'" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
        <div class="text-center mb-6">
          <div class="text-6xl mb-4">🏆</div>
          <h1 class="text-3xl font-bold mb-2">{{ quizData.quiz_title }}</h1>
          <p class="text-indigo-600 font-semibold">{{ quizData.date_range }}</p>
        </div>

        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6">
          <h3 class="font-bold text-amber-900 mb-2">⚠️ Important Prerequisite</h3>
          <p class="text-amber-800 text-sm">
            This quiz tests retention from the past 3 days. Complete daily posts and quizzes first.
          </p>
        </div>

        <div class="space-y-3 mb-6">
          <h3 class="font-bold">📚 Study Materials:</h3>
          <a
            v-for="(link, i) in quizData.prerequisites"
            :key="i"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'block border-2 rounded-lg p-3 hover:opacity-80',
              link.type === 'post' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'
            ]"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-bold text-sm">{{ link.title }}</h4>
                <p class="text-xs text-gray-600">{{ link.date }}</p>
              </div>
              <span>→</span>
            </div>
          </a>
        </div>

        <!--<div v-if="!emailSubmitted" class="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 mb-6">
          <h3 class="font-bold mb-2">📧 Get Notified (Optional)</h3>
          <p class="text-sm text-gray-700 mb-3">
            Want updates when new quizzes go live? Enter your email. You can skip this.
          </p>
          <form @submit.prevent="submitEmail" class="flex gap-2">
            <input
              type="email"
              v-model="email"
              placeholder="your@email.com"
              class="flex-1 px-3 py-2 border-2 border-indigo-300 rounded-lg"
            />
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold">
              Subscribe
            </button>
          </form>
          <p v-if="emailSubmitted" class="text-green-700 text-sm mt-2">✓ Subscribed!</p>
        </div>-->

        <div class="border-t-2 pt-4">
          <label class="flex gap-3 mb-4 cursor-pointer">
            <input type="checkbox" v-model="hasCompletedPrereq" class="w-5 h-5 mt-1" />
            <span class="text-sm">I confirm I've completed all Daily posts and quizzes for {{ quizData.date_range }}.</span>
          </label>
          <button
            @click="screen = 'intro'"
            :disabled="!hasCompletedPrereq"
            :class="[
              'w-full py-3 rounded-xl font-bold',
              hasCompletedPrereq
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            {{ hasCompletedPrereq ? 'Proceed to Challenge →' : 'Please confirm prerequisites' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 📘 INTRO SCREEN -->
    <div v-else-if="screen === 'intro'" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🏆</div>
          <h1 class="text-4xl font-bold mb-2">{{ quizData.quiz_title }}</h1>
          <p class="text-indigo-600 font-semibold text-lg">{{ quizData.date_range }}</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <div
            v-for="(section, i) in quizData.sections"
            :key="i"
            class="p-4 rounded-xl border-2"
            :class="sectionColors[i]"
          >
            <h3 class="font-bold mb-1">Section {{ i + 1 }}</h3>
            <p class="text-sm font-semibold mb-1">{{ section.title }}</p>
            <p class="text-xs text-gray-600 mb-2">{{ section.description }}</p>
            <p class="text-xs font-semibold text-indigo-700">
              {{ section.questions.length }}Q × {{ section.points_per_question }}pt = {{ section.questions.length * section.points_per_question }}pts
            </p>
          </div>
        </div>

        <button @click="screen = 'quiz'" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700">
          Start Challenge →
        </button>
      </div>
    </div>

    <!-- 📘 QUIZ SCREEN -->
    <div v-else-if="screen === 'quiz'" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div class="flex justify-between text-sm mb-2">
            <span class="font-semibold">Progress</span>
            <span class="font-bold text-indigo-600">{{ answeredCount }}/{{ totalQuestions }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ progress.toFixed(0) }}% complete</p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-1">{{ currentSection.title }}</h2>
            <p class="text-sm text-gray-600 mb-2">{{ currentSection.subtitle }}</p>
            <p class="text-sm bg-gray-50 p-3 rounded-lg">{{ currentSection.description }}</p>
          </div>

          <div class="space-y-6">
            <div v-for="(q, idx) in currentSection.questions" :key="q.id" class="border-2 border-gray-200 rounded-xl p-4">
              <div class="flex gap-3 mb-3">
                <div
                  class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  {{ idx + 1 }}
                </div>
                <div>
                  <p class="font-semibold mb-2">{{ q.question }}</p>
                  <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{{ q.day }}</span>
                </div>
              </div>
              <div class="space-y-2 ml-11">
                <label
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  class="flex items-start p-3 border-2 rounded-lg cursor-pointer"
                  :class="answers[q.id] === oi ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'"
                >
                  <input
                    type="radio"
                    :name="q.id"
                    :checked="answers[q.id] === oi"
                    @change="answers[q.id] = oi"
                    class="mr-3 mt-0.5"
                  />
                  <span class="text-sm">{{ opt }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <button
              v-if="currentSectionIdx > 0"
              @click="currentSectionIdx--"
              class="flex-1 bg-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-300"
            >
              ← Previous
            </button>
            <button
              @click="nextSection"
              class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              {{ isLastSection ? 'Submit Results' : 'Next Section →' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 📘 RESULTS SCREEN -->
    <div v-else-if="screen === 'results'" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div class="text-center mb-8">
          <div
            class="inline-block text-white px-8 py-4 rounded-2xl mb-4"
            :class="badgeColorClass"
          >
            <h2 class="text-3xl font-bold">{{ badge }}</h2>
          </div>
          <h1 class="text-5xl font-bold mb-2">{{ score }}/{{ maxScore }}</h1>
          <p class="text-2xl text-gray-600 mb-4">{{ pct }}%</p>
          <p class="text-lg mb-6">{{ message }}</p>

          <div class="flex flex-wrap justify-center gap-3">
            <button
              @click="share('twitter')"
              class="bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Twitter
            </button>
            <button
              @click="share('facebook')"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Facebook
            </button>
            <button
              @click="share('whatsapp')"
              class="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              WhatsApp
            </button>
          </div>
        </div>

        <!-- Section Breakdown -->
        <div class="space-y-4 mb-8">
          <div
            v-for="(section, si) in quizData.sections"
            :key="si"
            class="bg-gray-50 p-4 rounded-xl"
          >
            <div class="flex justify-between mb-2">
              <span class="font-bold">{{ section.title }}</span>
              <span class="text-indigo-600 font-semibold">
                {{ sectionScore(section) }}/{{ section.questions.length * section.points_per_question }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                :style="{ width: (sectionScore(section) / (section.questions.length * section.points_per_question)) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Review -->
        <div class="border-t-2 pt-6">
          <h3 class="text-xl font-bold mb-4">Review Answers</h3>
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div
              v-for="(q, i) in allQuestions"
              :key="q.id"
              class="p-4 rounded-lg border-2"
              :class="answers[q.id] === q.correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'"
            >
              <div class="flex gap-3">
                <span class="text-2xl">{{ answers[q.id] === q.correct ? '✅' : '❌' }}</span>
                <div class="flex-1">
                  <p class="font-semibold mb-1">Q{{ i + 1 }}: {{ q.text }}</p>
                  <p class="text-sm mb-1">
                    Your answer:
                    <span
                      :class="answers[q.id] === q.correct ? 'text-green-700 font-medium' : 'text-red-700 font-medium'"
                    >
                      {{ answers[q.id] !== undefined ? q.options[answers[q.id]] : 'Not answered' }}
                    </span>
                  </p>
                  <p v-if="answers[q.id] !== q.correct" class="text-sm text-green-700 mb-1">
                    Correct: <strong>{{ q.options[q.correct] }}</strong>
                  </p>
                  <p class="text-sm text-gray-700 italic mt-2">{{ q.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="resetQuiz"
          class="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    fileUrl: {
      type: String,
      required: true
    }
  },
  data() {
    let quizUrl = memoryMasterScript.restUrl + '?file=' + this.fileUrl
    return {
      screen: "prereq",
      answers: {},
      email: "",
      emailSubmitted: false,
      hasCompletedPrereq: false,
      currentSectionIdx: 0,
      score: 0,
      sectionColors: [
        "bg-blue-50 border-blue-200",
        "bg-green-50 border-green-200",
        "bg-purple-50 border-purple-200",
        "bg-yellow-50 border-yellow-200"
      ],
      quizData : [],
      quizJsonUrlWp : quizUrl
    };
  },

  computed: {
    totalQuestions() {
      return this.quizData.sections.reduce((a, s) => a + s.questions.length, 0);
    },
    answeredCount() {
      return Object.keys(this.answers).length;
    },
    progress() {
      return (this.answeredCount / this.totalQuestions) * 100;
    },
    currentSection() {
      return this.quizData.sections[this.currentSectionIdx];
    },
    isLastSection() {
      return this.currentSectionIdx === this.quizData.sections.length - 1;
    },
    allQuestions() {
      return this.quizData.sections.flatMap((s) => s.questions);
    },
    maxScore() {
      return this.quizData.sections.reduce(
        (acc, s) => acc + s.questions.length * s.points_per_question,
        0
      );
    },
    pct() {
      return ((this.score / this.maxScore) * 100).toFixed(1);
    },
    badgeData() {
      if (this.pct >= 90)
        return {
          badge: "Memory Master",
          message: "Outstanding!",
          badgeColorClass: "bg-gradient-to-r from-yellow-400 to-yellow-600"
        };
      else if (this.pct >= 75)
        return {
          badge: "GK Champion",
          message: "Excellent work!",
          badgeColorClass: "bg-gradient-to-r from-blue-400 to-blue-600"
        };
      else if (this.pct >= 60)
        return {
          badge: "Quick Learner",
          message: "Good job!",
          badgeColorClass: "bg-gradient-to-r from-green-400 to-green-600"
        };
      else
        return {
          badge: "Rising Star",
          message: "Review and retry!",
          badgeColorClass: "bg-gradient-to-r from-purple-400 to-purple-600"
        };
    }
  },
  mounted() {
    this.fetchQuizData();
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
    submitEmail() {
      if (this.email.includes("@")) this.emailSubmitted = true;
    },
    nextSection() {
      if (this.isLastSection) this.calculateScore();
      else this.currentSectionIdx++;
    },
    calculateScore() {
      let total = 0;
      this.quizData.sections.forEach((section) => {
        section.questions.forEach((q) => {
          if (this.answers[q.id] === q.correct) total += section.points_per_question;
        });
      });
      this.score = total;
      this.screen = "results";
    },
    resetQuiz() {
      this.screen = "prereq";
      this.answers = {};
      this.currentSectionIdx = 0;
      this.hasCompletedPrereq = false;
      this.score = 0;
    },
    sectionScore(section) {
      return section.questions.reduce(
        (acc, q) => acc + (this.answers[q.id] === q.correct ? section.points_per_question : 0),
        0
      );
    },
    share(platform) {
      const shareText = `I scored ${this.score}/${this.maxScore} (${this.pct}%) on the 3-Day GK Memory Master Challenge!`;
      let url = "";
      if (platform === "twitter")
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      if (platform === "facebook")
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      if (platform === "whatsapp")
        url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped>
/* keep your same styles here */
</style>
