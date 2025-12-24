

const { useState, useEffect } = React;

const QUIZ_DATA = JSON.parse(document.getElementById('quiz-data').textContent);

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    
    return (
        <svg width={size} height={size} className="progress-ring">
            <circle
                stroke="#e2e8f0"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="progress-ring-circle"
                stroke="url(#progressGradient)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
            />
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#d4a574" />
                </linearGradient>
            </defs>
        </svg>
    );
};

// Section Icon Component
const SectionIcon = ({ number }) => {
    const icons = ['⚡', '🔗', '🎯', '🏆'];
    return <span style={{ fontSize: '24px' }}>{icons[number - 1] || '📝'}</span>;
};

const QuizApp = () => {
    const [screen, setScreen] = useState('prereq');
    const [answers, setAnswers] = useState({});
    const [hasCompletedPrereq, setHasCompletedPrereq] = useState(false);
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [animateIn, setAnimateIn] = useState(true);

    const sections = QUIZ_DATA.sections;
    const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / totalQuestions) * 100;

    useEffect(() => {
        setAnimateIn(true);
    }, [screen]);

    const calculateScore = () => {
        let total = 0;
        let globalQuestionIndex = 0;
        sections.forEach(section => {
            section.questions.forEach((q, idx) => {
                const qId = `q_${globalQuestionIndex}`;
                if (answers[qId] !== undefined && answers[qId] === q.correct) {
                    total += section.points_per_question;
                }
                globalQuestionIndex++;
            });
        });
        setScore(total);
        setScreen('results');
        window.scrollTo(0, 0);
    };

    const maxScore = sections.reduce((acc, s) => 
        acc + (s.questions.length * s.points_per_question), 0);

    const handleScreenChange = (newScreen) => {
        setAnimateIn(false);
        setTimeout(() => {
            setScreen(newScreen);
            window.scrollTo(0, 0);
        }, 200);
    };

    // Prerequisites Screen
    if (screen === 'prereq') {
        return (
            <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <div className={`card animate-fade-in-up`} style={{ padding: '32px 28px' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <div style={{ 
                            width: '72px', 
                            height: '72px', 
                            background: 'linear-gradient(135deg, #fef7ed 0%, #f0d9c4 100%)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                            fontSize: '32px'
                        }}>
                            🏆
                        </div>
                        <h1 className="font-display" style={{ 
                            fontSize: '28px', 
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: 'var(--slate-900)'
                        }}>
                            {QUIZ_DATA.quiz_title}
                        </h1>
                        <div className="badge badge-gold">
                            <span>📅</span>
                            <span>{QUIZ_DATA.date_range}</span>
                        </div>
                    </div>

                    {/* Warning Card */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px',
                        border: '1px solid #fcd34d'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '24px' }}>⚠️</span>
                            <div>
                                <h3 style={{ fontWeight: '700', color: '#92400e', marginBottom: '4px', fontSize: '15px' }}>
                                    Important Prerequisite
                                </h3>
                                <p style={{ color: '#a16207', fontSize: '14px', lineHeight: '1.5' }}>
                                    This quiz tests retention from the past 3 days. Complete the daily GK posts and quizzes first for the best experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Study Materials */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: '700', marginBottom: '12px', fontSize: '15px', color: 'var(--slate-700)' }}>
                            📚 Study Materials
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {QUIZ_DATA.prerequisites.map((link, i) => (
                                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="study-link">
                                    <div className={`study-link-icon ${link.type}`}>
                                        {link.type === 'post' ? '📖' : '✍️'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontWeight: '600', fontSize: '14px', color: 'var(--slate-800)' }}>
                                            {link.title}
                                        </h4>
                                        <p style={{ fontSize: '13px', color: 'var(--slate-500)' }}>
                                            {link.date}
                                        </p>
                                    </div>
                                    <span style={{ color: 'var(--slate-400)', fontSize: '18px' }}>→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '20px' }}>
                        <label style={{ 
                            display: 'flex', 
                            gap: '12px', 
                            cursor: 'pointer',
                            marginBottom: '16px',
                            alignItems: 'flex-start'
                        }}>
                            <input 
                                type="checkbox" 
                                className="custom-checkbox"
                                checked={hasCompletedPrereq}
                                onChange={(e) => setHasCompletedPrereq(e.target.checked)}
                            />
                            <span style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                                I confirm I've completed all Daily GK posts and quizzes for the best quiz experience.
                            </span>
                        </label>
                        <button 
                            className="btn-primary"
                            onClick={() => handleScreenChange('intro')}
                            disabled={!hasCompletedPrereq}
                            style={{ width: '100%' }}
                        >
                            <span>{hasCompletedPrereq ? 'Proceed to Challenge →' : 'Please confirm prerequisites'}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Introduction Screen
    if (screen === 'intro') {
        const sectionColors = ['blue', 'emerald', 'violet', 'gold'];
        
        return (
            <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card animate-fade-in-up" style={{ padding: '36px 28px' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{ 
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
                        }}>
                            🏆
                        </div>
                        <h1 className="font-display" style={{ 
                            fontSize: '32px', 
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: 'var(--slate-900)'
                        }}>
                            {QUIZ_DATA.quiz_title}
                        </h1>
                        <p style={{ color: 'var(--gold-600)', fontWeight: '600', fontSize: '16px' }}>
                            {QUIZ_DATA.date_range}
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '32px',
                        marginBottom: '32px',
                        padding: '20px',
                        background: 'var(--slate-50)',
                        borderRadius: '16px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="font-display" style={{ fontSize: '28px', fontWeight: '700', color: 'var(--slate-800)' }}>
                                {totalQuestions}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }}>Questions</div>
                        </div>
                        <div style={{ width: '1px', background: 'var(--slate-200)' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div className="font-display" style={{ fontSize: '28px', fontWeight: '700', color: 'var(--slate-800)' }}>
                                {maxScore}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }}>Total Points</div>
                        </div>
                        <div style={{ width: '1px', background: 'var(--slate-200)' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div className="font-display" style={{ fontSize: '28px', fontWeight: '700', color: 'var(--slate-800)' }}>
                                {sections.length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }}>Sections</div>
                        </div>
                    </div>

                    {/* Section Cards */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        {sections.map((section, i) => (
                            <div 
                                key={i} 
                                className={`section-card ${sectionColors[i]} animate-fade-in-up delay-${i + 1}`}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                                    <SectionIcon number={section.section_number} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Section {section.section_number}
                                        </div>
                                        <h3 style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px', color: 'var(--slate-800)' }}>
                                            {section.title}
                                        </h3>
                                        <p style={{ fontSize: '13px', color: 'var(--slate-600)', marginBottom: '12px', lineHeight: '1.5' }}>
                                            {section.subtitle}
                                        </p>
                                        <div style={{ 
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'var(--slate-100)',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            color: 'var(--slate-700)'
                                        }}>
                                            <span>{section.questions.length} Q</span>
                                            <span style={{ color: 'var(--slate-400)' }}>×</span>
                                            <span>{section.points_per_question} pt</span>
                                            <span style={{ color: 'var(--slate-400)' }}>=</span>
                                            <span style={{ color: 'var(--gold-600)' }}>{section.questions.length * section.points_per_question} pts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Start Button */}
                    <button 
                        className="btn-primary animate-fade-in-up delay-5"
                        onClick={() => handleScreenChange('quiz')}
                        style={{ width: '100%' }}
                    >
                        <span>Begin the Challenge →</span>
                    </button>
                </div>
            </div>
        );
    }

    // Quiz Screen
    if (screen === 'quiz') {
        const section = sections[currentSectionIdx];
        const sectionColors = ['#3b82f6', '#10b981', '#8b5cf6', '#d4a574'];
        const currentColor = sectionColors[currentSectionIdx];
        
        return (
            <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                {/* Progress Header */}
                <div className="card-elevated animate-fade-in" style={{ padding: '20px 24px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '500' }}>Progress</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span className="font-display" style={{ fontSize: '24px', fontWeight: '700', color: 'var(--slate-800)' }}>
                                {answeredCount}
                            </span>
                            <span style={{ color: 'var(--slate-400)', fontSize: '14px' }}>/ {totalQuestions}</span>
                        </div>
                    </div>
                    <div style={{ 
                        width: '100%', 
                        height: '8px', 
                        background: 'var(--slate-100)',
                        borderRadius: '100px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, var(--slate-800) 0%, ${currentColor} 100%)`,
                            borderRadius: '100px',
                            transition: 'width 0.4s ease'
                        }} />
                    </div>
                    
                    {/* Section Pills */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                        {sections.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSectionIdx(i)}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '100px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: currentSectionIdx === i ? 'var(--slate-800)' : 'var(--slate-100)',
                                    color: currentSectionIdx === i ? 'white' : 'var(--slate-600)'
                                }}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section Content */}
                <div className="card animate-fade-in-up" style={{ padding: '32px 28px' }}>
                    {/* Section Header */}
                    <div style={{ marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid var(--slate-200)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: `linear-gradient(135deg, ${currentColor}20 0%, ${currentColor}40 100%)`,
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <SectionIcon number={section.section_number} />
                            </div>
                            <div>
                                <h2 className="font-display" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '4px' }}>
                                    {section.title}
                                </h2>
                                <p style={{ fontSize: '14px', color: 'var(--slate-500)' }}>{section.subtitle}</p>
                            </div>
                        </div>
                        <p style={{ 
                            fontSize: '14px', 
                            color: 'var(--slate-600)', 
                            lineHeight: '1.6',
                            background: 'var(--slate-50)',
                            padding: '16px',
                            borderRadius: '12px'
                        }}>
                            {section.description}
                        </p>
                    </div>

                    {/* Questions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {section.questions.map((q, idx) => {
                            const globalIdx = sections.slice(0, currentSectionIdx).reduce((acc, s) => acc + s.questions.length, 0) + idx;
                            const qId = `q_${globalIdx}`;
                            
                            return (
                                <div key={qId} className="question-card">
                                    <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                                        <div className="question-number">{idx + 1}</div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: '600', fontSize: '15px', lineHeight: '1.6', color: 'var(--slate-800)', marginBottom: '8px' }}>
                                                {q.question}
                                            </p>
                                            {q.day_reference && (
                                                <span className="badge badge-blue" style={{ fontSize: '12px' }}>
                                                    📅 {q.day_reference}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '50px' }}>
                                        {q.options.map((opt, oi) => (
                                            <label 
                                                key={oi} 
                                                className={`option-card ${answers[qId] === oi ? 'selected' : ''}`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name={qId}
                                                    checked={answers[qId] === oi}
                                                    onChange={() => setAnswers({...answers, [qId]: oi})}
                                                    style={{ display: 'none' }}
                                                />
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                    <div className="option-marker">
                                                        {String.fromCharCode(65 + oi)}
                                                    </div>
                                                    <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--slate-700)' }}>
                                                        {opt}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                        {currentSectionIdx > 0 && (
                            <button 
                                className="btn-secondary"
                                onClick={() => {
                                    setCurrentSectionIdx(currentSectionIdx - 1);
                                    window.scrollTo(0, 0);
                                }}
                                style={{ flex: 1 }}
                            >
                                ← Previous
                            </button>
                        )}
                        <button 
                            className="btn-primary"
                            onClick={() => {
                                if (currentSectionIdx === sections.length - 1) {
                                    calculateScore();
                                } else {
                                    setCurrentSectionIdx(currentSectionIdx + 1);
                                    window.scrollTo(0, 0);
                                }
                            }}
                            style={{ flex: currentSectionIdx > 0 ? 1 : '100%' }}
                        >
                            <span>{currentSectionIdx === sections.length - 1 ? 'Submit & View Results' : 'Continue to Next Section →'}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (screen === 'results') {
        const pct = ((score / maxScore) * 100).toFixed(1);
        let badge, badgeColor, message, badgeEmoji;
        
        if (pct >= 90) {
            badge = 'Memory Master'; badgeColor = 'gold'; message = 'Outstanding achievement! Your knowledge retention is exceptional.'; badgeEmoji = '🏆';
        } else if (pct >= 75) {
            badge = 'GK Champion'; badgeColor = 'blue'; message = 'Excellent performance! You have a strong grasp of current affairs.'; badgeEmoji = '🥇';
        } else if (pct >= 60) {
            badge = 'Quick Learner'; badgeColor = 'emerald'; message = 'Good job! Keep building on this solid foundation.'; badgeEmoji = '📚';
        } else {
            badge = 'Rising Star'; badgeColor = 'violet'; message = 'Keep practicing! Every attempt makes you stronger.'; badgeEmoji = '⭐';
        }

        const quizUrl = QUIZ_DATA.quiz_url || window.location.href;
        const shareText = `I scored ${score}/${maxScore} (${pct}%) on the 3-Day GK Memory Master! Test your knowledge: ${quizUrl}`;

        return (
            <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card animate-scale-in" style={{ padding: '0', overflow: 'hidden' }}>
                    {/* Score Display */}
                    <div className="score-display">
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ marginBottom: '20px' }}>
                                <span style={{ fontSize: '56px' }}>{badgeEmoji}</span>
                            </div>
                            <h2 className="font-display" style={{ fontSize: '32px', fontWeight: '600', marginBottom: '8px' }}>
                                {badge}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span className="font-display" style={{ fontSize: '56px', fontWeight: '700' }}>{score}</span>
                                <span style={{ fontSize: '24px', opacity: '0.7' }}>/ {maxScore}</span>
                            </div>
                            <div style={{ 
                                display: 'inline-block',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '8px 20px',
                                borderRadius: '100px',
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: '16px'
                            }}>
                                {pct}%
                            </div>
                            <p style={{ opacity: '0.9', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '32px 28px' }}>
                        {/* Social Share */}
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--slate-700)' }}>
                                Share Your Achievement
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <button 
                                    className="social-btn social-twitter"
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')}
                                >
                                    Twitter
                                </button>
                                <button 
                                    className="social-btn social-facebook"
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quizUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank')}
                                >
                                    Facebook
                                </button>
                                <button 
                                    className="social-btn social-whatsapp"
                                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
                                >
                                    WhatsApp
                                </button>
                            </div>
                        </div>

                        {/* Section Breakdown */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--slate-700)' }}>
                                Section Breakdown
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {sections.map((section, si) => {
                                    let sScore = 0;
                                    const startIdx = sections.slice(0, si).reduce((acc, s) => acc + s.questions.length, 0);
                                    section.questions.forEach((q, qi) => {
                                        const qId = `q_${startIdx + qi}`;
                                        if (answers[qId] !== undefined && answers[qId] === q.correct) {
                                            sScore += section.points_per_question;
                                        }
                                    });
                                    const sMax = section.questions.length * section.points_per_question;
                                    const sPct = (sScore / sMax) * 100;
                                    
                                    return (
                                        <div key={si} style={{ 
                                            background: 'var(--slate-50)', 
                                            padding: '16px 20px', 
                                            borderRadius: '14px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--slate-700)' }}>
                                                    {section.title}
                                                </span>
                                                <span style={{ 
                                                    fontWeight: '700', 
                                                    fontSize: '15px',
                                                    color: sPct >= 70 ? 'var(--emerald-600)' : sPct >= 40 ? 'var(--gold-600)' : 'var(--rose-500)'
                                                }}>
                                                    {sScore}/{sMax}
                                                </span>
                                            </div>
                                            <div style={{ 
                                                width: '100%', 
                                                height: '6px', 
                                                background: 'var(--slate-200)',
                                                borderRadius: '100px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${sPct}%`,
                                                    height: '100%',
                                                    background: sPct >= 70 ? 'var(--emerald-500)' : sPct >= 40 ? 'var(--gold-500)' : 'var(--rose-500)',
                                                    borderRadius: '100px',
                                                    transition: 'width 0.5s ease'
                                                }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Answer Review */}
                        <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '28px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--slate-700)' }}>
                                Review All Answers
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
                                {sections.flatMap((s, si) => 
                                    s.questions.map((q, qi) => {
                                        const globalIdx = sections.slice(0, si).reduce((acc, sec) => acc + sec.questions.length, 0) + qi;
                                        const qId = `q_${globalIdx}`;
                                        const correct = answers[qId] === q.correct;
                                        
                                        return (
                                            <div 
                                                key={qId} 
                                                className={correct ? 'result-correct' : 'result-incorrect'}
                                                style={{ padding: '20px', borderRadius: '16px' }}
                                            >
                                                <div style={{ display: 'flex', gap: '14px' }}>
                                                    <span style={{ fontSize: '24px', flexShrink: 0 }}>
                                                        {correct ? '✅' : '❌'}
                                                    </span>
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '10px', lineHeight: '1.5', color: 'var(--slate-800)' }}>
                                                            Q{globalIdx + 1}: {q.question}
                                                        </p>
                                                        <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                                                            <span style={{ color: 'var(--slate-500)' }}>Your answer: </span>
                                                            <span style={{ 
                                                                fontWeight: '600',
                                                                color: correct ? 'var(--emerald-600)' : 'var(--rose-500)'
                                                            }}>
                                                                {answers[qId] !== undefined ? q.options[answers[qId]] : 'Not answered'}
                                                            </span>
                                                        </div>
                                                        {!correct && (
                                                            <div style={{ fontSize: '13px', marginBottom: '12px' }}>
                                                                <span style={{ color: 'var(--slate-500)' }}>Correct answer: </span>
                                                                <span style={{ fontWeight: '600', color: 'var(--emerald-600)' }}>
                                                                    {q.options[q.correct]}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <details style={{ marginTop: '12px' }}>
                                                            <summary style={{ 
                                                                cursor: 'pointer', 
                                                                fontSize: '13px', 
                                                                fontWeight: '600',
                                                                color: 'var(--slate-600)',
                                                                userSelect: 'none'
                                                            }}>
                                                                View Explanation
                                                            </summary>
                                                            <p style={{ 
                                                                fontSize: '13px', 
                                                                color: 'var(--slate-600)', 
                                                                lineHeight: '1.6',
                                                                marginTop: '10px',
                                                                padding: '12px',
                                                                background: 'rgba(255,255,255,0.5)',
                                                                borderRadius: '10px'
                                                            }}>
                                                                {q.explanation}
                                                            </p>
                                                        </details>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Retake Button */}
                        <button 
                            className="btn-primary"
                            onClick={() => {
                                setScreen('prereq');
                                setAnswers({});
                                setCurrentSectionIdx(0);
                                setHasCompletedPrereq(false);
                                window.scrollTo(0, 0);
                            }}
                            style={{ width: '100%', marginTop: '28px' }}
                        >
                            <span>Retake Quiz</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<QuizApp />, document.getElementById('wp-3d-memory-master-vue'));