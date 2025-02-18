export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Analytics pageview track
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Google Analytics event track
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
