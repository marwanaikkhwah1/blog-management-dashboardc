'use strict';

/* =========================================================
   BLOG MANAGEMENT DASHBOARD - FRONTEND PROTOTYPE
   HTML5 + CSS3 + JavaScript + localStorage/sessionStorage
   ========================================================= */

const STORAGE_KEY = 'blogDashboardDataV1';
const SESSION_KEY = 'blogDashboardSessionV1';
const LANGUAGE_KEY = 'blogDashboardLanguageV1';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const uid = (prefix = 'id') => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const today = () => new Date().toISOString().slice(0, 10);
const nowLabel = () => new Date().toLocaleString();
const safeText = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const translations = {
  en: {
    loginTitle: 'Blog Management Dashboard', loginSubtitle: 'Frontend internship prototype', username: 'Username', password: 'Password', role: 'Role', administrator: 'Administrator', author: 'Author', login: 'Login', demoAccounts: 'Demo accounts', language: 'Language', logout: 'Logout',
    overview: 'Dashboard Overview', overviewDesc: 'Quick operational summary of the blog.', posts: 'Posts Management', categories: 'Categories', tags: 'Tags', media: 'Media Library', comments: 'Comments', users: 'Authors / Users', pages: 'Pages', appearance: 'Appearance', ads: 'Advertisement Management', seo: 'SEO', analytics: 'Analytics', notifications: 'Notifications', settings: 'Settings', logs: 'System / Logs',
    recentPosts: 'Recent Posts', trafficViews: 'Traffic / Views', recentActivity: 'Recent Activity', addPost: 'Add New Post', searchPosts: 'Search posts...', allStatuses: 'All statuses', allCategories: 'All categories', title: 'Title', category: 'Category', status: 'Status', date: 'Date', views: 'Views', actions: 'Actions', authorCreateOnly: 'Author access is limited to creating a new post.',
    categoriesDesc: 'Manage category hierarchy and post counts.', addCategory: 'Add Category', name: 'Name', parentCategory: 'Parent Category', postCount: 'Post Count', tagsDesc: 'Manage post labels and popularity.', addTag: 'Add Tag', popularity: 'Popularity',
    mediaDesc: 'Manage prototype media records.', addMedia: 'Add Media', searchMedia: 'Search media...', allTypes: 'All types', commentsDesc: 'Review and moderate comments.', commenter: 'Commenter', post: 'Post', comment: 'Comment', usersDesc: 'Manage user records, roles and status.', addUser: 'Add User', pagesDesc: 'Manage page records from the dashboard.', addPage: 'Add Page',
    appearanceDesc: 'Configure prototype presentation settings.', siteTitle: 'Site Title', logoText: 'Logo Text', themeMode: 'Theme Mode', light: 'Light', dark: 'Dark', accentColor: 'Accent Color', homepageSections: 'Homepage Sections (prototype note)', saveChanges: 'Save Changes',
    adsDesc: 'Manage ads, dates, status and prototype performance.', addAd: 'Add Advertisement', type: 'Type', location: 'Location', startDate: 'Start Date', endDate: 'End Date', impressions: 'Impressions', clicks: 'Clicks',
    seoDesc: 'Manage frontend SEO metadata fields.', metaTitle: 'Meta Title', slug: 'URL / Slug', metaDescription: 'Meta Description', keywords: 'Keywords', featuredImage: 'Featured Image URL', openGraph: 'Open Graph Title', sitemap: 'Sitemap', robots: 'Robots', enabled: 'Enabled', disabled: 'Disabled',
    analyticsDesc: 'Prototype analytics calculated from sample data.', popularPosts: 'Popular Posts', trafficSources: 'Traffic Sources', deviceStats: 'Device Statistics', geographicStats: 'Geographic Statistics', notificationsDesc: 'Editorial and system events.', markAllRead: 'Mark All Read', settingsDesc: 'General prototype configuration.', blogName: 'Blog Name', adminEmail: 'Admin Email', postsPerPage: 'Posts Per Page', defaultPostStatus: 'Default Post Status', commentsDefault: 'Comments Default', securityMode: 'Security Demo Mode', roleBased: 'Role-based UI', logsDesc: 'Prototype login, user and admin activity records.', clearLogs: 'Clear Logs', time: 'Time', actor: 'Actor', action: 'Action', details: 'Details',
    totalPosts: 'Total Posts', publishedPosts: 'Published Posts', draftPosts: 'Draft Posts', pendingApproval: 'Pending Approval', totalViews: 'Total Views', totalComments: 'Total Comments', visitors: 'Visitors', pageViews: 'Page Views',
    edit: 'Edit', delete: 'Delete', approve: 'Approve', reject: 'Reject', reply: 'Reply', trash: 'Trash', restore: 'Restore', save: 'Save', cancel: 'Cancel', create: 'Create', noData: 'No data available.', confirmDelete: 'Are you sure you want to delete this item?', confirmClearLogs: 'Clear all logs?', saved: 'Changes saved.', created: 'Created successfully.', updated: 'Updated successfully.', deleted: 'Deleted successfully.',
    image: 'Image', video: 'Video', document: 'Document', email: 'Email', active: 'Active', inactive: 'Inactive', content: 'Content', scheduledDate: 'Scheduled Date', tagsLabel: 'Tags', postStatus: 'Post Status',
    loginError: 'Invalid username, password or role.', authorPostsHint: 'Author can create posts only. Administrative controls are hidden.', adminPostsHint: 'Administrator can manage the complete post workflow.'
  },
  fa: {
    loginTitle: 'داشبورد مدیریت بلاگ', loginSubtitle: 'نمونهٔ فرانت‌اند برای انترنشیپ', username: 'نام کاربری', password: 'رمز عبور', role: 'نقش', administrator: 'مدیر', author: 'نویسنده', login: 'ورود', demoAccounts: 'حساب‌های آزمایشی', language: 'زبان', logout: 'خروج',
    overview: 'نمای کلی داشبورد', overviewDesc: 'خلاصهٔ سریع وضعیت بلاگ.', posts: 'مدیریت پست‌ها', categories: 'دسته‌بندی‌ها', tags: 'تگ‌ها', media: 'کتابخانه رسانه', comments: 'دیدگاه‌ها', users: 'نویسندگان / کاربران', pages: 'صفحه‌ها', appearance: 'ظاهر', ads: 'مدیریت تبلیغات', seo: 'سئو', analytics: 'تحلیل‌ها', notifications: 'اعلان‌ها', settings: 'تنظیمات', logs: 'سیستم / لاگ‌ها',
    recentPosts: 'پست‌های اخیر', trafficViews: 'بازدید / ترافیک', recentActivity: 'فعالیت اخیر', addPost: 'افزودن پست جدید', searchPosts: 'جستجوی پست...', allStatuses: 'همه وضعیت‌ها', allCategories: 'همه دسته‌ها', title: 'عنوان', category: 'دسته', status: 'وضعیت', date: 'تاریخ', views: 'بازدید', actions: 'عملیات', authorCreateOnly: 'دسترسی نویسنده فقط برای ساخت پست جدید است.',
    categoriesDesc: 'مدیریت سلسله‌مراتب دسته‌ها و تعداد پست‌ها.', addCategory: 'افزودن دسته', name: 'نام', parentCategory: 'دستهٔ والد', postCount: 'تعداد پست', tagsDesc: 'مدیریت تگ‌ها و میزان استفاده.', addTag: 'افزودن تگ', popularity: 'محبوبیت',
    mediaDesc: 'مدیریت رکوردهای آزمایشی رسانه.', addMedia: 'افزودن رسانه', searchMedia: 'جستجوی رسانه...', allTypes: 'همه نوع‌ها', commentsDesc: 'بررسی و مدیریت دیدگاه‌ها.', commenter: 'نویسنده دیدگاه', post: 'پست', comment: 'دیدگاه', usersDesc: 'مدیریت کاربران، نقش‌ها و وضعیت.', addUser: 'افزودن کاربر', pagesDesc: 'مدیریت رکوردهای صفحه.', addPage: 'افزودن صفحه',
    appearanceDesc: 'تنظیم ظاهر نمونهٔ پروژه.', siteTitle: 'عنوان سایت', logoText: 'متن لوگو', themeMode: 'حالت نمایش', light: 'روشن', dark: 'تاریک', accentColor: 'رنگ اصلی', homepageSections: 'بخش‌های صفحه اصلی (یادداشت نمونه)', saveChanges: 'ذخیره تغییرات',
    adsDesc: 'مدیریت تبلیغات، تاریخ، وضعیت و آمار آزمایشی.', addAd: 'افزودن تبلیغ', type: 'نوع', location: 'موقعیت', startDate: 'تاریخ شروع', endDate: 'تاریخ پایان', impressions: 'نمایش‌ها', clicks: 'کلیک‌ها',
    seoDesc: 'مدیریت فیلدهای سئوی فرانت‌اند.', metaTitle: 'عنوان متا', slug: 'آدرس / اسلاگ', metaDescription: 'توضیح متا', keywords: 'کلیدواژه‌ها', featuredImage: 'لینک تصویر شاخص', openGraph: 'عنوان Open Graph', sitemap: 'نقشه سایت', robots: 'ربات‌ها', enabled: 'فعال', disabled: 'غیرفعال',
    analyticsDesc: 'تحلیل آزمایشی بر اساس داده‌های نمونه.', popularPosts: 'پست‌های محبوب', trafficSources: 'منابع ترافیک', deviceStats: 'آمار دستگاه‌ها', geographicStats: 'آمار جغرافیایی', notificationsDesc: 'رویدادهای محتوایی و سیستمی.', markAllRead: 'همه خوانده شد', settingsDesc: 'تنظیمات عمومی نمونهٔ پروژه.', blogName: 'نام بلاگ', adminEmail: 'ایمیل مدیر', postsPerPage: 'تعداد پست در صفحه', defaultPostStatus: 'وضعیت پیش‌فرض پست', commentsDefault: 'وضعیت پیش‌فرض دیدگاه', securityMode: 'حالت امنیت آزمایشی', roleBased: 'رابط مبتنی بر نقش', logsDesc: 'رکوردهای آزمایشی ورود و فعالیت.', clearLogs: 'پاک کردن لاگ‌ها', time: 'زمان', actor: 'انجام‌دهنده', action: 'عمل', details: 'جزئیات',
    totalPosts: 'کل پست‌ها', publishedPosts: 'پست‌های منتشرشده', draftPosts: 'پیش‌نویس‌ها', pendingApproval: 'در انتظار تایید', totalViews: 'کل بازدیدها', totalComments: 'کل دیدگاه‌ها', visitors: 'بازدیدکنندگان', pageViews: 'بازدید صفحات',
    edit: 'ویرایش', delete: 'حذف', approve: 'تایید', reject: 'رد', reply: 'پاسخ', trash: 'زباله‌دان', restore: 'بازیابی', save: 'ذخیره', cancel: 'لغو', create: 'ساخت', noData: 'داده‌ای موجود نیست.', confirmDelete: 'مطمئن هستید که این مورد حذف شود؟', confirmClearLogs: 'همه لاگ‌ها پاک شوند؟', saved: 'تغییرات ذخیره شد.', created: 'با موفقیت ساخته شد.', updated: 'با موفقیت ویرایش شد.', deleted: 'با موفقیت حذف شد.',
    image: 'تصویر', video: 'ویدیو', document: 'سند', email: 'ایمیل', active: 'فعال', inactive: 'غیرفعال', content: 'محتوا', scheduledDate: 'تاریخ زمان‌بندی', tagsLabel: 'تگ‌ها', postStatus: 'وضعیت پست',
    loginError: 'نام کاربری، رمز یا نقش نادرست است.', authorPostsHint: 'نویسنده فقط می‌تواند پست بسازد. کنترل‌های مدیریتی پنهان هستند.', adminPostsHint: 'مدیر می‌تواند تمام روند مدیریت پست را کنترل کند.'
  },
  ps: {
    loginTitle: 'د بلاګ مدیریت ډشبورډ', loginSubtitle: 'د انټرنشیپ لپاره فرنټ‌اېنډ نمونه', username: 'کارن نوم', password: 'پټنوم', role: 'رول', administrator: 'اډمین', author: 'لیکوال', login: 'ننوتل', demoAccounts: 'ازمایښتي حسابونه', language: 'ژبه', logout: 'وتل',
    overview: 'د ډشبورډ لنډیز', overviewDesc: 'د بلاګ چټک عملیاتي لنډیز.', posts: 'د پوسټونو مدیریت', categories: 'کټګورۍ', tags: 'ټګونه', media: 'میډیا کتابتون', comments: 'تبصرې', users: 'لیکوالان / کارنان', pages: 'پاڼې', appearance: 'بڼه', ads: 'د اعلانونو مدیریت', seo: 'SEO', analytics: 'شننې', notifications: 'خبرتیاوې', settings: 'تنظیمات', logs: 'سیسټم / لاګونه',
    recentPosts: 'وروستي پوسټونه', trafficViews: 'ټرافیک / کتنې', recentActivity: 'وروستی فعالیت', addPost: 'نوی پوسټ', searchPosts: 'پوسټ ولټوئ...', allStatuses: 'ټول حالتونه', allCategories: 'ټولې کټګورۍ', title: 'سرلیک', category: 'کټګوري', status: 'حالت', date: 'نېټه', views: 'کتنې', actions: 'کړنې', authorCreateOnly: 'لیکوال یوازې نوی پوسټ جوړولی شي.',
    categoriesDesc: 'د کټګوریو جوړښت او د پوسټ شمېر مدیریت.', addCategory: 'کټګوري زیاتول', name: 'نوم', parentCategory: 'اصلي کټګوري', postCount: 'د پوسټ شمېر', tagsDesc: 'د ټګونو او شهرت مدیریت.', addTag: 'ټګ زیاتول', popularity: 'شهرت',
    mediaDesc: 'د ازمایښتي میډیا ریکارډونو مدیریت.', addMedia: 'میډیا زیاتول', searchMedia: 'میډیا ولټوئ...', allTypes: 'ټول ډولونه', commentsDesc: 'تبصرې وګورئ او مدیریت یې کړئ.', commenter: 'تبصره کوونکی', post: 'پوسټ', comment: 'تبصره', usersDesc: 'کارنان، رولونه او حالت مدیریت.', addUser: 'کارن زیاتول', pagesDesc: 'د پاڼو ریکارډونه مدیریت.', addPage: 'پاڼه زیاتول',
    appearanceDesc: 'د پروټوټایپ بڼه تنظیم کړئ.', siteTitle: 'د سایټ سرلیک', logoText: 'د لوګو متن', themeMode: 'د بڼې حالت', light: 'روښانه', dark: 'تیاره', accentColor: 'اصلي رنګ', homepageSections: 'د کورپاڼې برخې (نمونه)', saveChanges: 'بدلونونه خوندي کړئ',
    adsDesc: 'اعلانونه، نېټې، حالت او ازمایښتي احصایه مدیریت.', addAd: 'اعلان زیاتول', type: 'ډول', location: 'ځای', startDate: 'د پیل نېټه', endDate: 'د پای نېټه', impressions: 'ښودنې', clicks: 'کلیکونه',
    seoDesc: 'د فرنټ‌اېنډ SEO فیلډونه مدیریت.', metaTitle: 'میټا سرلیک', slug: 'URL / Slug', metaDescription: 'میټا تشریح', keywords: 'کلیدي ټکي', featuredImage: 'د ځانګړي انځور URL', openGraph: 'Open Graph سرلیک', sitemap: 'Sitemap', robots: 'Robots', enabled: 'فعال', disabled: 'غیرفعال',
    analyticsDesc: 'د نمونې معلوماتو پر بنسټ ازمایښتي شننې.', popularPosts: 'مشهور پوسټونه', trafficSources: 'د ټرافیک سرچینې', deviceStats: 'د وسایلو احصایه', geographicStats: 'جغرافیایي احصایه', notificationsDesc: 'تحریري او سیسټمي خبرتیاوې.', markAllRead: 'ټول ولوستل شول', settingsDesc: 'عمومي ازمایښتي تنظیمات.', blogName: 'د بلاګ نوم', adminEmail: 'د اډمین ایمیل', postsPerPage: 'په پاڼه کې پوسټونه', defaultPostStatus: 'د پوسټ اصلي حالت', commentsDefault: 'د تبصرو اصلي حالت', securityMode: 'ازمایښتي امنیت', roleBased: 'د رول پر بنسټ UI', logsDesc: 'د ننوتلو او فعالیت ازمایښتي ریکارډونه.', clearLogs: 'لاګونه پاکول', time: 'وخت', actor: 'کاروونکی', action: 'کړنه', details: 'جزیات',
    totalPosts: 'ټول پوسټونه', publishedPosts: 'خپاره شوي پوسټونه', draftPosts: 'مسودې', pendingApproval: 'د تایید په تمه', totalViews: 'ټولې کتنې', totalComments: 'ټولې تبصرې', visitors: 'لیدونکي', pageViews: 'د پاڼو کتنې',
    edit: 'سمول', delete: 'ړنګول', approve: 'تایید', reject: 'رد', reply: 'ځواب', trash: 'کثافات', restore: 'بیا راګرځول', save: 'خوندي کول', cancel: 'لغوه', create: 'جوړول', noData: 'معلومات نشته.', confirmDelete: 'ایا دا توکی ړنګ شي؟', confirmClearLogs: 'ټول لاګونه پاک شي؟', saved: 'بدلونونه خوندي شول.', created: 'په بریالیتوب جوړ شو.', updated: 'په بریالیتوب سم شو.', deleted: 'په بریالیتوب ړنګ شو.',
    image: 'انځور', video: 'ویډیو', document: 'سند', email: 'ایمیل', active: 'فعال', inactive: 'غیرفعال', content: 'منځپانګه', scheduledDate: 'مهالوېش نېټه', tagsLabel: 'ټګونه', postStatus: 'د پوسټ حالت',
    loginError: 'کارن نوم، پټنوم یا رول ناسم دی.', authorPostsHint: 'لیکوال یوازې پوسټ جوړولی شي. اداري کنټرولونه پټ دي.', adminPostsHint: 'اډمین د پوسټونو بشپړ مدیریت کولی شي.'
  }
};

const demoUsers = {
  admin: { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' },
  author: { username: 'author', password: 'author123', role: 'author', name: 'Author' }
};

const defaultData = {
  posts: [
    { id: 'p1', title: 'Welcome to the Blog', category: 'General', tags: ['welcome'], status: 'Published', author: 'Administrator', date: '2026-10-01', scheduledDate: '', views: 420, content: 'Welcome post.' },
    { id: 'p2', title: 'Frontend Internship Update', category: 'Technology', tags: ['frontend','internship'], status: 'Pending Approval', author: 'Author', date: '2026-10-07', scheduledDate: '', views: 95, content: 'Internship update post.' },
    { id: 'p3', title: 'Responsive Design Checklist', category: 'Technology', tags: ['responsive'], status: 'Draft', author: 'Administrator', date: '2026-10-09', scheduledDate: '', views: 0, content: 'Draft article.' }
  ],
  categories: [
    { id: 'c1', name: 'General', parent: '' },
    { id: 'c2', name: 'Technology', parent: '' },
    { id: 'c3', name: 'Education', parent: '' }
  ],
  tags: [
    { id: 't1', name: 'welcome' },
    { id: 't2', name: 'frontend' },
    { id: 't3', name: 'internship' },
    { id: 't4', name: 'responsive' }
  ],
  media: [
    { id: 'm1', name: 'dashboard-cover.jpg', type: 'Image', url: '', createdDate: '2026-10-02' },
    { id: 'm2', name: 'project-document.pdf', type: 'Document', url: '', createdDate: '2026-10-08' }
  ],
  comments: [
    { id: 'cm1', author: 'Ahmad', postId: 'p1', text: 'Very useful article.', status: 'Approved', date: '2026-10-04' },
    { id: 'cm2', author: 'Sara', postId: 'p1', text: 'Thanks for sharing.', status: 'Pending', date: '2026-10-06' }
  ],
  users: [
    { id: 'u1', name: 'Administrator', email: 'admin@example.com', role: 'Administrator', status: 'Active' },
    { id: 'u2', name: 'Author', email: 'author@example.com', role: 'Author', status: 'Active' }
  ],
  pages: [
    { id: 'pg1', title: 'About', status: 'Published', date: '2026-09-20', content: 'About page prototype.' },
    { id: 'pg2', title: 'Contact', status: 'Draft', date: '2026-10-03', content: 'Contact page prototype.' }
  ],
  ads: [
    { id: 'ad1', name: 'Sidebar Promo', type: 'Sidebar Ad', location: 'Sidebar', status: 'Active', startDate: '2026-10-01', endDate: '2026-10-31', impressions: 1200, clicks: 87 }
  ],
  notifications: [
    { id: 'n1', type: 'Post Submitted', message: 'A post is waiting for approval.', read: false, date: '2026-10-07 10:15' },
    { id: 'n2', type: 'New Comment', message: 'A new comment was submitted.', read: false, date: '2026-10-06 15:20' }
  ],
  logs: [],
  appearance: { siteTitle: 'Blog Management Dashboard', logo: 'BM', theme: 'light', accent: '#5b5bd6', homepageSections: 'Hero, Latest Posts, Categories' },
  seo: { title: 'Blog Management Dashboard', slug: 'blog-dashboard', description: 'Frontend blog management dashboard prototype.', keywords: 'blog,dashboard,frontend', featuredImage: '', ogTitle: 'Blog Dashboard', sitemap: 'enabled', robots: 'index,follow' },
  settings: { blogName: 'My Blog', email: 'admin@example.com', postsPerPage: 10, defaultStatus: 'Draft', comments: 'enabled', security: 'role-based' },
  analytics: {
    traffic: [120, 180, 150, 240, 300, 260, 340],
    sources: { Direct: 38, Search: 34, Social: 18, Referral: 10 },
    devices: { Mobile: 54, Desktop: 34, Tablet: 12 },
    geography: { Afghanistan: 45, Germany: 18, 'United States': 14, Canada: 9, Other: 14 }
  }
};

let state = loadData();
let session = loadSession();
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
let currentSection = 'overview';
let currentModalSubmit = null;

/* ---------------- STORAGE ---------------- */
function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? mergeDefaults(stored, defaultData) : structuredClone(defaultData);
  } catch {
    return structuredClone(defaultData);
  }
}

function mergeDefaults(stored, defaults) {
  return {
    ...structuredClone(defaults),
    ...stored,
    appearance: { ...defaults.appearance, ...(stored.appearance || {}) },
    seo: { ...defaults.seo, ...(stored.seo || {}) },
    settings: { ...defaults.settings, ...(stored.settings || {}) },
    analytics: { ...defaults.analytics, ...(stored.analytics || {}) }
  };
}

function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
}
function saveSession(value) {
  session = value;
  if (value) sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  else sessionStorage.removeItem(SESSION_KEY);
}

/* ---------------- LANGUAGE ---------------- */
function t(key) { return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key; }

function setLanguage(lang) {
  currentLanguage = ['en','fa','ps'].includes(lang) ? lang : 'en';
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  const rtl = currentLanguage === 'fa' || currentLanguage === 'ps';
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  $('#languageSelect').value = currentLanguage;
  $('#loginLanguage').value = currentLanguage;

  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLanguage]?.[key]) el.textContent = t(key);
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[currentLanguage]?.[key]) el.placeholder = t(key);
  });

  updateStaticRoleText();
  if (session) {
    renderAll();
    navigate(currentSection, false);
  }
}

/* ---------------- AUTH ---------------- */
function handleLogin(event) {
  event.preventDefault();
  const username = $('#loginUsername').value.trim();
  const password = $('#loginPassword').value;
  const role = $('#loginRole').value;
  const account = demoUsers[role];

  if (!account || account.username !== username || account.password !== password) {
    $('#loginMessage').textContent = t('loginError');
    return;
  }

  saveSession({ role, username, name: account.name, loginAt: new Date().toISOString() });
  addLog('Login', account.name, 'Login', `${role} logged in.`);
  $('#loginMessage').textContent = '';
  showApp();
}

function logout() {
  if (session) addLog('Login', session.name, 'Logout', `${session.role} logged out.`);
  saveSession(null);
  $('#appView').classList.add('hidden');
  $('#loginView').classList.remove('hidden');
  $('#loginPassword').value = '';
  closeSidebar();
}

function showApp() {
  $('#loginView').classList.add('hidden');
  $('#appView').classList.remove('hidden');
  applyRoleVisibility();
  renderAll();
  navigate(session.role === 'author' ? 'posts' : 'overview');
}

function applyRoleVisibility() {
  const isAdmin = session?.role === 'admin';
  $$('.admin-only').forEach(el => el.classList.toggle('hidden', !isAdmin));
  $$('.admin-only-section').forEach(el => el.classList.toggle('role-hidden', !isAdmin));
  $('#postsTableWrap').classList.toggle('hidden', !isAdmin);
  $('#postAdminTools').classList.toggle('hidden', !isAdmin);
  $('#authorCreateOnlyNotice').classList.toggle('hidden', isAdmin);
  $('#sidebarRole').textContent = isAdmin ? t('administrator') : t('author');
  $('#roleBadge').textContent = isAdmin ? t('administrator') : t('author');
  $('#postsRoleHint').textContent = isAdmin ? t('adminPostsHint') : t('authorPostsHint');
}

function updateStaticRoleText() {
  if (!session) return;
  const isAdmin = session.role === 'admin';
  $('#sidebarRole').textContent = isAdmin ? t('administrator') : t('author');
  $('#roleBadge').textContent = isAdmin ? t('administrator') : t('author');
  $('#postsRoleHint').textContent = isAdmin ? t('adminPostsHint') : t('authorPostsHint');
}

/* ---------------- NAVIGATION ---------------- */
const sectionTitles = {
  overview: 'overview', posts: 'posts', categories: 'categories', tags: 'tags', media: 'media', comments: 'comments', users: 'users', pages: 'pages', appearance: 'appearance', ads: 'ads', seo: 'seo', analytics: 'analytics', notifications: 'notifications', settings: 'settings', logs: 'logs'
};

function navigate(section, close = true) {
  if (session?.role === 'author' && section !== 'posts') section = 'posts';
  currentSection = section;
  $$('.dashboard-section').forEach(el => el.classList.remove('active'));
  $(`#section-${section}`)?.classList.add('active');
  $$('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.section === section));
  $('#pageTitle').textContent = t(sectionTitles[section] || 'overview');
  $('#breadcrumb').textContent = `Dashboard / ${t(sectionTitles[section] || 'overview')}`;
  if (close) closeSidebar();
  renderSection(section);
}

function openSidebar() { $('#sidebar').classList.add('open'); $('#sidebarOverlay').classList.add('show'); }
function closeSidebar() { $('#sidebar').classList.remove('open'); $('#sidebarOverlay').classList.remove('show'); }

/* ---------------- LOGGING / NOTIFICATIONS ---------------- */
function addLog(type, actor, action, details) {
  state.logs.unshift({ id: uid('log'), type, actor, action, details, timestamp: nowLabel() });
  state.logs = state.logs.slice(0, 250);
  saveData();
}

function addNotification(type, message) {
  state.notifications.unshift({ id: uid('n'), type, message, read: false, date: nowLabel() });
  saveData();
  updateNotificationBadge();
}

function updateNotificationBadge() {
  const count = state.notifications.filter(n => !n.read).length;
  $('#notificationBadge').textContent = count;
  $('#notificationBadge').classList.toggle('hidden', count === 0);
}

/* ---------------- RENDER ALL ---------------- */
function renderAll() {
  applyAppearance();
  applyRoleVisibility();
  renderDashboard();
  renderPosts();
  renderCategories();
  renderTags();
  renderMedia();
  renderComments();
  renderUsers();
  renderPages();
  renderAds();
  renderAnalytics();
  renderNotifications();
  renderLogs();
  fillAppearanceForm();
  fillSeoForm();
  fillSettingsForm();
  updateNotificationBadge();
}

function renderSection(section) {
  const map = {
    overview: renderDashboard, posts: renderPosts, categories: renderCategories, tags: renderTags,
    media: renderMedia, comments: renderComments, users: renderUsers, pages: renderPages,
    appearance: fillAppearanceForm, ads: renderAds, seo: fillSeoForm, analytics: renderAnalytics,
    notifications: renderNotifications, settings: fillSettingsForm, logs: renderLogs
  };
  map[section]?.();
}

/* ---------------- DASHBOARD ---------------- */
function renderDashboard() {
  if (session?.role !== 'admin') return;
  const posts = state.posts;
  const comments = state.comments;
  const stats = [
    [t('totalPosts'), posts.length],
    [t('publishedPosts'), posts.filter(p => p.status === 'Published').length],
    [t('draftPosts'), posts.filter(p => p.status === 'Draft').length],
    [t('pendingApproval'), posts.filter(p => p.status === 'Pending Approval').length],
    [t('totalViews'), posts.reduce((sum,p) => sum + Number(p.views || 0), 0)],
    [t('totalComments'), comments.length]
  ];
  $('#statsGrid').innerHTML = stats.map(([label,value]) => `<article class="stat-card"><span class="label">${safeText(label)}</span><span class="value">${value}</span><span class="sub">Frontend prototype</span></article>`).join('');

  const recent = [...posts].sort((a,b) => b.date.localeCompare(a.date)).slice(0,5);
  $('#recentPostsList').innerHTML = recent.length ? recent.map(p => `<div class="list-item"><div><strong>${safeText(p.title)}</strong><small>${safeText(p.category)} · ${safeText(p.date)}</small></div><span class="status-badge ${statusClass(p.status)}">${safeText(p.status)}</span></div>`).join('') : emptyMessage();

  const traffic = state.analytics.traffic || [];
  const max = Math.max(...traffic, 1);
  const days = ['M','T','W','T','F','S','S'];
  $('#trafficChart').innerHTML = traffic.map((v,i) => `<div class="bar-group"><span class="bar-value">${v}</span><div class="bar" style="height:${Math.max(8, Math.round(v/max*190))}px"></div><span class="bar-label">${days[i] || i+1}</span></div>`).join('');

  const activity = state.logs.slice(0,8);
  $('#recentActivityList').innerHTML = activity.length ? activity.map(log => `<div class="list-item"><div><strong>${safeText(log.action)}</strong><small>${safeText(log.actor)} · ${safeText(log.timestamp)}</small></div><small>${safeText(log.type)}</small></div>`).join('') : emptyMessage();
}

/* ---------------- POSTS ---------------- */
function renderPosts() {
  populateCategoryOptions();
  if (session?.role !== 'admin') return;
  const search = $('#postSearch').value.trim().toLowerCase();
  const status = $('#postStatusFilter').value;
  const category = $('#postCategoryFilter').value;
  const rows = state.posts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search) || p.author.toLowerCase().includes(search);
    const matchStatus = status === 'all' || p.status === status;
    const matchCategory = category === 'all' || p.category === category;
    return matchSearch && matchStatus && matchCategory;
  });
  $('#postsTableBody').innerHTML = rows.length ? rows.map(p => `
    <tr>
      <td><strong>${safeText(p.title)}</strong></td>
      <td>${safeText(p.category)}</td>
      <td><span class="status-badge ${statusClass(p.status)}">${safeText(p.status)}</span></td>
      <td>${safeText(p.author)}</td>
      <td>${safeText(p.date)}</td>
      <td>${Number(p.views || 0)}</td>
      <td><div class="actions">
        <button class="btn secondary small" data-action="edit-post" data-id="${p.id}">${t('edit')}</button>
        ${p.status === 'Pending Approval' ? `<button class="btn secondary small" data-action="approve-post" data-id="${p.id}">${t('approve')}</button><button class="btn danger-outline small" data-action="reject-post" data-id="${p.id}">${t('reject')}</button>` : ''}
        ${p.status === 'Trash' ? `<button class="btn secondary small" data-action="restore-post" data-id="${p.id}">${t('restore')}</button>` : `<button class="btn danger-outline small" data-action="trash-post" data-id="${p.id}">${t('trash')}</button>`}
        <button class="btn danger-outline small" data-action="delete-post" data-id="${p.id}">${t('delete')}</button>
      </div></td>
    </tr>`).join('') : `<tr><td colspan="7">${t('noData')}</td></tr>`;
}

function openPostModal(post = null) {
  const isAuthor = session.role === 'author';
  const editable = post && !isAuthor;
  openModal(post ? t('edit') + ' ' + t('post') : t('addPost'), `
    <label><span>${t('title')}</span><input name="title" required value="${safeText(post?.title || '')}"></label>
    <label><span>${t('category')}</span><select name="category" required>${state.categories.map(c => `<option ${post?.category===c.name?'selected':''}>${safeText(c.name)}</option>`).join('')}</select></label>
    <label><span>${t('tagsLabel')}</span><input name="tags" value="${safeText((post?.tags || []).join(', '))}" placeholder="frontend, blog"></label>
    <label><span>${t('postStatus')}</span><select name="status" ${isAuthor ? 'disabled' : ''}>${['Draft','Published','Scheduled','Pending Approval','Rejected','Trash'].map(s => `<option ${post?.status===s?'selected':''}>${s}</option>`).join('')}</select></label>
    <label><span>${t('date')}</span><input name="date" type="date" value="${safeText(post?.date || today())}" required></label>
    <label><span>${t('scheduledDate')}</span><input name="scheduledDate" type="date" value="${safeText(post?.scheduledDate || '')}"></label>
    <label class="full-span"><span>${t('content')}</span><textarea name="content" rows="6" required>${safeText(post?.content || '')}</textarea></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${post ? t('save') : t('create')}</button></div>
  `, formData => {
    if (isAuthor) {
      state.posts.unshift({ id: uid('p'), title: formData.title, category: formData.category, tags: parseTags(formData.tags), status: 'Pending Approval', author: session.name, date: formData.date, scheduledDate: '', views: 0, content: formData.content });
      addNotification('Post Submitted', `${session.name} submitted “${formData.title}”.`);
      addLog('Post Activity', session.name, 'Create Post', formData.title);
      saveData();
      toast(t('created'));
      closeModal();
      return;
    }

    if (editable) {
      Object.assign(post, { title: formData.title, category: formData.category, tags: parseTags(formData.tags), status: formData.status, date: formData.date, scheduledDate: formData.scheduledDate, content: formData.content });
      addLog('Post Activity', session.name, 'Edit Post', post.title);
      toast(t('updated'));
    } else {
      state.posts.unshift({ id: uid('p'), title: formData.title, category: formData.category, tags: parseTags(formData.tags), status: formData.status, author: session.name, date: formData.date, scheduledDate: formData.scheduledDate, views: 0, content: formData.content });
      addLog('Post Activity', session.name, 'Create Post', formData.title);
      toast(t('created'));
    }
    syncTagsFromPosts();
    saveData();
    closeModal();
    renderAll();
  });
}

function parseTags(value) { return String(value || '').split(',').map(v => v.trim()).filter(Boolean); }

/* ---------------- CATEGORIES ---------------- */
function renderCategories() {
  if (!$('#categoriesTableBody')) return;
  $('#categoriesTableBody').innerHTML = state.categories.length ? state.categories.map(c => {
    const count = state.posts.filter(p => p.category === c.name).length;
    return `<tr><td>${safeText(c.name)}</td><td>${safeText(c.parent || '—')}</td><td>${count}</td><td><div class="actions"><button class="btn secondary small" data-action="edit-category" data-id="${c.id}">${t('edit')}</button><button class="btn danger-outline small" data-action="delete-category" data-id="${c.id}">${t('delete')}</button></div></td></tr>`;
  }).join('') : `<tr><td colspan="4">${t('noData')}</td></tr>`;
}

function openCategoryModal(category = null) {
  openModal(category ? t('edit') + ' ' + t('category') : t('addCategory'), `
    <label><span>${t('name')}</span><input name="name" required value="${safeText(category?.name || '')}"></label>
    <label><span>${t('parentCategory')}</span><select name="parent"><option value="">—</option>${state.categories.filter(c=>c.id!==category?.id).map(c=>`<option value="${safeText(c.name)}" ${category?.parent===c.name?'selected':''}>${safeText(c.name)}</option>`).join('')}</select></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>
  `, data => {
    const duplicate = state.categories.some(c => c.name.toLowerCase() === data.name.trim().toLowerCase() && c.id !== category?.id);
    if (duplicate) return toast('Category name already exists.', true);
    if (category) {
      const oldName = category.name;
      category.name = data.name.trim(); category.parent = data.parent;
      state.posts.forEach(p => { if (p.category === oldName) p.category = category.name; });
      addLog('Admin Action', session.name, 'Edit Category', category.name);
    } else {
      state.categories.push({ id: uid('c'), name: data.name.trim(), parent: data.parent });
      addLog('Admin Action', session.name, 'Add Category', data.name.trim());
    }
    saveData(); closeModal(); renderAll(); toast(category ? t('updated') : t('created'));
  });
}

/* ---------------- TAGS ---------------- */
function syncTagsFromPosts() {
  const set = new Set(state.tags.map(t => t.name));
  state.posts.flatMap(p => p.tags || []).forEach(name => {
    if (!set.has(name)) { state.tags.push({ id: uid('t'), name }); set.add(name); }
  });
}

function renderTags() {
  $('#tagsTableBody').innerHTML = state.tags.length ? state.tags.map(tag => {
    const count = state.posts.filter(p => (p.tags || []).includes(tag.name)).length;
    const popularity = count >= 3 ? 'High' : count >= 1 ? 'Medium' : 'Low';
    return `<tr><td>#${safeText(tag.name)}</td><td>${count}</td><td>${popularity}</td><td><div class="actions"><button class="btn secondary small" data-action="edit-tag" data-id="${tag.id}">${t('edit')}</button><button class="btn danger-outline small" data-action="delete-tag" data-id="${tag.id}">${t('delete')}</button></div></td></tr>`;
  }).join('') : `<tr><td colspan="4">${t('noData')}</td></tr>`;
}

function openTagModal(tag = null) {
  openModal(tag ? t('edit') + ' ' + t('tagsLabel') : t('addTag'), `
    <label class="full-span"><span>${t('name')}</span><input name="name" required value="${safeText(tag?.name || '')}"></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>
  `, data => {
    const newName = data.name.trim();
    if (tag) {
      const oldName = tag.name; tag.name = newName;
      state.posts.forEach(p => p.tags = (p.tags || []).map(x => x === oldName ? newName : x));
      addLog('Admin Action', session.name, 'Edit Tag', newName);
    } else {
      state.tags.push({ id: uid('t'), name: newName });
      addLog('Admin Action', session.name, 'Add Tag', newName);
    }
    saveData(); closeModal(); renderAll(); toast(tag ? t('updated') : t('created'));
  });
}

/* ---------------- MEDIA ---------------- */
function renderMedia() {
  const search = $('#mediaSearch').value.trim().toLowerCase();
  const type = $('#mediaTypeFilter').value;
  const items = state.media.filter(m => (!search || m.name.toLowerCase().includes(search)) && (type === 'all' || m.type === type));
  $('#mediaGrid').innerHTML = items.length ? items.map(m => `
    <article class="media-card">
      <div class="media-preview">${m.type === 'Image' && m.url ? `<img src="${safeText(m.url)}" alt="${safeText(m.name)}" onerror="this.replaceWith(document.createTextNode('🖼'))">` : m.type === 'Image' ? '🖼' : m.type === 'Video' ? '🎬' : '📄'}</div>
      <div class="media-body"><h4>${safeText(m.name)}</h4><small>${safeText(m.type)} · ${safeText(m.createdDate)}</small><div class="media-actions"><button class="btn danger-outline small" data-action="delete-media" data-id="${m.id}">${t('delete')}</button></div></div>
    </article>`).join('') : `<div class="notice">${t('noData')}</div>`;
}

function openMediaModal() {
  openModal(t('addMedia'), `
    <label><span>${t('name')}</span><input name="name" required></label>
    <label><span>${t('type')}</span><select name="type"><option>Image</option><option>Video</option><option>Document</option></select></label>
    <label class="full-span"><span>URL (optional)</span><input name="url" type="url" placeholder="https://..."></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>
  `, data => {
    state.media.unshift({ id: uid('m'), name: data.name.trim(), type: data.type, url: data.url.trim(), createdDate: today() });
    addLog('Admin Action', session.name, 'Add Media', data.name.trim());
    saveData(); closeModal(); renderMedia(); toast(t('created'));
  });
}

/* ---------------- COMMENTS ---------------- */
function renderComments() {
  const filter = $('#commentStatusFilter').value;
  const rows = state.comments.filter(c => filter === 'all' || c.status === filter);
  $('#commentsTableBody').innerHTML = rows.length ? rows.map(c => {
    const post = state.posts.find(p => p.id === c.postId);
    return `<tr><td>${safeText(c.author)}</td><td>${safeText(post?.title || '—')}</td><td>${safeText(c.text)}</td><td><span class="status-badge ${statusClass(c.status)}">${safeText(c.status)}</span></td><td>${safeText(c.date)}</td><td><div class="actions"><button class="btn secondary small" data-action="comment-status" data-status="Approved" data-id="${c.id}">${t('approve')}</button><button class="btn secondary small" data-action="comment-status" data-status="Spam" data-id="${c.id}">Spam</button><button class="btn secondary small" data-action="reply-comment" data-id="${c.id}">${t('reply')}</button><button class="btn danger-outline small" data-action="comment-status" data-status="Trash" data-id="${c.id}">${t('trash')}</button><button class="btn danger-outline small" data-action="delete-comment" data-id="${c.id}">${t('delete')}</button></div></td></tr>`;
  }).join('') : `<tr><td colspan="6">${t('noData')}</td></tr>`;
}

function replyToComment(comment) {
  openModal(t('reply'), `<label class="full-span"><span>${t('comment')}</span><textarea name="reply" rows="4" required></textarea></label><div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>`, data => {
    addLog('Admin Action', session.name, 'Reply Comment', `${comment.author}: ${data.reply}`);
    addNotification('Comment Reply', `Reply recorded for ${comment.author}.`);
    closeModal(); toast(t('saved'));
  });
}

/* ---------------- USERS ---------------- */
function renderUsers() {
  $('#usersTableBody').innerHTML = state.users.length ? state.users.map(u => `<tr><td>${safeText(u.name)}</td><td>${safeText(u.email)}</td><td>${safeText(u.role)}</td><td><span class="status-badge ${statusClass(u.status)}">${safeText(u.status)}</span></td><td><div class="actions"><button class="btn secondary small" data-action="edit-user" data-id="${u.id}">${t('edit')}</button><button class="btn danger-outline small" data-action="delete-user" data-id="${u.id}">${t('delete')}</button></div></td></tr>`).join('') : `<tr><td colspan="5">${t('noData')}</td></tr>`;
}

function openUserModal(user = null) {
  openModal(user ? t('edit') + ' ' + t('users') : t('addUser'), `
    <label><span>${t('name')}</span><input name="name" required value="${safeText(user?.name || '')}"></label>
    <label><span>Email</span><input name="email" type="email" required value="${safeText(user?.email || '')}"></label>
    <label><span>${t('role')}</span><select name="role"><option ${user?.role==='Administrator'?'selected':''}>Administrator</option><option ${user?.role==='Author'?'selected':''}>Author</option><option ${user?.role==='Editor'?'selected':''}>Editor</option></select></label>
    <label><span>${t('status')}</span><select name="status"><option ${user?.status==='Active'?'selected':''}>Active</option><option ${user?.status==='Inactive'?'selected':''}>Inactive</option></select></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>
  `, data => {
    if (user) Object.assign(user, data); else state.users.push({ id: uid('u'), ...data });
    addLog('Admin Action', session.name, user ? 'Edit User' : 'Add User', data.email);
    saveData(); closeModal(); renderUsers(); toast(user ? t('updated') : t('created'));
  });
}

/* ---------------- PAGES ---------------- */
function renderPages() {
  $('#pagesTableBody').innerHTML = state.pages.length ? state.pages.map(p => `<tr><td>${safeText(p.title)}</td><td><span class="status-badge ${statusClass(p.status)}">${safeText(p.status)}</span></td><td>${safeText(p.date)}</td><td><div class="actions"><button class="btn secondary small" data-action="edit-page" data-id="${p.id}">${t('edit')}</button><button class="btn danger-outline small" data-action="delete-page" data-id="${p.id}">${t('delete')}</button></div></td></tr>`).join('') : `<tr><td colspan="4">${t('noData')}</td></tr>`;
}

function openPageModal(page = null) {
  openModal(page ? t('edit') + ' ' + t('pages') : t('addPage'), `
    <label><span>${t('title')}</span><input name="title" required value="${safeText(page?.title || '')}"></label>
    <label><span>${t('status')}</span><select name="status"><option ${page?.status==='Draft'?'selected':''}>Draft</option><option ${page?.status==='Published'?'selected':''}>Published</option><option ${page?.status==='Trash'?'selected':''}>Trash</option></select></label>
    <label><span>${t('date')}</span><input name="date" type="date" value="${safeText(page?.date || today())}"></label>
    <label class="full-span"><span>${t('content')}</span><textarea name="content" rows="5">${safeText(page?.content || '')}</textarea></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>
  `, data => {
    if (page) Object.assign(page, data); else state.pages.unshift({ id: uid('pg'), ...data });
    addLog('Admin Action', session.name, page ? 'Edit Page' : 'Add Page', data.title);
    saveData(); closeModal(); renderPages(); toast(page ? t('updated') : t('created'));
  });
}

/* ---------------- APPEARANCE ---------------- */
function applyAppearance() {
  const a = state.appearance;
  document.body.classList.toggle('dark', a.theme === 'dark');
  document.documentElement.style.setProperty('--primary', a.accent || '#5b5bd6');
  $$('.brand-mark').forEach(el => el.textContent = a.logo || 'BM');
  document.title = a.siteTitle || 'Blog Management Dashboard';
}
function fillAppearanceForm() {
  const a = state.appearance;
  $('#appearanceSiteTitle').value = a.siteTitle || '';
  $('#appearanceLogo').value = a.logo || '';
  $('#appearanceTheme').value = a.theme || 'light';
  $('#appearanceAccent').value = a.accent || '#5b5bd6';
  $('#appearanceSections').value = a.homepageSections || '';
}
function saveAppearance(event) {
  event.preventDefault();
  state.appearance = { siteTitle: $('#appearanceSiteTitle').value.trim(), logo: $('#appearanceLogo').value.trim() || 'BM', theme: $('#appearanceTheme').value, accent: $('#appearanceAccent').value, homepageSections: $('#appearanceSections').value.trim() };
  addLog('Admin Action', session.name, 'Update Appearance', state.appearance.siteTitle);
  saveData(); applyAppearance(); toast(t('saved'));
}

/* ---------------- ADS ---------------- */
function renderAds() {
  $('#adsTableBody').innerHTML = state.ads.length ? state.ads.map(ad => `<tr><td>${safeText(ad.name)}</td><td>${safeText(ad.type)}</td><td>${safeText(ad.location)}</td><td><span class="status-badge ${statusClass(ad.status)}">${safeText(ad.status)}</span></td><td>${safeText(ad.startDate)}</td><td>${safeText(ad.endDate)}</td><td>${Number(ad.impressions||0)}</td><td>${Number(ad.clicks||0)}</td><td><div class="actions"><button class="btn secondary small" data-action="edit-ad" data-id="${ad.id}">${t('edit')}</button><button class="btn danger-outline small" data-action="delete-ad" data-id="${ad.id}">${t('delete')}</button></div></td></tr>`).join('') : `<tr><td colspan="9">${t('noData')}</td></tr>`;
}

function openAdModal(ad = null) {
  openModal(ad ? t('edit') + ' ' + t('ads') : t('addAd'), `
    <label><span>${t('name')}</span><input name="name" required value="${safeText(ad?.name||'')}"></label>
    <label><span>${t('type')}</span><select name="type">${['Banner Ad','Sidebar Ad','In-article Ad','Video Ad'].map(x=>`<option ${ad?.type===x?'selected':''}>${x}</option>`).join('')}</select></label>
    <label><span>${t('location')}</span><input name="location" required value="${safeText(ad?.location||'')}"></label>
    <label><span>${t('status')}</span><select name="status"><option ${ad?.status==='Active'?'selected':''}>Active</option><option ${ad?.status==='Inactive'?'selected':''}>Inactive</option></select></label>
    <label><span>${t('startDate')}</span><input name="startDate" type="date" value="${safeText(ad?.startDate||today())}"></label>
    <label><span>${t('endDate')}</span><input name="endDate" type="date" value="${safeText(ad?.endDate||today())}"></label>
    <label><span>${t('impressions')}</span><input name="impressions" type="number" min="0" value="${Number(ad?.impressions||0)}"></label>
    <label><span>${t('clicks')}</span><input name="clicks" type="number" min="0" value="${Number(ad?.clicks||0)}"></label>
    <div class="form-actions full-span"><button type="button" class="btn secondary" data-close-modal>${t('cancel')}</button><button class="btn primary" type="submit">${t('save')}</button></div>
  `, data => {
    data.impressions = Number(data.impressions||0); data.clicks = Number(data.clicks||0);
    if (ad) Object.assign(ad,data); else state.ads.unshift({id:uid('ad'),...data});
    addLog('Admin Action', session.name, ad ? 'Edit Advertisement' : 'Add Advertisement', data.name);
    saveData(); closeModal(); renderAds(); toast(ad ? t('updated') : t('created'));
  });
}

/* ---------------- SEO ---------------- */
function fillSeoForm() {
  const s = state.seo;
  $('#seoTitle').value = s.title || ''; $('#seoSlug').value = s.slug || ''; $('#seoDescription').value = s.description || ''; $('#seoKeywords').value = s.keywords || ''; $('#seoFeaturedImage').value = s.featuredImage || ''; $('#seoOgTitle').value = s.ogTitle || ''; $('#seoSitemap').value = s.sitemap || 'enabled'; $('#seoRobots').value = s.robots || 'index,follow';
}
function saveSeo(event) {
  event.preventDefault();
  state.seo = { title: $('#seoTitle').value.trim(), slug: $('#seoSlug').value.trim(), description: $('#seoDescription').value.trim(), keywords: $('#seoKeywords').value.trim(), featuredImage: $('#seoFeaturedImage').value.trim(), ogTitle: $('#seoOgTitle').value.trim(), sitemap: $('#seoSitemap').value, robots: $('#seoRobots').value };
  addLog('Admin Action', session.name, 'Update SEO', state.seo.title);
  saveData(); toast(t('saved'));
}

/* ---------------- ANALYTICS ---------------- */
function renderAnalytics() {
  const views = state.posts.reduce((s,p)=>s+Number(p.views||0),0);
  const visitors = Math.round(views * 0.72);
  const popular = [...state.posts].sort((a,b)=>Number(b.views||0)-Number(a.views||0)).slice(0,5);
  $('#analyticsCards').innerHTML = [[t('pageViews'),views],[t('visitors'),visitors],[t('totalPosts'),state.posts.length],[t('totalComments'),state.comments.length]].map(([label,value])=>`<article class="stat-card"><span class="label">${safeText(label)}</span><span class="value">${value}</span><span class="sub">Prototype</span></article>`).join('');
  $('#popularPostsList').innerHTML = popular.length ? popular.map(p=>`<div class="list-item"><div><strong>${safeText(p.title)}</strong><small>${safeText(p.status)}</small></div><strong>${Number(p.views||0)}</strong></div>`).join('') : emptyMessage();
  renderProgressList('#trafficSourcesList', state.analytics.sources);
  renderProgressList('#deviceStatsList', state.analytics.devices);
  renderProgressList('#geoStatsList', state.analytics.geography);
}
function renderProgressList(selector, obj={}) {
  $(selector).innerHTML = Object.entries(obj).map(([label,val])=>`<div class="progress-row"><div class="progress-meta"><span>${safeText(label)}</span><strong>${val}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,Number(val)||0)}%"></div></div></div>`).join('');
}

/* ---------------- NOTIFICATIONS ---------------- */
function renderNotifications() {
  $('#notificationsList').innerHTML = state.notifications.length ? state.notifications.map(n=>`<article class="notification-item ${n.read?'read':'unread'}" data-id="${n.id}"><span class="notification-dot"></span><div class="notification-content"><p><strong>${safeText(n.type)}</strong> — ${safeText(n.message)}</p><small>${safeText(n.date)}</small></div><button class="btn secondary small" data-action="toggle-notification" data-id="${n.id}">${n.read?'Unread':'Read'}</button><button class="btn danger-outline small" data-action="delete-notification" data-id="${n.id}">${t('delete')}</button></article>`).join('') : `<div class="notice">${t('noData')}</div>`;
  updateNotificationBadge();
}

/* ---------------- SETTINGS ---------------- */
function fillSettingsForm() {
  const s = state.settings;
  $('#settingsBlogName').value = s.blogName || ''; $('#settingsEmail').value = s.email || ''; $('#settingsPostsPerPage').value = s.postsPerPage || 10; $('#settingsDefaultStatus').value = s.defaultStatus || 'Draft'; $('#settingsComments').value = s.comments || 'enabled'; $('#settingsSecurity').value = s.security || 'role-based';
}
function saveSettings(event) {
  event.preventDefault();
  state.settings = { blogName: $('#settingsBlogName').value.trim(), email: $('#settingsEmail').value.trim(), postsPerPage: Number($('#settingsPostsPerPage').value||10), defaultStatus: $('#settingsDefaultStatus').value, comments: $('#settingsComments').value, security: $('#settingsSecurity').value };
  addLog('Admin Action', session.name, 'Update Settings', state.settings.blogName);
  saveData(); toast(t('saved'));
}

/* ---------------- LOGS ---------------- */
function renderLogs() {
  const filter = $('#logTypeFilter').value;
  const logs = state.logs.filter(l => filter === 'all' || l.type === filter);
  $('#logsTableBody').innerHTML = logs.length ? logs.map(l=>`<tr><td>${safeText(l.timestamp)}</td><td>${safeText(l.type)}</td><td>${safeText(l.actor)}</td><td>${safeText(l.action)}</td><td>${safeText(l.details)}</td></tr>`).join('') : `<tr><td colspan="5">${t('noData')}</td></tr>`;
}

/* ---------------- MODAL ---------------- */
function openModal(title, html, onSubmit) {
  $('#modalTitle').textContent = title;
  $('#modalForm').innerHTML = html;
  currentModalSubmit = onSubmit;
  $('#modal').classList.add('open');
  $('#modal').setAttribute('aria-hidden','false');
  $('#modalForm input, #modalForm select, #modalForm textarea')?.focus();
}
function closeModal() {
  $('#modal').classList.remove('open');
  $('#modal').setAttribute('aria-hidden','true');
  $('#modalForm').innerHTML = '';
  currentModalSubmit = null;
}
function submitModal(event) {
  event.preventDefault();
  if (!currentModalSubmit) return;
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  currentModalSubmit(data);
}

/* ---------------- HELPERS ---------------- */
function statusClass(status='') { return `status-${String(status).replaceAll(' ','-')}`; }
function emptyMessage() { return `<div class="notice">${t('noData')}</div>`; }
function toast(message, error = false) {
  const el = document.createElement('div');
  el.className = `toast${error?' error':''}`;
  el.textContent = message;
  $('#toastContainer').appendChild(el);
  setTimeout(()=>el.remove(), 2800);
}
function populateCategoryOptions() {
  const filter = $('#postCategoryFilter');
  const current = filter.value;
  filter.innerHTML = `<option value="all">${t('allCategories')}</option>` + state.categories.map(c=>`<option value="${safeText(c.name)}">${safeText(c.name)}</option>`).join('');
  filter.value = [...filter.options].some(o=>o.value===current) ? current : 'all';
}
function confirmDelete() { return window.confirm(t('confirmDelete')); }

/* ---------------- ACTION ROUTER ---------------- */
function handleActionClick(event) {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (session?.role !== 'admin' && action !== 'toggle-notification') return;

  const post = state.posts.find(x=>x.id===id);
  const category = state.categories.find(x=>x.id===id);
  const tag = state.tags.find(x=>x.id===id);
  const media = state.media.find(x=>x.id===id);
  const comment = state.comments.find(x=>x.id===id);
  const user = state.users.find(x=>x.id===id);
  const page = state.pages.find(x=>x.id===id);
  const ad = state.ads.find(x=>x.id===id);
  const notification = state.notifications.find(x=>x.id===id);

  switch(action) {
    case 'edit-post': if(post) openPostModal(post); break;
    case 'approve-post': if(post){ post.status='Published'; addLog('Post Activity',session.name,'Approve Post',post.title); addNotification('Post Approved',`“${post.title}” was approved.`); saveData(); renderAll(); } break;
    case 'reject-post': if(post){ post.status='Rejected'; addLog('Post Activity',session.name,'Reject Post',post.title); addNotification('Post Rejected',`“${post.title}” was rejected.`); saveData(); renderAll(); } break;
    case 'trash-post': if(post){ post.status='Trash'; addLog('Post Activity',session.name,'Trash Post',post.title); saveData(); renderAll(); } break;
    case 'restore-post': if(post){ post.status='Draft'; addLog('Post Activity',session.name,'Restore Post',post.title); saveData(); renderAll(); } break;
    case 'delete-post': if(post && confirmDelete()){ state.posts=state.posts.filter(x=>x.id!==id); addLog('Post Activity',session.name,'Delete Post',post.title); saveData(); renderAll(); toast(t('deleted')); } break;

    case 'edit-category': if(category) openCategoryModal(category); break;
    case 'delete-category': if(category && confirmDelete()){
      if(state.posts.some(p=>p.category===category.name)) return toast('Move posts to another category before deleting.',true);
      state.categories=state.categories.filter(x=>x.id!==id); addLog('Admin Action',session.name,'Delete Category',category.name); saveData(); renderAll(); toast(t('deleted')); }
      break;

    case 'edit-tag': if(tag) openTagModal(tag); break;
    case 'delete-tag': if(tag && confirmDelete()){ state.tags=state.tags.filter(x=>x.id!==id); state.posts.forEach(p=>p.tags=(p.tags||[]).filter(x=>x!==tag.name)); addLog('Admin Action',session.name,'Delete Tag',tag.name); saveData(); renderAll(); toast(t('deleted')); } break;

    case 'delete-media': if(media && confirmDelete()){ state.media=state.media.filter(x=>x.id!==id); addLog('Admin Action',session.name,'Delete Media',media.name); saveData(); renderMedia(); toast(t('deleted')); } break;

    case 'comment-status': if(comment){ comment.status=btn.dataset.status; addLog('Admin Action',session.name,'Update Comment',`${comment.author} → ${comment.status}`); saveData(); renderComments(); } break;
    case 'reply-comment': if(comment) replyToComment(comment); break;
    case 'delete-comment': if(comment && confirmDelete()){ state.comments=state.comments.filter(x=>x.id!==id); addLog('Admin Action',session.name,'Delete Comment',comment.author); saveData(); renderAll(); toast(t('deleted')); } break;

    case 'edit-user': if(user) openUserModal(user); break;
    case 'delete-user': if(user && confirmDelete()){ state.users=state.users.filter(x=>x.id!==id); addLog('Admin Action',session.name,'Delete User',user.email); saveData(); renderUsers(); toast(t('deleted')); } break;

    case 'edit-page': if(page) openPageModal(page); break;
    case 'delete-page': if(page && confirmDelete()){ state.pages=state.pages.filter(x=>x.id!==id); addLog('Admin Action',session.name,'Delete Page',page.title); saveData(); renderPages(); toast(t('deleted')); } break;

    case 'edit-ad': if(ad) openAdModal(ad); break;
    case 'delete-ad': if(ad && confirmDelete()){ state.ads=state.ads.filter(x=>x.id!==id); addLog('Admin Action',session.name,'Delete Advertisement',ad.name); saveData(); renderAds(); toast(t('deleted')); } break;

    case 'toggle-notification': if(notification){ notification.read=!notification.read; saveData(); renderNotifications(); } break;
    case 'delete-notification': if(notification && confirmDelete()){ state.notifications=state.notifications.filter(x=>x.id!==id); saveData(); renderNotifications(); } break;
  }
}

/* ---------------- EVENT LISTENERS ---------------- */
function bindEvents() {
  $('#loginForm').addEventListener('submit', handleLogin);
  $('#loginLanguage').addEventListener('change', e => setLanguage(e.target.value));
  $('#languageSelect').addEventListener('change', e => setLanguage(e.target.value));
  $('#logoutBtn').addEventListener('click', logout);
  $('#sidebarLogout').addEventListener('click', logout);
  $('#menuBtn').addEventListener('click', openSidebar);
  $('#sidebarOverlay').addEventListener('click', closeSidebar);
  $('#sidebarNav').addEventListener('click', e => {
    const btn = e.target.closest('[data-section]');
    if (btn) navigate(btn.dataset.section);
  });

  $('#addPostBtn').addEventListener('click', () => openPostModal());
  $('#postSearch').addEventListener('input', renderPosts);
  $('#postStatusFilter').addEventListener('change', renderPosts);
  $('#postCategoryFilter').addEventListener('change', renderPosts);

  $('#addCategoryBtn').addEventListener('click', () => openCategoryModal());
  $('#addTagBtn').addEventListener('click', () => openTagModal());
  $('#addMediaBtn').addEventListener('click', openMediaModal);
  $('#mediaSearch').addEventListener('input', renderMedia);
  $('#mediaTypeFilter').addEventListener('change', renderMedia);
  $('#commentStatusFilter').addEventListener('change', renderComments);
  $('#addUserBtn').addEventListener('click', () => openUserModal());
  $('#addPageBtn').addEventListener('click', () => openPageModal());
  $('#appearanceForm').addEventListener('submit', saveAppearance);
  $('#addAdBtn').addEventListener('click', () => openAdModal());
  $('#seoForm').addEventListener('submit', saveSeo);
  $('#settingsForm').addEventListener('submit', saveSettings);
  $('#logTypeFilter').addEventListener('change', renderLogs);
  $('#markAllNotificationsBtn').addEventListener('click', () => { state.notifications.forEach(n=>n.read=true); saveData(); renderNotifications(); });
  $('#clearLogsBtn').addEventListener('click', () => { if (confirm(t('confirmClearLogs'))) { state.logs=[]; saveData(); renderLogs(); } });

  document.addEventListener('click', handleActionClick);
  document.addEventListener('click', e => { if (e.target.closest('[data-close-modal]')) closeModal(); });
  $('#modalForm').addEventListener('submit', submitModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeSidebar(); } });
}

/* ---------------- INIT ---------------- */
function init() {
  bindEvents();
  setLanguage(currentLanguage);
  if (session) showApp();
  else { $('#loginView').classList.remove('hidden'); $('#appView').classList.add('hidden'); }
}

init();
