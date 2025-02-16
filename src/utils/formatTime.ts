import moment from 'moment';
import 'moment/locale/vi'; // Import locale tiếng Việt

// Thiết lập locale

const formatTimestamp = (timestamp: string, locale: string = 'vi') => {
  moment.locale(locale);
  const now = moment();
  const given = moment(timestamp);

  // Nếu chênh lệch từ thời điểm hiện tại đến thời điểm được cung cấp >= 7 ngày, hiển thị định dạng ngày cụ thể
  if (now.diff(given, 'days') >= 7) {
    return given.format('D MMM, YYYY'); // Ví dụ: "14 thg 1, 2025"
  } else {
    // Ngược lại, hiển thị dạng thời gian tương đối (ví dụ: "4 ngày trước", "1 giờ trước")
    return given.fromNow();
  }
};

export { formatTimestamp };
