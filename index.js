import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const DatePickers = ({
  title,
  titleColor,
  titleTextSize,
  onDateChange,
  close,
  backgroundColor,
  headerbackgroundColor,
  borderColor,
  arrowColor,
  arrowSize,
  borderTopColor,
  borderBottomColor,
  borderRightColor,
  borderLeftColor,
  borderWidth,
  yearColor,
  opacity,
  yearBackgroundColor,
  yearTextSize,
  dayColor,
  dayBackgroundColor,
  dayFontSize,
  closeBackgroundColor,
  closeColor,
  closeTextSize,
  monthColor,
  monthTextSize,
  borderRadius,
  height,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const today = new Date();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (showYearPicker && scrollViewRef.current) {
      const index = currentYear - 1950;
      scrollViewRef.current.scrollTo({y: index * 50, animated: true}); // 50 is approx. the height of each year item
    }
  }, [showYearPicker, currentYear]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleDateSelect = day => {
    const selected = new Date(currentYear, currentMonth, day);
    if (selected <= today) {
      setSelectedDate(selected);
      setShowModal(false);
      if (onDateChange) {
        onDateChange(selected);
      }
    }
  };

  const handleMonthChange = direction => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleYearChange = year => {
    if (year <= today.getFullYear()) {
      setCurrentYear(year);
      setShowYearPicker(false);
    }
  };

  const isFutureDate = day => {
    const date = new Date(currentYear, currentMonth, day);
    return date > today;
  };

  const isCurrentDate = day => {
    return (
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth() &&
      day === today.getDate()
    );
  };

  const isCurrentYear = year => {
    return year === today.getFullYear();
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.dateInput}>
        <Text
          style={{color: titleColor || 'red', fontSize: titleTextSize || 16}}>
          {selectedDate ? selectedDate.toDateString() : title || 'Select Date'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.calendarContainer,
              {
                backgroundColor: backgroundColor || '#fff',
                borderColor: borderColor || 'red',
                borderBottomColor: borderBottomColor || 'transparent',
                borderRightWidth: borderWidth || 0,
                borderLeftWidth: borderWidth || 0,
                borderTopWidth: borderWidth || 0,
                borderBottomWidth: borderWidth || 0,
                borderRightColor: borderRightColor || 'transparent',
                borderLeftColor: borderLeftColor || 'transparent',
                borderTopColor: borderTopColor || 'transparent',
                height: height || 400,
                borderRadius: borderRadius || 10,
                padding:0
              },
            ]}>
            <View
              style={[
                styles.header,
                {backgroundColor: headerbackgroundColor || '#6360FF'},
              ]}>
              <TouchableOpacity onPress={() => setShowYearPicker(true)}>
                <Text
                  style={{
                    color: yearColor || 'black',
                    fontSize: yearTextSize || 12,
                  }}>
                  {currentYear}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMonthChange(-1)}>
                <Text style={{color: arrowColor || 'white'}}>
                  <AntDesign size={arrowSize || 20} name="left" />
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: monthColor || 'black',
                  fontSize: monthTextSize || 14,
                }}>
                {months[currentMonth]}
              </Text>
              <TouchableOpacity onPress={() => handleMonthChange(1)}>
                <Text style={{color: arrowColor || 'white'}}>
                  <AntDesign size={arrowSize || 20} name="right" />
                </Text>
              </TouchableOpacity>
            </View>

            {showYearPicker ? (
              <ScrollView
                contentContainerStyle={styles.yearPicker}
                ref={scrollViewRef}>
                {[...Array(today.getFullYear() - 1950 + 51).keys()].map(i => {
                  const year = 1950 + i;
                  return (
                    <TouchableOpacity
                      key={year}
                      onPress={() => handleYearChange(year)}
                      disabled={year > today.getFullYear()}
                      style={[
                        styles.year,
                        year > today.getFullYear() && [
                          {opacity: opacity || 0.3},
                        ],
                        isCurrentYear(year) && [
                          styles.currentYear,
                          {backgroundColor: yearBackgroundColor || 'green'},
                        ],
                      ]}>
                      <Text
                        style={{
                          color: yearColor || 'black',
                          fontSize: yearTextSize || 12,
                        }}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView contentContainerStyle={styles.daysContainer}>
                {[
                  ...Array(daysInMonth(currentMonth + 1, currentYear)).keys(),
                ].map(day => {
                  const dayNum = day + 1;
                  return (
                    <TouchableOpacity
                      key={dayNum}
                      onPress={() => handleDateSelect(dayNum)}
                      disabled={isFutureDate(dayNum)}
                      style={[
                        styles.day,
                        isFutureDate(dayNum) && [{opacity: opacity || 0.3}],
                        isCurrentDate(dayNum) && [
                          styles.currentDay,
                          {backgroundColor: dayBackgroundColor || 'gray'},
                        ],
                      ]}>
                      <Text
                        style={{
                          color: dayColor || 'black',
                          fontSize: dayFontSize || 12,
                        }}>
                        {dayNum}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[
                styles.closeButton,
                {backgroundColor: closeBackgroundColor || '#6360FF'},
              ]}>
              <Text
                style={{
                  color: closeColor || 'black',
                  fontSize: closeTextSize || 16,
                }}>
                {close ? close : 'Close'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInput: {
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '80%',
    overflow: 'hidden',
    padding:0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
    paddingVertical: 13,
    width:"100%"
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  day: {
    width: '14.285%',
    padding: 10,
    alignItems: 'center',
  },
  disabledDay: {
    opacity: 0.3,
  },
  currentDay: {
    backgroundColor: '#FFD700', // Highlight the current date with a gold color
    borderRadius: 20,
  },
  yearPicker: {
    flexDirection: 'column',
    padding: 10,
  },
  year: {
    padding: 10,
    alignItems: 'center',
    height: 50, // Ensure consistent height for each year item
  },
  disabledYear: {
    opacity: 0.3,
  },
  currentYear: {
    // Highlight the current year
    borderRadius: 10,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    width:"100"
  },
});

export default DatePickers;
