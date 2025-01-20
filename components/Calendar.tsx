import React from "react";

export default function Calendar() {
  const today = new Date();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const weekDates = [];

  // 今日の曜日
  const currentDay = today.getDay();

  // 今週の曜日と日付を計算
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(today);
    weekDate.setDate(today.getDate() - currentDay + i);

    const formattedDate = `${String(weekDate.getDate()).padStart(2, "0")}`;
    weekDates.push({
      day: dayNames[weekDate.getDay()],
      date: formattedDate,
      isToday: today.toDateString() === weekDate.toDateString(), // 今日と一致するか
    });
  }

  return (
      <div className={`relative w-full px-1 md:px-3 `}>
          <div className="grid grid-cols-7 w-full">
              {weekDates.map((item, index) => (
                  <div
                      className={`flex flex-col gap-y-3 w-fit py-6 px-3 md:py-3 md:px-1 ${
                          item.isToday
                              ? 'bg-main-key-color2 text-white rounded-full'
                              : 'bg-transparent'
                      }`}
                      key={index}
                  >
                      <span
                          key={`day-${index}`}
                          className={`text-center font-bold w-fit text-sm md:text-sm lg:text-lg ${
                              !item.isToday ? 'text-gray-400' : ''
                          }`}
                      >
                          {item.day}
                      </span>
                      <span
                          key={`date-${index}`}
                          className={`text-center font-bold w-fit text-sm md:text-sm lg:text-lg ${
                              !item.isToday ? 'text-main-key-color2' : ''
                          }`}
                      >
                          {item.date}
                      </span>
                  </div>
              ))}
          </div>
      </div>
  )
}
