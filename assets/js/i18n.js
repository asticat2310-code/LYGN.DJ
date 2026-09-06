/* ============================================================
   Site data: contacts, styles, brand icons, and EN/VI copy.
   Edit contacts and styles here — they render on every page.
   ============================================================ */

window.ICONS = {
  telegram:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.63a1.3 1.3 0 0 0-1.35-.2L3.4 11.2c-1.02.41-1 1.86.03 2.24l4.2 1.53 1.63 5.02c.2.6.95.79 1.42.36l2.4-2.2 4.28 3.15c.53.39 1.29.11 1.44-.53l3.05-13.7a1.3 1.3 0 0 0-.91-1.44zM9.7 14.32l8.02-5.05c.19-.12.38.14.22.29l-6.6 6.13c-.22.2-.36.48-.4.78l-.23 1.9-1.01-4.05z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor"/></svg>',
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.76.46 3.48 1.35 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42l-.48-.01c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>',
  zalo:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6c-5.4 0-9.8 3.7-9.8 8.3 0 2.6 1.4 4.9 3.6 6.4-.15 1.13-.6 2.2-1.3 3.1-.2.26 0 .63.32.55 1.6-.4 2.98-1.05 4.05-1.9.98.24 2.02.37 3.11.37 5.4 0 9.8-3.7 9.8-8.3S17.4 2.6 12 2.6z"/><rect x="6.3" y="9" width="3.5" height="1.4" rx="0.3" fill="#000"/><path d="M6.3 14.4v-1.1l2.1-2.5H6.4v-1.3h3.6v1.1l-2.1 2.5h2.2v1.3z" fill="#000"/><rect x="11" y="9" width="1.3" height="5.4" rx="0.4" fill="#000"/><circle cx="16.4" cy="13.1" r="1.6" fill="none" stroke="#000" stroke-width="1.2"/><rect x="17.4" y="9" width="1.3" height="5.4" rx="0.4" fill="#000"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94z"/></svg>',
};

window.SITE = {
  // Order tuned for a Vietnam-first audience (Zalo & Facebook first).
  contacts: [
    { key: "zalo", label: "Zalo", handle: "+84 337 987 724", url: "https://zalo.me/84337987724", icon: "zalo" },
    { key: "facebook", label: "Facebook", handleKey: "contact.openProfile", url: "https://www.facebook.com/share/1BvBrz6C7E/?mibextid=wwXIfr", icon: "facebook" },
    { key: "instagram", label: "Instagram", handle: "@leptyaginv", url: "https://instagram.com/leptyaginv", icon: "instagram" },
    { key: "telegram", label: "Telegram", handle: "@leptyaginv", url: "https://t.me/leptyaginv", icon: "telegram" },
    { key: "whatsapp", label: "WhatsApp", handle: "+7 950 168 63 11", url: "https://wa.me/79501686311", icon: "whatsapp" },
  ],
  styles: [
    "Tech-house",
    "Techno-house",
    "Afro-house",
    "Organic-house",
    "D&B",
    "Hip-hop",
    "R&B",
    "Pop",
    "Commercial",
  ],
};

window.I18N = {
  en: {
    "nav.projects": "Portfolio",
    "nav.contact": "Contact",
    "hero.iam": "I am",
    "hero.role": "DJ / Producer",
    "hero.scroll": "Scroll ↓",
    "folio.title": "MY PORTFOLIO",
    "folio.lead":
      "DJ LYGN has spent more than 10 years behind the decks — from open-air festivals to night clubs and bars. A versatile selector moving fluidly across genres, LYGN reads the room and keeps the floor moving from the first track to the last.",
    "folio.watch": "Watch videos",
    "folio.book": "Book a set",
    "contact.title": "CONTACT",
    "contact.lead":
      "DJ LYGN — 10+ years in the event industry, performing at open-air festivals, night clubs and bars. Available for bookings, private events and collaborations. Reach out on any channel below.",
    "contact.styles": "Styles",
    "contact.openProfile": "Open profile",
    "page.back": "Back to home",
    "page.title": "PORTFOLIO",
    "page.sub": "Live sets & highlights — tap any clip to play.",
    "page.hint": "More sets available on request.",
  },
  vi: {
    "nav.projects": "Portfolio",
    "nav.contact": "Liên hệ",
    "hero.iam": "Tôi là",
    "hero.role": "DJ / Nhà sản xuất",
    "hero.scroll": "Cuộn xuống ↓",
    "folio.title": "PORTFOLIO CỦA TÔI",
    "folio.lead":
      "DJ LYGN đã có hơn 10 năm sau bàn đĩa — từ các lễ hội ngoài trời đến club và bar về đêm. Là một DJ đa phong cách, chơi mượt mà qua nhiều thể loại, LYGN cảm nhận không khí và giữ sàn nhảy sôi động từ track đầu đến track cuối.",
    "folio.watch": "Xem video",
    "folio.book": "Đặt lịch",
    "contact.title": "LIÊN HỆ",
    "contact.lead":
      "DJ LYGN — hơn 10 năm trong ngành sự kiện, biểu diễn tại các lễ hội ngoài trời, club và bar về đêm. Nhận booking, sự kiện riêng tư và hợp tác. Liên hệ qua bất kỳ kênh nào bên dưới.",
    "contact.styles": "Phong cách",
    "contact.openProfile": "Mở trang",
    "page.back": "Về trang chủ",
    "page.title": "PORTFOLIO",
    "page.sub": "Set trực tiếp & khoảnh khắc nổi bật — chạm vào video để phát.",
    "page.hint": "Còn nhiều set khác, vui lòng liên hệ.",
  },
};
