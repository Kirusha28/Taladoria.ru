import React from 'react'
import './EventContent.scss'
import ContentWrap from '../../../components/Wrappers/ContentWrap'

const EventContent = () => {
  // Дни недели
  const days = [
    { date: '15/04', weekday: 'Пн', isToday: true },
    { date: '16/04', weekday: 'Вт' },
    { date: '17/04', weekday: 'Ср' },
    { date: '18/04', weekday: 'Чт' },
    { date: '19/04', weekday: 'Пт' },
    { date: '20/04', weekday: 'Сб' },
    { date: '21/04', weekday: 'Вс' },
  ]

  // Мероприятия
  const events = [
    {
      name: 'Командные бои в MTA: SA',
      icon: '⚔️',
      slots: '[5 участников, пока]',
      schedule: {
        5: '16:00'
      }
    },
    {
      name: 'Еженедельное собрание',
      icon: '📢',
      slots: '[8/10 участников]',
      schedule: {
        2: '20:00',
        5: '21:00'
      }
    },
    {
      name: 'Стрим по проекту',
      icon: '🎬',
      slots: '[открыто]',
      schedule: {
        0: '19:00',
        4: '18:30'
      }
    },
    {
      name: 'Обучение новым механикам',
      icon: '📚',
      slots: '[все желающие]',
      schedule: {
        1: '17:00',
        3: '19:00'
      }
    },
    {
      name: 'Тестирование обновления',
      icon: '🔧',
      slots: '[нужны тестеры]',
      schedule: {
        6: '14:00'
      }
    },
  ]

  return (
    <section className='EventContent'>
      <ContentWrap sx={{ padding: '20px 0', border: 'none' }}>
        <h1 className="page-title">Расписание мероприятий</h1>
        
        <div className="events-grid">
          {/* Шапка таблицы */}
          <div className="events-grid__header">
            <div className="events-grid__cell events-grid__cell--empty"></div>
            {days.map((day, idx) => (
              <div key={idx} className={`events-grid__cell events-grid__cell--day ${day.isToday ? 'events-grid__cell--today' : ''}`}>
                <span className="day-week">{day.weekday}</span>
                <span className="day-date">{day.date}</span>
                {day.isToday && <span className="day-badge">Сегодня</span>}
              </div>
            ))}
          </div>

          {/* Строки с мероприятиями */}
          {events.map((event, eventIdx) => (
            <div key={eventIdx} className="events-grid__row">
              <div className="events-grid__cell events-grid__cell--event">
                <span className="event-icon">{event.icon}</span>
                <div className="event-info">
                  <div className="event-name">{event.name}</div>
                  <div className="event-slots">{event.slots}</div>
                </div>
              </div>

              {days.map((_, dayIdx) => (
                <div key={dayIdx} className={`events-grid__cell events-grid__cell--time ${event.schedule[dayIdx] ? 'has-event' : ''}`}>
                  {event.schedule[dayIdx] && (
                    <div className="event-time">
                      <span className="time">{event.schedule[dayIdx]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="event-footer">
          <p>💡 Мероприятия проводятся регулярно, точное время может меняться. Следите за обновлениями.</p>
        </div>
      </ContentWrap>
    </section>
  )
}

export default EventContent