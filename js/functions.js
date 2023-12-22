const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((element) = parseInt (element, 10));
  return hours * 60 + minutes;
};

const checkworkingSchedule = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  dayStart = convertTimeToMinutes (dayStart);
  dayEnd = convertTimeToMinutes (dayEnd);
  meetingStart = convertTimeToMinutes(meetingStart);

  if (meetingStart >= dayStart) {
    return (meetingStart + meetingDuration) <= dayEnd;
  }

  return false;
};
