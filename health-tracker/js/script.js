// all code written by AMAN PANDEY..
// For contact: amanpandey.contactme@gmail.com

document.addEventListener('DOMContentLoaded', () => {
    // --- New Day Check Logic ---
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function checkAndResetIfNewDay() {
        const today = getCurrentDate();
        const lastSavedDate = localStorage.getItem('lastSavedDate');
        if (lastSavedDate && lastSavedDate !== today) {
            const storedData = JSON.parse(localStorage.getItem('healthTrackerData')) || {};
            const recordedMoods = JSON.parse(localStorage.getItem('recordedMoods')) || {};
            const summary = {
                mood: recordedMoods[lastSavedDate] || 'Not recorded',
                water: storedData.waterIntake || 0,
                calories: storedData.totalCalories || 0,
                meals: storedData.meals || []
            };
            localStorage.setItem(`dailySummary_${lastSavedDate}`, JSON.stringify(summary));

            storedData.waterIntake = 0;
            storedData.meals = [];
            storedData.totalCalories = 0;

            localStorage.setItem('healthTrackerData', JSON.stringify(storedData));
            localStorage.setItem('lastSavedDate', today);
        } else if (!lastSavedDate) {
            localStorage.setItem('lastSavedDate', today);
        }
    }

    checkAndResetIfNewDay();

    // --- Mood Tracker ---
    const emojiButtonsDiv = document.getElementById('emoji-buttons');
    const moodCalendarDiv = document.getElementById('mood-calendar');
    const moods = {
        '😊': 'happy',
        '😔': 'sad',
        '😡': 'angry',
        '😌': 'calm',
        '😨': 'anxious'
    };
    const moodEmojis = {
        'happy': '😊',
        'sad': '😔',
        'angry': '😡',
        'calm': '😌',
        'anxious': '😨'
    };
    const moodColors = {
        'happy': '#a7ed89',
        'sad': '#89b3ed',
        'angry': '#ed8989',
        'calm': '#ede689',
        'anxious': '#d189ed'
    };
    let recordedMoods = {};

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let calendarYear = new Date().getFullYear();
    let calendarMonth = new Date().getMonth();

    document.getElementById('prev-month').addEventListener('click', () => {
        calendarMonth--;
        if (calendarMonth < 0) {
            calendarMonth = 11;
            calendarYear--;
        }
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        calendarMonth++;
        if (calendarMonth > 11) {
            calendarMonth = 0;
            calendarYear++;
        }
        renderCalendar();
    });

    function renderCalendar() {
        document.getElementById('calendar-title').textContent = `${monthNames[calendarMonth]} ${calendarYear}`;
        moodCalendarDiv.innerHTML = '';

        const firstDow = new Date(calendarYear, calendarMonth, 1).getDay();
        const lastDate = new Date(calendarYear, calendarMonth + 1, 0).getDate();

        for (let i = 0; i < firstDow; i++) {
            const empty = document.createElement('span');
            empty.classList.add('mood-calendar-day');
            moodCalendarDiv.appendChild(empty);
        }

        for (let day = 1; day <= lastDate; day++) {
            const cell = document.createElement('span');
            cell.classList.add('mood-calendar-day');
            cell.textContent = day;
            const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (recordedMoods[dateStr]) {
                cell.classList.add('has-mood');
                cell.textContent = moodEmojis[recordedMoods[dateStr]];
                gsap.to(cell, {
                    backgroundColor: moodColors[recordedMoods[dateStr]],
                    color: 'white',
                    duration: 0.3
                });
            }

            moodCalendarDiv.appendChild(cell);
        }
    }

    emojiButtonsDiv.innerHTML = '';
    for (const emoji in moods) {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.addEventListener('click', () => {
            const today = getCurrentDate();
            recordedMoods[today] = moods[emoji];
            localStorage.setItem('recordedMoods', JSON.stringify(recordedMoods));
            renderCalendar();
            gsap.to(btn, { scale: 1.2, duration: 0.1, yoyo: true });
            saveData();
            updateSummary();
        });
        emojiButtonsDiv.appendChild(btn);
    }

    const savedMoods = localStorage.getItem('recordedMoods');
    if (savedMoods) {
        recordedMoods = JSON.parse(savedMoods);
    }

    // --- Water Intake Tracker ---
    const waterIntakeSpan = document.getElementById('water-intake');
    const waterGoalSpan = document.getElementById('water-goal');
    const waterProgressBar = document.getElementById('water-progress-bar');
    const cupButtons = document.querySelectorAll('.cup-button');
    let currentIntake = 0;
    const dailyGoal = parseInt(waterGoalSpan.textContent);

    cupButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = parseInt(button.dataset.amount);
            currentIntake += amount;
            waterIntakeSpan.textContent = currentIntake;
            const progress = Math.min((currentIntake / dailyGoal) * 100, 100);
            gsap.to(waterProgressBar, {
                width: `${progress}%`,
                duration: 0.5,
                backgroundColor: '#29b6f6',
                textContent: `${Math.round(progress)}%`,
                ease: "power3.out"
            });
            gsap.fromTo(button, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true });
            saveData();
            updateSummary();
        });
    });

    // --- Breathing Animation ---
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingText = document.getElementById('breathing-text');
    const startBreathingButton = document.getElementById('start-breathing');
    const stopBreathingButton = document.getElementById('stop-breathing');
    let breathingAnimation;
    let isBreathing = false;

    startBreathingButton.addEventListener('click', () => {
        if (!isBreathing) {
            isBreathing = true;
            startBreathingAnimation();
            startBreathingButton.disabled = true;
            stopBreathingButton.disabled = false;
            gsap.to(startBreathingButton, { backgroundColor: '#81c784', duration: 0.3 });
            gsap.to(stopBreathingButton, { backgroundColor: '#e57373', duration: 0.3 });
        }
    });

    stopBreathingButton.addEventListener('click', () => {
        if (isBreathing) {
            isBreathing = false;
            if (breathingAnimation) breathingAnimation.kill();
            breathingText.textContent = 'Inhale';
            gsap.to(breathingCircle, { scale: 1, opacity: 0.8, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            startBreathingButton.disabled = false;
            stopBreathingButton.disabled = true;
            gsap.to(startBreathingButton, { backgroundColor: '#4caf50', duration: 0.3 });
            gsap.to(stopBreathingButton, { backgroundColor: '#f44336', duration: 0.3 });
        }
    });

    function startBreathingAnimation() {
        breathingAnimation = gsap.timeline({ repeat: -1, yoyo: true });
        breathingAnimation
            .to(breathingCircle, {
                scale: 1.3,
                opacity: 1,
                duration: 2,
                ease: "power1.inOut",
                onStart: () => gsap.to(breathingText, { text: 'Inhale', duration: 0.3 })
            })
            .to(breathingCircle, {
                scale: 1,
                opacity: 0.8,
                duration: 3,
                ease: "power1.inOut",
                onStart: () => gsap.to(breathingText, { text: 'Exhale', duration: 0.3 })
            });
        gsap.to(breathingCircle, { backgroundColor: '#64b5f6', yoyo: true, repeat: -1, duration: 2, ease: "sine.inOut" });
    }

    // --- Meal Log ---
    const mealNameInput = document.getElementById('meal-name');
    const mealCaloriesInput = document.getElementById('meal-calories');
    const addMealButton = document.getElementById('add-meal');
    const mealList = document.getElementById('meal-list');
    const totalCaloriesSpan = document.getElementById('total-calories');
    let totalCalories = 0;
    let loggedMeals = [];

    addMealButton.addEventListener('click', () => {
        const name = mealNameInput.value.trim();
        const calories = parseInt(mealCaloriesInput.value);

        if (name && !isNaN(calories)) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${name}</span> <span>${calories} calories</span>`;
            mealList.prepend(listItem);
            gsap.fromTo(listItem, { opacity: 0, y: -15, scaleX: 0.95 }, { opacity: 1, y: 0, scaleX: 1, duration: 0.2 });
            totalCalories += calories;
            totalCaloriesSpan.textContent = totalCalories;
            gsap.fromTo(totalCaloriesSpan, { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true });
            loggedMeals.push({ name, calories });
            saveData();
            updateSummary();
            mealNameInput.value = '';
            mealCaloriesInput.value = '';
        } else {
            gsap.to(addMealButton, { backgroundColor: '#dc3545', duration: 0.1, yoyo: true, onComplete: () => gsap.to(addMealButton, { backgroundColor: '#28a745', delay: 0.3 }) });
            gsap.to([mealNameInput, mealCaloriesInput], { x: "+=5", repeat: 3, yoyo: true, duration: 0.05 });
            alert('Please enter a meal name and valid calories.');
        }
    });

    function saveData() {
        const today = getCurrentDate();
        const currentMood = recordedMoods[today];
        const dataToSave = {
            moods: recordedMoods,
            waterIntake: currentIntake,
            meals: loggedMeals,
            totalCalories: totalCalories
        };
        localStorage.setItem('healthTrackerData', JSON.stringify(dataToSave));
        localStorage.setItem('lastSavedDate', today);
        localStorage.setItem(`dailySummary_${today}`, JSON.stringify({
            mood: currentMood || 'Not recorded',
            water: currentIntake,
            calories: totalCalories,
            meals: loggedMeals
        }));
    }

    function loadData() {
        const today = getCurrentDate();
        const storedData = localStorage.getItem('healthTrackerData');
        const storedMoods = localStorage.getItem('recordedMoods');
        if (storedData) {
            const data = JSON.parse(storedData);
            currentIntake = data.waterIntake || 0;
            loggedMeals = data.meals || [];
            totalCalories = data.totalCalories || 0;
        } else {
            currentIntake = 0;
            loggedMeals = [];
            totalCalories = 0;
        }
        if (storedMoods) {
            recordedMoods = JSON.parse(storedMoods);
        } else {
            recordedMoods = {};
        }

        renderCalendar();
        waterIntakeSpan.textContent = currentIntake;
        const progress = Math.min((currentIntake / dailyGoal) * 100, 100);
        waterProgressBar.style.width = `${progress}%`;
        waterProgressBar.textContent = `${Math.round(progress)}%`;
        totalCaloriesSpan.textContent = totalCalories;
        mealList.innerHTML = '';
        loggedMeals.forEach(meal => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${meal.name}</span> <span>${meal.calories} calories</span>`;
            mealList.prepend(listItem);
        });

        updateSummary();
        displayPastSummaries();
    }

    const summaryMood = document.getElementById('summary-mood');
    const summaryWater = document.getElementById('summary-water');
    const summaryCalories = document.getElementById('summary-calories');
    const summaryMealList = document.getElementById('summary-meal-list');

    function updateSummary() {
        const today = getCurrentDate();
        const todayMood = recordedMoods[today]
            ? moods[Object.keys(moods).find(key => moods[key] === recordedMoods[today])]
            : 'Not recorded';
        summaryMood.textContent = `Today's Mood: ${todayMood}`;
        summaryWater.textContent = `Water Intake: ${currentIntake} ml / Goal: ${dailyGoal} ml`;
        summaryCalories.textContent = `Total Calories Consumed: ${totalCalories}`;
        summaryMealList.innerHTML = '';
        loggedMeals.forEach(meal => {
            const mealItem = document.createElement('li');
            mealItem.textContent = `${meal.name} - ${meal.calories} calories`;
            summaryMealList.appendChild(mealItem);
        });
    }

    function resetDailyData() {
        const today = getCurrentDate();

        // Save today's summary
        const summary = {
            mood: recordedMoods[today] || 'Not recorded',
            water: currentIntake,
            calories: totalCalories,
            meals: loggedMeals
        };
        localStorage.setItem(`dailySummary_${today}`, JSON.stringify(summary));

        // Remove current data
        localStorage.removeItem('healthTrackerData');

        // Remove today's mood
        if (recordedMoods[today]) {
            delete recordedMoods[today];
            localStorage.setItem('recordedMoods', JSON.stringify(recordedMoods));
        }

        loadData();
        alert('Daily data cleared for the next day!');
    }

    const pastSummariesContainer = document.getElementById('past-summaries-container');

    function displayPastSummaries(filterDate) {
        pastSummariesContainer.innerHTML = '';
        let summaryKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('dailySummary_'))
            .sort().reverse();

        if (filterDate) {
            summaryKeys = summaryKeys.filter(k => k === `dailySummary_${filterDate}`);
        }

        if (summaryKeys.length === 0) {
            pastSummariesContainer.innerHTML = '<p>No past day summaries available.</p>';
            return;
        }

        summaryKeys.forEach(key => {
            const summary = JSON.parse(localStorage.getItem(key));
            const date = key.split('_')[1];
            const div = document.createElement('div');
            div.classList.add('past-summary-item', 'mb-3', 'p-3', 'border', 'rounded');
            div.innerHTML = `
                <div>
                    <h4>${date}</h4>
                    <p>Mood: ${summary.mood}</p>
                    <p>Water Intake: ${summary.water} ml</p>
                    <p>Total Calories: ${summary.calories}</p>
                    <h5>Meals:</h5>
                    <ul>${summary.meals.map(meal => `<li>${meal.name} - ${meal.calories} calories</li>`).join('')}</ul>
                </div>
                <button class="btn btn-sm btn-danger delete-summary" data-date="${date}">Delete</button>
            `;
            pastSummariesContainer.appendChild(div);
        });

        document.querySelectorAll('.delete-summary').forEach(btn => {
            btn.addEventListener('click', () => {
                const date = btn.dataset.date;
                localStorage.removeItem(`dailySummary_${date}`);
                displayPastSummaries(filterDate);
                alert(`Summary for ${date} deleted.`);
            });
        });
    }

    const resetButton = document.getElementById('reset-day-button');
    resetButton.addEventListener('click', resetDailyData);

    const filterInput = document.getElementById('filter-date');
    const filterBtn = document.getElementById('filter-button');
    const clearBtn = document.getElementById('clear-filter');

    filterBtn.addEventListener('click', () => {
        const date = filterInput.value;
        displayPastSummaries(date || null);
    });

    clearBtn.addEventListener('click', () => {
        filterInput.value = '';
        displayPastSummaries(null);
    });

    loadData();
});
