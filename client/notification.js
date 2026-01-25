const notifications = [
    {
    message: "Congratulations!🎉 Your exercise goal for today is achieved.",
    type: "success",
    time: "Just now"
  },
  {
    message: "New goal assigned: Walk 10,000 steps today!🚶‍♂️",
    type: "normal",
    time: "2 minutes ago"
  },
  {
    message: "Reminder: Please complete your water💧 intake for today.",
    type: "warning",
    time: "10 minutes ago"
  },
  {
    message: "You have burned 500 calories🔥 in your last workout session.",
    type: "success",
    time: "1 hour ago"
  },
  {
    message: "Emergency alert: Please check your heart rate immediately!❤️",
    type: "danger",
    time: "Yesterday"
  },
  {
    message: "Congratulations!🎉 Your sleep goal for last night was met.",
    type: "success",
    time: "10 minutes ago"
  },
  {
    message: "you are close to reaching your daily step goal. Keep going!🚶‍♀️",
    type: "normal",
    time: "10 minutes ago"
  }
];

const list = document.getElementById("notificationList");

notifications.forEach(n => {
  const div = document.createElement("div");
  div.className = `notification ${n.type}`;
  div.innerHTML = `
    <p>${n.message}</p>
    <div class="time">${n.time}</div>
  `;
  list.appendChild(div);
});
