// import React, { useState } from "react";
// import "../asset/style.css";

// function Calendar() {
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth());

//   const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

//   const renderCalendar = () => {
//     let datesHtml = "";
//     const date = new Date(year, month, 1);
//     const start = date.getDay();
//     const endDate = new Date(year, month + 1, 0).getDate();
//     const end = new Date(year, month, endDate).getDay();
//     const endDatePrev = new Date(year, month, 0).getDate();

//     for (let i = start; i > 0; i--) {
//       datesHtml += `<li className="inactive">${endDatePrev - i + 1}</li>`;
//     }

//     for (let i = 1; i <= endDate; i++) {
//       let className = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "today" : "";
//       datesHtml += `<li className="${className}">${i}</li>`;
//     }

//     for (let i = end; i < 6; i++) {
//       datesHtml += `<li className="inactive">${i - end + 1}</li>`;
//     }

//     return datesHtml;
//   };

//   // const handleNavClick = (direction) => {
//   //   if (direction === 'prev' && month === 0) {
//   //     setYear(year - 1);
//   //     setMonth(11);
//   //   } else if (direction === 'next' && month === 11) {
//   //     setYear(year + 1);
//   //     setMonth(0);
//   //   } else {
//   //     setMonth(direction === 'next' ? month + 1 : month - 1);
//   //   }
//   // }

//   return (
//     <div className="wrap">
//       <div className="header">
//         <h3>{`${year}년 ${months[month]}`}</h3>
//         <div className="title">식단표</div>
//       </div>
//       <div className="calendar">
//         <header>
//           {/* <nav>
//             <button id="prev" onClick={() => handleNavClick('prev')}></button>
//             <button id="next" onClick={() => handleNavClick('next')}></button>
//           </nav> */}
//         </header>
//         <section>
//           <ul className="days">
//             <li className="holiday">일</li>
//             <li>월</li>
//             <li>화</li>
//             <li>수</li>
//             <li>목</li>
//             <li>금</li>
//             <li className="holiday">토</li>
//           </ul>
//           <ul className="dates" dangerouslySetInnerHTML={{ __html: renderCalendar() }}></ul>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Calendar;
