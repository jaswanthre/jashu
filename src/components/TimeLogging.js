import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginTop: '10px',
  },
  input: {
    marginTop: '5px',
    padding: '8px',
    fontSize: '14px',
  },
  textarea: {
    marginTop: '5px',
    padding: '8px',
    fontSize: '14px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 15px',
    fontSize: '16px',
  },
};

function TimeLogging() {
  const [date, setDate] = useState('');
  const [topic, setTopic] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const log = { date, topic, startTime, endTime, description };
    try {
      await axios.post('http://localhost:5000/logs', log);
      // Reset form
      setDate('');
      setTopic('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    } catch (error) {
      console.error('Error logging time', error);
    }
  };

  return (
    <section style={styles.section}>
      <h2>Log Your Time</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="date" style={styles.label}>Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />

        <label htmlFor="topic" style={styles.label}>Topic/Project:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic name"
          style={styles.input}
        />

        <label htmlFor="start-time" style={styles.label}>Start Time:</label>
        <input type="time" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={styles.input} />

        <label htmlFor="end-time" style={styles.label}>End Time:</label>
        <input type="time" id="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={styles.input} />

        <label htmlFor="description" style={styles.label}>Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea}></textarea>

        <button type="submit" style={styles.button}>Log Time</button>
      </form>
    </section>
  );
}

export default TimeLogging;
