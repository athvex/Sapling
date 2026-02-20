(function() {
    let habits = [];
    let habitCompletions = {}; 
    let focusSessions = [];
    let journalEntries = [];

    function loadAll() {
        try {
            const saved = localStorage.getItem('habitTrackerFull');
            if (saved) {
                const data = JSON.parse(saved);
                habits = data.habits || [];
                habitCompletions = data.habitCompletions || {};
                focusSessions = data.focusSessions || [];
                journalEntries = data.journalEntries || [];
            } else {
                habits = [];
                habitCompletions = {};
                focusSessions = [];
                journalEntries = [];
            }
        } catch (e) {}
    }
    function saveAll() {
        localStorage.setItem('habitTrackerFull', JSON.stringify({
            habits, habitCompletions, focusSessions, journalEntries
        }));
    }
    loadAll();

    let currentDisplayDate = new Date();
    let selectedDateStr = formatDateLocal(currentDisplayDate);
    let selectedHabitId = habits.length ? habits[0].id : null;

    function formatDateLocal(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2,'0');
        const d = String(date.getDate()).padStart(2,'0');
        return `${y}-${m}-${d}`;
    }

    function getTodayStr() {
        return formatDateLocal(new Date());
    }

    function updateHabitSelector() {
        const sel = document.getElementById('habit-select');
        if (!sel) return;
        sel.innerHTML = '';
        habits.forEach(h => {
            const opt = document.createElement('option');
            opt.value = h.id;
            opt.textContent = h.name;
            if (h.id === selectedHabitId) opt.selected = true;
            sel.appendChild(opt);
        });
        if (habits.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = '— no habits —';
            sel.appendChild(opt);
        }
    }

    function computeStreaks(habitId) {
        if (!habitId) return { current: 0, longest: 0, total: 0 };
        const completions = habitCompletions[habitId] || {};
        const dates = Object.keys(completions).filter(d => completions[d] === true).sort();
        if (dates.length === 0) return { current: 0, longest: 0, total: 0 };
        const today = getTodayStr();
        let longest = 1, current = 0;
        let streak = 1;
        for (let i = 1; i < dates.length; i++) {
            const prev = new Date(dates[i-1]);
            const curr = new Date(dates[i]);
            const diffDays = Math.round((curr - prev) / (86400000));
            if (diffDays === 1) streak++;
            else streak = 1;
            if (streak > longest) longest = streak;
        }
        if (completions[today]) {
            current = 1;
            let d = new Date(today);
            while (true) {
                d.setDate(d.getDate() - 1);
                const prev = formatDateLocal(d);
                if (completions[prev]) current++;
                else break;
            }
        } else {
            current = 0;
        }
        return { current, longest, total: dates.length };
    }

    function renderStats() {
        if (!selectedHabitId) {
            document.getElementById('current-streak').innerText = '0';
            document.getElementById('longest-streak').innerText = '0';
            document.getElementById('total-days').innerText = '0';
            document.getElementById('completion-rate').innerText = '0%';
            return;
        }
        const s = computeStreaks(selectedHabitId);
        document.getElementById('current-streak').innerText = s.current;
        document.getElementById('longest-streak').innerText = s.longest;
        document.getElementById('total-days').innerText = s.total;
        const completions = habitCompletions[selectedHabitId] || {};
        const year = currentDisplayDate.getFullYear();
        const month = currentDisplayDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let completedCount = 0;
        for (let d=1; d<=daysInMonth; d++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            if (completions[dateStr]) completedCount++;
        }
        const rate = daysInMonth ? Math.round((completedCount/daysInMonth)*100) : 0;
        document.getElementById('completion-rate').innerText = rate + '%';
    }

    function renderCalendar() {
        const year = currentDisplayDate.getFullYear();
        const month = currentDisplayDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let html = '';
        const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        weekdays.forEach(d => html += `<div class="weekday">${d}</div>`);
        for (let i = 0; i < startDay; i++) html += '<div class="cal-day empty"></div>';
        const todayStr = getTodayStr();
        const completions = selectedHabitId ? (habitCompletions[selectedHabitId] || {}) : {};
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            let classes = 'cal-day';
            if (dateStr === selectedDateStr) classes += ' selected';
            if (completions[dateStr]) classes += ' completed';
            if (dateStr === todayStr) classes += ' today';
            html += `<div class="${classes}" data-date="${dateStr}">${d}</div>`;
        }
        document.getElementById('calendar-grid').innerHTML = html;
        document.getElementById('month-year-display').innerText = currentDisplayDate.toLocaleString('default', { month:'long', year:'numeric' });
        document.querySelectorAll('.cal-day[data-date]').forEach(el => {
            el.addEventListener('click', (e) => {
                selectedDateStr = e.currentTarget.dataset.date;
                renderCalendar();
            });
        });
    }

    function toggleDayCompletion() {
        if (!selectedHabitId || !selectedDateStr) return;
        if (!habitCompletions[selectedHabitId]) habitCompletions[selectedHabitId] = {};
        const current = habitCompletions[selectedHabitId][selectedDateStr] === true;
        habitCompletions[selectedHabitId][selectedDateStr] = !current;
        saveAll();
        renderCalendar();
        renderStats();
        renderHeatmap();
        updateDashboard();
    }
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cal-day') && e.target.dataset.date) {
            toggleDayCompletion();
        }
    });

    function renderHeatmap() {
        const grid = document.getElementById('heatmap-grid');
        if (!grid) return;
        const end = new Date();
        const start = new Date(end);
        start.setDate(end.getDate() - 364);
        const completions = selectedHabitId ? (habitCompletions[selectedHabitId] || {}) : {};
        let html = '';
        const todayStr = getTodayStr();
        for (let i = 0; i < 365; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const dateStr = formatDateLocal(d);
            const completed = completions[dateStr] ? 'completed' : '';
            const isToday = dateStr === todayStr ? 'today-heat' : '';
            html += `<div class="heatmap-cell ${completed} ${isToday}" data-heat="${dateStr}"></div>`;
        }
        grid.innerHTML = html;
        document.querySelectorAll('.heatmap-cell[data-heat]').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const dateStr = e.currentTarget.dataset.heat;
                if (!selectedHabitId) return;
                if (!habitCompletions[selectedHabitId]) habitCompletions[selectedHabitId] = {};
                habitCompletions[selectedHabitId][dateStr] = !habitCompletions[selectedHabitId][dateStr];
                saveAll();
                renderHeatmap();
                renderCalendar();
                renderStats();
                updateDashboard();
            });
        });
    }

    function renderSessionList() {
        const list = document.getElementById('session-list');
        if (!focusSessions.length) { list.innerHTML = '<div style="color:#7a6b5c;">No sessions yet.</div>'; return; }
        let html = '';
        focusSessions.slice().reverse().forEach(s => {
            const d = new Date(s.endTime);
            html += `<div class="session-item"><span>${d.toLocaleDateString()} ${d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})} · ${s.duration}min</span> <span>${s.distractions} distract</span></div>`;
        });
        list.innerHTML = html;
    }

    function renderJournalEntries() {
        const cont = document.getElementById('journal-entries');
        if (!journalEntries.length) { cont.innerHTML = '<div style="color:#7a6b5c;">No reflections yet.</div>'; return; }
        let html = '';
        journalEntries.slice().reverse().forEach(e => {
            const d = new Date(e.timestamp);
            html += `<div class="entry-item"><div class="entry-timestamp">${d.toLocaleString()}</div><div>${escapeHtml(e.text)}</div></div>`;
        });
        cont.innerHTML = html;
    }

    function escapeHtml(t) {
        return t.replace(/[&<>"]/g, function(m) {
            if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return '&quot;';
        });
    }

    function updateDashboard() {
        const today = getTodayStr();
        const todaySessions = focusSessions.filter(s => s.endTime.slice(0,10) === today);
        const totalMin = todaySessions.reduce((a,s)=>a+(s.duration||0),0);
        document.getElementById('dash-focus-min').innerText = totalMin;
        document.getElementById('dash-distract').innerText = focusSessions.reduce((a,s)=>a+(s.distractions||0),0);
        document.getElementById('dash-sessions').innerText = focusSessions.length;
        if (selectedHabitId) {
            const comp = habitCompletions[selectedHabitId] || {};
            const doneToday = comp[today] ? 1 : 0;
            document.getElementById('dash-habit-pct').innerText = (doneToday ? 100 : 0) + '%';
        } else document.getElementById('dash-habit-pct').innerText = '0%';
    }

    const savedSection = localStorage.getItem('saplingActiveSection') || 'dashboard';
    document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
    const targetSection = document.getElementById(savedSection);
    if (targetSection) targetSection.classList.add('active-section');
    else document.getElementById('dashboard').classList.add('active-section');

    const menuToggle = document.getElementById('menu-toggle');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.dataset.section;
            document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
            document.getElementById(sectionId).classList.add('active-section');
            localStorage.setItem('saplingActiveSection', sectionId);
            if (menuToggle) menuToggle.checked = false;
        });
    });

    document.getElementById('add-habit-btn').addEventListener('click', () => {
        const inp = document.getElementById('new-habit-name');
        if (!inp.value.trim()) return;
        const newId = 'h_' + Date.now() + Math.random();
        habits.push({ id: newId, name: inp.value.trim() });
        if (!selectedHabitId) selectedHabitId = newId;
        inp.value = '';
        saveAll();
        updateHabitSelector();
        renderStats();
        renderCalendar();
        renderHeatmap();
    });

    document.getElementById('edit-habit-btn').addEventListener('click', () => {
        const sel = document.getElementById('habit-select');
        if (!sel.value) return;
        const newName = prompt('New name for habit', habits.find(h=>h.id===sel.value)?.name);
        if (newName && newName.trim()) {
            habits.find(h=>h.id===sel.value).name = newName.trim();
            saveAll();
            updateHabitSelector();
        }
    });

    document.getElementById('delete-habit-btn').addEventListener('click', () => {
        if (!selectedHabitId) return;
        habits = habits.filter(h => h.id !== selectedHabitId);
        delete habitCompletions[selectedHabitId];
        if (habits.length > 0) {
            selectedHabitId = habits[0].id;
        } else {
            selectedHabitId = null;
        }
        saveAll();
        updateHabitSelector();
        renderStats();
        renderCalendar();
        renderHeatmap();
        updateDashboard();
    });

    document.getElementById('habit-select').addEventListener('change', (e) => {
        selectedHabitId = e.target.value || null;
        renderStats();
        renderCalendar();
        renderHeatmap();
    });

    document.getElementById('prev-month').addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('next-month').addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
        renderCalendar();
    });
    document.getElementById('today-calendar').addEventListener('click', () => {
        currentDisplayDate = new Date();
        selectedDateStr = getTodayStr();
        renderCalendar();
    });

    let focusInterval = null, focusRemaining = 1500, currentDistractions = 0, currentDuration = 25;
    const timerEl = document.getElementById('timer');
    function updateTimerDisplay() {
        const m = Math.floor(focusRemaining / 60);
        const s = focusRemaining % 60;
        timerEl.innerText = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    document.getElementById('focus-length').addEventListener('change', (e) => {
        currentDuration = parseInt(e.target.value);
        focusRemaining = currentDuration * 60;
        updateTimerDisplay();
    });
    document.getElementById('start-focus').addEventListener('click', () => {
        if (focusInterval) return;
        focusInterval = setInterval(() => {
            if (focusRemaining > 0) { focusRemaining--; updateTimerDisplay(); }
            else {
                clearInterval(focusInterval); focusInterval = null;
                focusSessions.push({ endTime: new Date().toISOString(), duration: currentDuration, distractions: currentDistractions });
                saveAll();
                renderSessionList();
                updateDashboard();
                focusRemaining = currentDuration * 60;
                currentDistractions = 0;
                document.getElementById('distraction-count').innerText = currentDistractions;
                updateTimerDisplay();
            }
        }, 1000);
    });
    document.getElementById('pause-focus').addEventListener('click', () => { clearInterval(focusInterval); focusInterval = null; });
    document.getElementById('reset-focus').addEventListener('click', () => {
        clearInterval(focusInterval); focusInterval = null;
        focusRemaining = currentDuration * 60;
        currentDistractions = 0;
        document.getElementById('distraction-count').innerText = currentDistractions;
        updateTimerDisplay();
    });
    document.getElementById('distraction-btn').addEventListener('click', () => {
        currentDistractions++;
        document.getElementById('distraction-count').innerText = currentDistractions;
    });

    document.getElementById('save-journal').addEventListener('click', () => {
        const txt = document.getElementById('journal-text').value.trim();
        if (!txt) return;
        journalEntries.push({ timestamp: new Date().toISOString(), text: txt });
        saveAll();
        document.getElementById('journal-text').value = '';
        renderJournalEntries();
    });

    updateHabitSelector();
    renderStats();
    renderCalendar();
    renderHeatmap();
    renderSessionList();
    renderJournalEntries();
    updateTimerDisplay();
    updateDashboard();
    let deferredPrompt;
    const installBanner = document.getElementById('install-banner');
    const installBtn = document.getElementById('install-btn');
    const closeBanner = document.getElementById('close-banner');

    window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBanner.classList.remove('hidden');
    });

    installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    deferredPrompt = null;
    installBanner.classList.add('hidden');
    });

    closeBanner.addEventListener('click', () => {
    installBanner.classList.add('hidden');
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
    installBanner.classList.add('hidden');
    }
})();