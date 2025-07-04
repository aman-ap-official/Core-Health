
# 🧠💧 Health Tracker Web App

A simple, interactive web application that helps users track their **daily mood**, **water intake**, **breathing exercises**, and **meal logs**, with summaries and data persistence using `localStorage`.

<p align="center">
  <a href="https://github.com/aman-ap-official" target="_blank">Visit My GitHub</a> • <a href="https://github.com/aman-ap-official/Core-Health/blob/main/LICENSE.txt">License</a>
</p>

---

## 🌐 Live Preview

> *https://corehealth.netlify.app*

---

## 📁 Project Structure

```
health-tracker/
│
├── index.html               # Main HTML structure
├── css/
│   └── style.css            # All UI styles
├── js/
│   └── script.js            # Application logic (JS)
└── README.md                # Documentation
```

---

## 🚀 Features Overview

### 1. **Mood Tracker**
- Select emojis to reflect your current mood.
- View moods for each day in a calendar format.
- Persist mood data across sessions using `localStorage`.

### 2. **Water Intake Tracker**
- Click 💧 cups to log 250ml per click.
- Displays daily progress out of a 2000ml goal.
- Visual progress bar auto-updates.
- Data resets daily but is saved for summary.

### 3. **Breathing Animation**
- Guided animation (Inhale/Exhale loop).
- Use Start/Stop buttons to control.
- Helps promote mindfulness and relaxation.

### 4. **Meal Log**
- Input meal names and calories.
- View a list of meals with total calories.
- Useful for tracking daily nutrition intake.

### 5. **Daily Summary**
- Displays mood, water intake, calories, and meals for the current day.
- Updates automatically as entries are made.

### 6. **Past Summaries**
- Auto-logs each day’s data at midnight.
- View summaries of previous days using a date filter.

### 7. **Responsive Design**
- Mobile-friendly layout using Bootstrap 4.5
- Smooth UX on all screen sizes.

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap 4.5.2**
- **JavaScript (ES6)**
- **GSAP** – For breathing animation
- **localStorage** – For saving daily logs and summaries

---

## 🖥️ Installation & Usage

### Clone the Repository

```bash
git clone https://github.com/aman-ap-official/Core-Health
cd health-tracker
```

### Open in Browser

Just open `index.html` in your preferred browser:

```bash
open index.html
```

Or double-click the file.

---

## 📦 File Breakdown

### 📄 `index.html`

- Contains all sections: mood, water, breathing, meals, summary.
- Navbar for quick navigation.
- Semantic HTML5 sections for accessibility.

### 🎨 `css/style.css`

- Clean and modern look.
- Custom UI components (calendar, buttons, breathing circle).
- Media queries for responsiveness.

### 🧠 `js/script.js`

Handles all interactivity:

- Date handling and daily reset logic.
- Mood recording with calendar color updates.
- Water tracking with progress bar.
- Breathing circle animation using GSAP.
- Meal entry, calorie summing, and summary generation.
- Summary persistence using `localStorage`.

---

## 🔁 Daily Reset Logic

- When a new day is detected:
  - Saves current data to `dailySummary_YYYY-MM-DD`.
  - Resets mood, water, meals for the new day.
  - Updates `lastSavedDate` in `localStorage`.

---

## 🧪 Example Use Case

1. Open app → click on emoji to log your mood.
2. Click 💧 every time you drink 250ml of water.
3. Log meals with their calorie count.
4. Click "End Day & Reset" or wait for auto-reset at midnight.
5. Return tomorrow and check “Past Day Summaries”!

---

## 📷 Screenshots 

> ![Image](https://github.com/user-attachments/assets/d816f130-28e3-470f-8164-b32353b8629d)
> ![Image](https://github.com/user-attachments/assets/d26098f1-4c4c-4c02-b56d-f8d36f4c4695)
> ![Image](https://github.com/user-attachments/assets/9d6f56f4-13a1-40e0-ac82-a4a38891ea9a)
> ![Image](https://github.com/user-attachments/assets/6745fcee-96ce-470d-89a3-4e3d6dae3d92)



---

## 🙌 Credits

- Created by **Aman Pandey**
- Design inspiration from mindfulness apps
- Breathing animation by **GSAP**

---

## 📄 License

This project is licensed under the `Proprietary License`.

---

## 💡 Future Improvements

- User authentication for multiple users.
- Export summary as PDF.
- Charts for historical trends (mood, water, calories).
- Dark mode toggle.

---

## 📬 Contact

For feedback, contact: `amanpandey.contactme@gmail.com` or connect on [LinkedIn](https://www.linkedin.com/in/aman-pandey-ap)

---

<p align="center">
  Made with ❤ by <a href="https://github.com/aman-ap-official">Aman AP</a>
</p>
