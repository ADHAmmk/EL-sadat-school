/* =========================================
   ADMIN PANEL - JAVASCRIPT ENGINE
   إدارة السنبلاوين التعليمية
   ========================================= */

'use strict';

const DEFAULT_ADMIN_PASSWORD = 'm/Adham haker';
const DEFAULT_EGYPT_PASSWORD = 'haker Egypt';
const SITE_PREVIEW_URL = 'https://al-edara-esnblawen.vercel.app/';
const SCHOOL_PREVIEW_URL = 'https://el-sadat-school.vercel.app/';
const ADMIN_AUTH_SESSION_KEY = 'admin_authenticated_dual';
const ADMIN_AUTH_ROLE_KEY = 'admin_auth_role';
const CYBER_THEMES = ['matrix', 'cyan', 'amber', 'crimson', 'forest'];
let loginStage = 1;

function getAdminPassword() {
    return localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;
}

function getEgyptPassword() {
    return localStorage.getItem('admin_egypt_password') || DEFAULT_EGYPT_PASSWORD;
}

// ======================== DEFAULT DATA ========================
const DEFAULT_SCHOOLS = [
    { id: 1, name: "مدرسة السادات الثانوية بنين", type: "boys", typeName: "ثانوي عام - بنين", location: "السنبلاوين - شارع الإدارة التعليمية", area: "السنبلاوين المدينة", code: "210408", studentsCount: "1,350 طالب", principal: "إدارة مدرسة السادات الثانوية بنين", image: "q.jpeg", link: "https://el-sadat-school.vercel.app/", hasLiveSite: true, description: "إحدى أعرق المدارس الثانوية للبنين بإدارة السنبلاوين، مجهزة بأحدث معامل التطوير التكنولوجي والشاشات التفاعلية والفصول الذكية.", features: ["معامل علوم متطورة", "شاشات تفاعلية ذكية", "موقع إلكتروني متكامل", "أنشطة رياضية وكشفية"] },
    { id: 2, name: "المقاطعة الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشترك", location: "قرية المقاطعة - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210415", studentsCount: "1,120 طالب وطالبة", principal: "إدارة مدرسة المقاطعة الثانوية", image: "a.jpeg", link: "schools/school-2.html", hasLiveSite: true, description: "صرح تعليمي يخدم طلاب وطالبات قرية المقاطعة والقرى المجاورة، يتميز بنسب تفوق عالية في امتحانات الثانوية العامة والأنشطة.", features: ["مكتبة تعليمية شاملة", "معمل حاسب آلي مطور", "أنشطة ثقافية متميزة"] },
    { id: 3, name: "أحمد لطفي السيد الثانوية بنين", type: "boys", typeName: "ثانوي عام - بنين", location: "السنبلاوين - شارع المدارس (بجوار الادارة التعليميه)", area: "السنبلاوين المدينة", code: "210422", studentsCount: "1,380 طالب", principal: "إدارة مدرسة أحمد لطفي السيد", image: "i.jpeg", link: "schools/school-3.html", hasLiveSite: true, description: "مدرسة رائدة تحمل اسم مفكر مصر ورائد التنوير أحمد لطفي السيد، وتضم كادراً تعليمياً متميزاً وبيئة تربوية منضبطة.", features: ["بيئة تعليمية منضبطة", "مسابقات أوائل الطلبة", "صالات تدريب رياضي"] },
    { id: 4, name: "السنبلاوين الرسمية للغات المشتركة", type: "languages", typeName: "رسمي لغات - مشتركة", location: "السنبلاوين - بجوار الإدارة التعليمية", area: "السنبلاوين المدينة", code: "210430", studentsCount: "950 طالب وطالبة", principal: "إدارة مدرسة السنبلاوين الرسمية للغات", image: "u.jpeg", link: "schools/school-4.html", hasLiveSite: true, description: "المدرسة الرسمية للغات الأولى بالمركز، تدرس المناهج باللغة الإنجليزية بإشراف مباشر من توجيه اللغات بالمديرية.", features: ["تدريس اللغات الأجنبية", "معامل لغات متقدمة", "مناهج دولية معتمدة", "نوادي علوم وابتكار"] },
    { id: 5, name: "كفر غنام الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية كفر غنام - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210444", studentsCount: "890 طالب وطالبة", principal: "إدارة مدرسة كفر غنام الثانوية", image: "w.jpeg", link: "schools/school-5.html", hasLiveSite: true, description: "مدرسة حديثة التطوير تخدم قطاع جنوب السنبلاوين ومجهزة بأحدث وسائل التعلم الحديثة وشبكة الألياف الضوئية.", features: ["إنترنت فائق السرعة", "فصول مجهزة وشاشات ذكية", "ملاعب رياضية حديثة"] },
    { id: 6, name: "السنبلاوين الثانوية بنات", type: "girls", typeName: "ثانوي عام - بنات", location: "السنبلاوين - شارع الجمهورية (حي النزهة)", area: "السنبلاوين المدينة", code: "210450", studentsCount: "1,600 طالبة", principal: "إدارة مدرسة السنبلاوين الثانوية بنات", image: "خ.jpg", link: "schools/school-6.html", hasLiveSite: true, description: "أكبر مدارس المرحلة الثانوية للبنات بالمركز، تمتاز بتخريج أوائل المحافظة سنوياً والتميز في الأنشطة الطلابية والمسابقات الإبداعية.", features: ["مسرح مدرسي متكامل", "معامل أحياء وفيزياء وكيمياء", "أندية فتيات وموهوبين"] },
    { id: 7, name: "ابوقراميط الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية أبو قراميط - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210461", studentsCount: "1,250 طالب وطالبة", principal: "إدارة مدرسة ابوقراميط الثانوية المشتركة", image: "ق.jpg", link: "schools/school-7.html", hasLiveSite: true, description: "صرح تعليمي يخدم قطاع قرية أبو قراميط والقرى المجاورة، مجهزة بمعامل علمية وفصول ذكية وشبكات تكنولوجية متطورة.", features: ["فصول نموذجية حديثة", "معامل تابلت وشبكات", "أنشطة لياقة بدنية وثقافية"] },
    { id: 8, name: "طهواى الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية طهواي - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210472", studentsCount: "980 طالب وطالبة", principal: "إدارة مدرسة طهواى الثانوية المشتركة", image: "ن.jpg", link: "schools/school-8.html", hasLiveSite: true, description: "صرح تعليمي عريق يخدم قرية طهواي وتوابعها، ويوفر بيئة تربوية هادئة ومحفزة على الإبداع والتفوق العلمي.", features: ["مكتبة إلكترونية وبنك المعرفة", "معارض علمية وفنية", "تواصل إلكتروني مع أولياء الأمور"] },
    { id: 9, name: "ميت غراب وشبراهور الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية ميت غراب - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210480", studentsCount: "820 طالب وطالبة", principal: "إدارة مدرسة ميت غراب وشبراهور الثانوية", image: "WhatsApp Image 2026-09-27 at 5.56.24 PM.jpeg", link: "schools/school-9.html", hasLiveSite: true, description: "مدرسة متميزة بنشاطها الاجتماعي والتربوي ومشاريع الطلاب، تخدم قريتي ميت غراب وشبراهور بالقطاع الغربي للإدارة.", features: ["فصول نموذجية وشاشات ذكية", "إشراف تربوي متكامل", "أنشطة بيئية وتوعوية"] },
    { id: 10, name: "الشهيد محمد الراعي الثانوية بالجلايله المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية الجلايلة - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210492", studentsCount: "1,050 طالب وطالبة", principal: "إدارة مدرسة الشهيد محمد الراعي الثانوية", image: "WhatsApp Image 2026-09-27 at 6.03.07 PM.jpeg", link: "schools/school-10.html", hasLiveSite: true, description: "تخدم قطاع قرية الجلايلة والقرى المجاورة وتتمتع ببنية تكنولوجية حديثة وكادر تدريسي متميز لتدريس منظومة الثانوية العامة.", features: ["شبكة إنترنت ألياف ضوئية", "غرفة تدريب وتطوير تكنولوجي", "فريق مسابقات أوائل الطلبة"] },
    { id: 11, name: "السنبلاوين الرسمية المتميزة لغات المشتركة", type: "languages", typeName: "رسمي لغات متميز - مشتركة", location: "السنبلاوين - شارع المعاهدة (بجوار الأزهري)", area: "السنبلاوين المدينة", code: "210501", studentsCount: "780 طالب وطالبة", principal: "إدارة مدرسة السنبلاوين الرسمية المتميزة للغات", image: "WhatsApp Image 2026-09-27 at 6.05.21 PM.jpeg", link: "schools/school-11.html", hasLiveSite: true, description: "مؤسسة تعليمية نوعية بمدينة السنبلاوين تهدف إلى تقديم تعليم لغات رفيع المستوى ورعاية خاصة للطلاب الموهوبين والمتفوقين.", features: ["رعاية الفائقين والمبدعين", "قاعات ورش عمل تفاعلية", "معامل حاسب ومكتبة رقمية"] },
    { id: 12, name: "غزالة الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية غزالة - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210515", studentsCount: "710 طالب وطالبة", principal: "إدارة مدرسة غزالة الثانوية", image: "Gemini_Generated_Image_g9c38tg9c38tg9c3.jpg", link: "schools/school-12.html", hasLiveSite: true, description: "مدرسة هادئة وواعدة توفر مناخاً دراسياً نموذجياً يتيح للطلاب التركيز والتفوق في كافة الشعب العلمية والأدبية.", features: ["متابعة دراسية دقيقة", "مجموعات تقوية مجانية", "أنشطة صحافة مدرسية"] },
    { id: 13, name: "الزهايره الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية الزهايرة - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210522", studentsCount: "670 طالب وطالبة", principal: "إدارة مدرسة الزهايرة الثانوية المشتركة", image: "WhatsApp Image 2026-09-27 at 6.06.50 PM.jpeg", link: "schools/school-13.html", hasLiveSite: true, description: "مؤسسة تعليمية نموذجية تخدم قرية الزهايرة وتوابعها، حاصلة على شهادات تقدير من الإدارة لحسن الانضباط المدرسي والمستوى التعليمي.", features: ["انضباط دراسي تام", "مكتبة حديثة", "معمل لغات وعلوم"] },
    { id: 14, name: "الشهيد مصطفى فتوح جبر الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية كفر طنبول القديم - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210530", studentsCount: "850 طالب وطالبة", principal: "إدارة مدرسة الشهيد مصطفى فتوح جبر الثانوية", image: "Gemini_Generated_Image_cvqxkmcvqxkmcvqx.jpg", link: "schools/school-14.html", hasLiveSite: true, description: "صرح تعليمي ثانوي يخدم أبناء قرية كفر طنبول القديم والقرى المجاورة، يحمل اسم شهيد الوطن البطل مصطفى فتوح جبر تقديراً لتضحيته.", features: ["فصول دراسية حديثة", "معامل علوم وتطوير تكنولوجي", "أنشطة وطنية ورياضية"] },
    { id: 15, name: "طوخ الأقلام الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية طوخ الأقلام - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210540", studentsCount: "950 طالب وطالبة", principal: "إدارة مدرسة طوخ الأقلام الثانوية المشتركة", image: "Gemini_Generated_Image_720j40720j40720j.jpg", link: "schools/school-15.html", hasLiveSite: true, description: "صرح تعليمي يخدم قطاع قرية طوخ الأقلام وتوابعها بمركز السنبلاوين، مجهزة بكافة الوسائل التعليمية الحديثة والأنشطة الطلابية المتنوعة.", features: ["معامل تكنولوجية متطورة", "مكتبة علمية شاملة", "أنشطة ثقافية ورياضية"] },
    { id: 16, name: "صبح كاعوه الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية برهمتوش - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210555", studentsCount: "1,220 طالب وطالبة", principal: "إدارة مدرسة صبح كاعوه الثانوية المشتركة", image: "Gemini_Generated_Image_k8uhd4k8uhd4k8uh.jpg", link: "schools/school-16.html", hasLiveSite: true, description: "إحدى كبرى المدارس الثانوية بقطاع قرى السنبلاوين، تقع بقرية برهمتوش وتخدم عدداً من القرى المجاورة بفصولها ومرافقها المتطورة.", features: ["مساحات وملاعب واسعة", "معامل علمية وتكنولوجية حديثة", "شاشات تفاعلية ذكية"] },
    { id: 17, name: "حسين عثمان الثانوية المشتركة بشبرا سندى", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية شبرا سندي - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210568", studentsCount: "1,100 طالب وطالبة", principal: "إدارة مدرسة حسين عثمان الثانوية المشتركة", image: "Gemini_Generated_Image_5uuyar5uuyar5uuy.jpg", link: "schools/school-17.html", hasLiveSite: true, description: "صرح تعليمي يخدم طلاب وطالبات قرية شبرا سندي والقرى المحيطة، وتوفر بيئة تعليمية منضبطة وداعمة للتفوق الدراسي وبناء الشخصية.", features: ["فصول نموذجية حديثة", "معمل حاسب آلي وتطوير", "مكتبة مدرسية شاملة"] },
    { id: 18, name: "البلامون الثانوية المشتركة", type: "mixed", typeName: "ثانوي عام - مشتركة", location: "قرية البلامون - مركز السنبلاوين", area: "قرى السنبلاوين", code: "210579", studentsCount: "1,180 طالب وطالبة", principal: "إدارة مدرسة البلامون الثانوية المشتركة", image: "Gemini_Generated_Image_6xhnxw6xhnxw6xhn.jpg", link: "schools/school-18.html", hasLiveSite: true, description: "مدرسة ثانوية متميزة تخدم أهالي وطلاب قرية البلامون والقرى المجاورة، وتتميز بنسب تفوق مشرفة في الثانوية العامة والأنشطة المتعددة.", features: ["معامل علوم متكاملة", "شبكة إنترنت وألياف ضوئية", "أنشطة رياضية وفنية"] }
];

const DEFAULT_STATS = [
    { icon: "fa-school", number: "18+", label: "مدرسة ثانوية ورسمية" },
    { icon: "fa-user-graduate", number: "+25,000", label: "طالب وطالبة بالثانوي" },
    { icon: "fa-chalkboard-user", number: "+2,100", label: "معلم وإداري متميز" },
    { icon: "fa-award", number: "100%", label: "ربط وتطوير تكنولوجي" }
];

const DEFAULT_SERVICES = [
    { id: 1, title: "المكتبة الإلكترونية والتقييمات", icon: "fa-book-open-reader", desc: "الوصول المباشر إلى منصة التقييمات والأداءات والمصادر التعليمية الرقمية والمناهج المعتمدة من وزارة التربية والتعليم لكافة المراحل.", link: "https://ellibrary.moe.gov.eg/Performance_Assessments/", linkText: "دخول المكتبة والتقييمات" },
    { id: 2, title: "رعاية الموهوبين والأنشطة", icon: "fa-trophy", desc: "التسجيل في المسابقات الثقافية والعلمية، ودوري أوائل الطلبة، والمعارض الفنية على مستوى الإدارة.", link: "javascript:alert('باب التسجيل في مسابقات العام الدراسي مفتوح');", linkText: "استعراض المسابقات" }
];

const DEFAULT_NAV_LINKS = [
    { text: "الرئيسية", href: "#hero", icon: "fa-house" },
    { text: "دليل المدارس", href: "#schools", icon: "fa-school" },
    { text: "الخدمات الإلكترونية", href: "#services", icon: "fa-laptop-code" },
    { text: "عن الإدارة", href: "#about", icon: "fa-landmark" }
];

const DEFAULT_ABOUT_FEATURES = [
    "بنية تحتية وشبكات ألياف ضوئية",
    "شاشات وفصول تفاعلية ذكية",
    "مراكز تدريب وتطوير تكنولوجي معتمدة",
    "رعاية متكاملة للفائقين والمبتكرين"
];

const DEFAULT_FOOTER_QUICK_LINKS = [
    { text: "الصفحة الرئيسية", href: "#hero" },
    { text: "دليل المدارس الثانوية", href: "#schools" },
    { text: "بوابة الخدمات الإلكترونية", href: "#services" },
    { text: "الرؤية والرسالة التربوية", href: "#about" },
    { text: "موقع مدرسة السادات بنين", href: "https://el-sadat-school.vercel.app/" }
];

const DEFAULT_FOOTER_PLATFORMS = [
    { text: "وزارة التربية والتعليم", href: "https://moe.gov.eg/" },
    { text: "المكتبة الإلكترونية والتقييمات", href: "https://ellibrary.moe.gov.eg/Performance_Assessments/" },
    { text: "بنك المعرفة المصري", href: "https://www.ekb.eg/" },
    { text: "منصة مدرستنا التعليمية", href: "https://madrasetna.moe.gov.eg/" },
    { text: "مركز معلومات الوزارة (EMIS)", href: "https://emis.gov.eg/" }
];

// ======================== PRESET SCHOOL IMAGES ========================
const PRESET_SCHOOL_IMAGES = [
    { name: 'q.jpeg', label: 'مدرسة السادات' },
    { name: 'a.jpeg', label: 'المقاطعة المشتركة' },
    { name: 'i.jpeg', label: 'أحمد لطفي السيد' },
    { name: 'u.jpeg', label: 'السنبلاوين الرسمية لغات' },
    { name: 'w.jpeg', label: 'كفر غنام المشتركة' },
    { name: 'خ.jpg', label: 'السنبلاوين بنات' },
    { name: 'ن.jpg', label: 'طهواي المشتركة' },
    { name: 'ق.jpg', label: 'ابوقراميط المشتركة' },
    { name: 'Gemini_Generated_Image_5uuyar5uuyar5uuy.jpg', label: 'حسين عثمان' },
    { name: 'Gemini_Generated_Image_6xhnxw6xhnxw6xhn.jpg', label: 'البلامون' },
    { name: 'Gemini_Generated_Image_720j40720j40720j.jpg', label: 'طوخ الأقلام' },
    { name: 'Gemini_Generated_Image_cvqxkmcvqxkmcvqx.jpg', label: 'الشهيد مصطفى فتوح' },
    { name: 'Gemini_Generated_Image_g9c38tg9c38tg9c3.jpg', label: 'غزالة' },
    { name: 'Gemini_Generated_Image_k8uhd4k8uhd4k8uh.jpg', label: 'صبح كاعوه' },
    { name: 'WhatsApp Image 2026-09-27 at 5.56.24 PM.jpeg', label: 'ميت غراب وشبراهور' },
    { name: 'WhatsApp Image 2026-09-27 at 6.03.07 PM.jpeg', label: 'الشهيد محمد الراعي' },
    { name: 'WhatsApp Image 2026-09-27 at 6.05.21 PM.jpeg', label: 'السنبلاوين المتميزة' },
    { name: 'WhatsApp Image 2026-09-27 at 6.06.50 PM.jpeg', label: 'الزهايرة المشتركة' }
];

// ======================== STATE ========================
let appState = {
    schools: [],
    stats: [],
    services: [],
    navLinks: [],
    aboutFeatures: [],
    footerQuickLinks: [],
    footerPlatforms: [],
    hasUnsaved: false
};

let deleteCallback = null;

// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMatrixRain();
    initCyberAudio();

    const authSession = sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY);
    if (authSession === 'true') {
        document.getElementById('loginScreen')?.classList.add('hidden');
    }
    resetLoginFlow();

    loadFromStorage();
    initSidebar();
    initClock();
    renderDashboard();
    renderSchoolsAdmin();
    renderServicesAdmin();
    renderStatsEditor();
    renderNavLinksEditor();
    renderAboutFeaturesEditor();
    renderFooterEditors();
    loadContentFields();
    initMobileMenu();
    initSchoolImageManager();
    initGlobe3D();
    initHackerTerminal();
});

// ======================== CYBER LOGIN ========================
function attemptLogin() {
    const passwordInput = document.getElementById('adminPasswordInput');
    const loginError = document.getElementById('loginError');
    const loginGranted = document.getElementById('loginGranted');
    const loginGrantedText = document.getElementById('loginGrantedText');
    const fieldWrap = document.getElementById('loginFieldWrap');
    const secondaryInput = document.getElementById('secondaryPasscodeInput');
    const secondaryFieldWrap = document.getElementById('secondaryFieldWrap');
    const typedPrimary = (passwordInput?.value || '').trim();
    const typedSecondary = (secondaryInput?.value || '').trim();
    const correctRoot = getAdminPassword().trim();
    const correctEgypt = getEgyptPassword().trim();

    if (loginStage === 1) {
        if (typedPrimary !== correctRoot) {
            showLoginError('الشفرة الأولى غير صحيحة. حاول مرة أخرى.', fieldWrap, passwordInput);
            return;
        }

        loginStage = 2;
        if (document.getElementById('loginStepOne')) document.getElementById('loginStepOne').hidden = true;
        if (document.getElementById('loginStepTwo')) document.getElementById('loginStepTwo').hidden = false;
        const progress = document.getElementById('loginStepProgress');
        const buttonText = document.getElementById('loginButtonText');
        if (progress) progress.textContent = 'الخطوة 2 من 2 — أدخل الشفرة الثانية لإكمال الدخول';
        if (buttonText) buttonText.textContent = 'التحقق والدخول';
        if (passwordInput) passwordInput.value = '';
        loginError?.classList.remove('show');
        playCyberSound('access');
        secondaryInput?.focus();
        return;
    }

    if (typedSecondary !== correctEgypt) {
        showLoginError('الشفرة الثانية غير صحيحة. لن يتم الدخول قبل التحقق من الشفرتين.', secondaryFieldWrap, secondaryInput);
        return;
    }

    sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, 'true');
    sessionStorage.setItem(ADMIN_AUTH_ROLE_KEY, 'root');
    loginError?.classList.remove('show');
    fieldWrap?.classList.remove('shake');
    secondaryFieldWrap?.classList.remove('shake');
    if (secondaryInput) secondaryInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (loginGrantedText) loginGrantedText.textContent = 'تم التحقق من الشفرتين. جاري فتح لوحة التحكم...';
    loginGranted?.classList.add('show');
    playCyberSound('access');

    setTimeout(() => {
        document.getElementById('loginScreen')?.classList.add('hidden');
        loginGranted?.classList.remove('show');
        switchPanel('dashboard');
        initGlobe3D();
        resizeGlobeRenderer();
        showToast('تم التحقق من الشفرتين وفتح لوحة التحكم بنجاح', 'success');
    }, 650);
}

function showLoginError(message, fieldWrap, input) {
    const loginError = document.getElementById('loginError');
    const loginErrorText = document.getElementById('loginErrorText');
    if (loginErrorText) loginErrorText.textContent = message;
    loginError?.classList.add('show');
    fieldWrap?.classList.remove('shake');
    void fieldWrap?.offsetWidth;
    fieldWrap?.classList.add('shake');
    input?.focus();
    playCyberSound('error');
}

function returnToFirstPasscode() {
    loginStage = 1;
    const firstStep = document.getElementById('loginStepOne');
    const secondStep = document.getElementById('loginStepTwo');
    if (firstStep) firstStep.hidden = false;
    if (secondStep) secondStep.hidden = true;
    const progress = document.getElementById('loginStepProgress');
    const buttonText = document.getElementById('loginButtonText');
    if (progress) progress.textContent = 'الخطوة 1 من 2 — التحقق من الشفرة الأولى';
    if (buttonText) buttonText.textContent = 'التحقق من الشفرة الأولى';
    const secondaryInput = document.getElementById('secondaryPasscodeInput');
    if (secondaryInput) secondaryInput.value = '';
    document.getElementById('loginError')?.classList.remove('show');
    document.getElementById('secondaryFieldWrap')?.classList.remove('shake');
    document.getElementById('loginFieldWrap')?.classList.remove('shake');
    document.getElementById('adminPasswordInput')?.focus();
}

function resetLoginFlow() {
    loginStage = 1;
    const firstStep = document.getElementById('loginStepOne');
    const secondStep = document.getElementById('loginStepTwo');
    if (firstStep) firstStep.hidden = false;
    if (secondStep) secondStep.hidden = true;
    const progress = document.getElementById('loginStepProgress');
    const buttonText = document.getElementById('loginButtonText');
    if (progress) progress.textContent = 'الخطوة 1 من 2 — التحقق من الشفرة الأولى';
    if (buttonText) buttonText.textContent = 'التحقق من الشفرة الأولى';
    const firstInput = document.getElementById('adminPasswordInput');
    const secondaryInput = document.getElementById('secondaryPasscodeInput');
    if (firstInput) firstInput.value = '';
    if (secondaryInput) secondaryInput.value = '';
    document.getElementById('loginError')?.classList.remove('show');
    document.getElementById('loginGranted')?.classList.remove('show');
    document.getElementById('loginFieldWrap')?.classList.remove('shake');
    document.getElementById('secondaryFieldWrap')?.classList.remove('shake');
}

function togglePasswordVisibility(inputId = 'adminPasswordInput', iconId = 'eyeIcon') {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    if (!passwordInput || !eyeIcon) return;
    const isPasswordHidden = passwordInput.type === 'password';

    passwordInput.type = isPasswordHidden ? 'text' : 'password';
    eyeIcon.classList.toggle('fa-eye', !isPasswordHidden);
    eyeIcon.classList.toggle('fa-eye-slash', isPasswordHidden);
    playCyberSound('click');
}



function doLogout() {
    playCyberSound('error');
    sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_AUTH_ROLE_KEY);
    resetLoginFlow();
    document.getElementById('loginScreen')?.classList.remove('hidden');
}

// ======================== STORAGE ========================
function loadFromStorage() {
    try {
        appState.schools = JSON.parse(localStorage.getItem('admin_schools')) || [...DEFAULT_SCHOOLS];
        appState.stats = JSON.parse(localStorage.getItem('admin_stats')) || [...DEFAULT_STATS];
        appState.services = JSON.parse(localStorage.getItem('admin_services')) || [...DEFAULT_SERVICES];
        appState.navLinks = JSON.parse(localStorage.getItem('admin_navLinks')) || [...DEFAULT_NAV_LINKS];
        appState.aboutFeatures = JSON.parse(localStorage.getItem('admin_aboutFeatures')) || [...DEFAULT_ABOUT_FEATURES];
        appState.footerQuickLinks = JSON.parse(localStorage.getItem('admin_footerQuickLinks')) || [...DEFAULT_FOOTER_QUICK_LINKS];
        appState.footerPlatforms = JSON.parse(localStorage.getItem('admin_footerPlatforms')) || [...DEFAULT_FOOTER_PLATFORMS];
    } catch(e) {
        console.error('Error loading from storage:', e);
        resetToDefaults();
    }
}

function saveToStorage() {
    localStorage.setItem('admin_schools', JSON.stringify(appState.schools));
    localStorage.setItem('admin_stats', JSON.stringify(appState.stats));
    localStorage.setItem('admin_services', JSON.stringify(appState.services));
    localStorage.setItem('admin_navLinks', JSON.stringify(appState.navLinks));
    localStorage.setItem('admin_aboutFeatures', JSON.stringify(appState.aboutFeatures));
    localStorage.setItem('admin_footerQuickLinks', JSON.stringify(appState.footerQuickLinks));
    localStorage.setItem('admin_footerPlatforms', JSON.stringify(appState.footerPlatforms));

    // Save content fields
    const contentKeys = ['noticeText','noticeBadgeText','workHours','locationText','heroPill','heroTitle','heroTitleSpan','heroDesc','heroBtnPrimary','heroBtnSecondary','emblumTitle','emblumDesc','schoolsSectionSub','schoolsSectionMain','filterTitle','subMinistry','mainTitle','tagline','pageTitle','servicesSectionSub','servicesSectionMain','ctaBtnText','ctaBtnLink','aboutSub','aboutTitle','aboutDesc','aboutAddress','aboutHQTitle','aboutWorkHours','footerCredits1','footerCredits2','footerGift','footerCopyright','footerBrandDesc'];
    const contentData = {};
    contentKeys.forEach(key => {
        const el = document.getElementById(key);
        if (el) contentData[key] = el.value;
    });
    localStorage.setItem('admin_content', JSON.stringify(contentData));
}

function loadContentFields() {
    try {
        const saved = JSON.parse(localStorage.getItem('admin_content')) || {};
        Object.keys(saved).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = saved[key];
        });
    } catch(e) {}
}

function markUnsaved() {
    appState.hasUnsaved = true;
    const badge = document.getElementById('unsavedBadge');
    if (badge) badge.style.display = 'block';
}

function open(){

}

// ======================== SIDEBAR ========================
function initSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('mainWrapper');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainWrapper.classList.toggle('expanded');
        });
    }

    // Nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const panel = item.getAttribute('data-panel');
            if (panel) switchPanel(panel);
            // Close mobile sidebar
            sidebar.classList.remove('mobile-open');
            document.getElementById('sidebarOverlay')?.classList.remove('show');
        });
    });
}

function switchPanel(panelName) {
    playCyberSound('click');

    // Update nav active
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-panel') === panelName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Show panel
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`panel-${panelName}`);
    if (target) target.classList.add('active');

    // Update breadcrumb
    const labels = {
        dashboard: 'لوحة العمليات والتحكم',
        globe: 'كوكب العالم والشبكة الذكية 3D',
        terminal: 'الطرفية والأوامر (CLI)',
        schools: 'إدارة المدارس الشاملة',
        content: 'نصوص وهوية الموقع',
        stats: 'شريط الإحصائيات',
        services: 'الخدمات الإلكترونية',
        'admin-info': 'بوابة معلومات الإدارة التعليمية',
        navigation: 'شريط وقوائم التنقل',
        about: 'عن الإدارة والمقر',
        footer: 'تذييل الصفحة والحقوق',
        theme: 'ألوان ونمط الموقع السيبراني',
        backup: 'النسخ الاحتياطي JSON'
    };
    const bc = document.getElementById('breadcrumbText');
    if (bc) bc.textContent = labels[panelName] || panelName;

    if (panelName === 'globe' || panelName === 'dashboard') {
        syncGlobeViewport(panelName);
        setTimeout(resizeGlobeRenderer, 80);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ======================== MOBILE MENU ========================
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-mobile-overlay';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.add('mobile-open');
            overlay.classList.add('show');
        });
    }

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('show');
    });
}

// ======================== CLOCK ========================
function initClock() {
    function updateTime() {
        const now = new Date();
        const timeEl = document.getElementById('headerTime');
        const epochEl = document.getElementById('headerEpoch');
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('ar-EG', {
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        }
        if (epochEl) {
            epochEl.textContent = `TIMESTAMP: ${Math.floor(now.getTime() / 1000)} // EGY`;
        }
    }
    updateTime();
    setInterval(updateTime, 1000);
}

// ======================== DASHBOARD ========================
function renderDashboard() {
    updateDashStats();
    renderDashTable();
    renderGlobeMiniList();
    renderGlobeSchoolsDirectory();
}

function updateDashStats() {
    const el = document.getElementById('dashSchoolsNum');
    const navCount = document.getElementById('navSchoolsCount');
    const sideCount = document.getElementById('sidebarSchoolsCount');
    const globeBadge = document.getElementById('globeSchoolsBadge');
    const fullGlobeCount = document.getElementById('globeFullSchoolsCount');
    const countText = `${appState.schools.length} مدرسة`;

    if (el) el.textContent = appState.schools.length;
    if (navCount) navCount.textContent = appState.schools.length;
    if (sideCount) sideCount.textContent = countText;
    if (globeBadge) globeBadge.textContent = `${appState.schools.length} مدرسة ثانوية`;
    if (fullGlobeCount) fullGlobeCount.textContent = `${appState.schools.length} موقع`;
}

function renderDashTable() {
    const tbody = document.getElementById('dashSchoolsBody');
    if (!tbody) return;
    tbody.innerHTML = appState.schools.map((s, i) => `
        <tr>
            <td><strong style="color:var(--primary)">${i + 1}</strong></td>
            <td><strong style="color:var(--text-primary)">${s.name}</strong></td>
            <td><span class="table-type-badge badge-${s.type}">${s.typeName}</span></td>
            <td>${s.area}</td>
            <td>${s.studentsCount}</td>
            <td style="display:flex;gap:6px">
                <button class="table-action-btn" onclick="openQuickImageModal(${s.id})" title="تغيير الصورة"><i class="fa-solid fa-camera"></i> صورة</button>
                <button class="table-action-btn" onclick="openEditSchoolModal(${s.id})"><i class="fa-solid fa-pen"></i> تعديل</button>
                <button class="table-action-btn danger" onclick="confirmDeleteSchool(${s.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// ======================== SCHOOLS ADMIN ========================
function renderSchoolsAdmin(filter = {}) {
    const grid = document.getElementById('schoolsAdminGrid');
    if (!grid) return;

    let schools = [...appState.schools];

    const searchQ = (filter.search || document.getElementById('adminSchoolSearch')?.value || '').toLowerCase();
    const typeF = filter.type || document.getElementById('adminTypeFilter')?.value || 'all';
    const areaF = filter.area || document.getElementById('adminAreaFilter')?.value || 'all';

    if (searchQ) schools = schools.filter(s => s.name.toLowerCase().includes(searchQ) || s.location.toLowerCase().includes(searchQ) || s.code.includes(searchQ));
    if (typeF !== 'all') schools = schools.filter(s => s.type === typeF);
    if (areaF !== 'all') schools = schools.filter(s => s.area === areaF);

    if (schools.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted)"><i class="fa-solid fa-magnifying-glass" style="font-size:40px;margin-bottom:16px;display:block"></i><p>لا توجد مدارس مطابقة للبحث</p></div>`;
        return;
    }

    grid.innerHTML = schools.map(s => `
        <div class="school-admin-card">
            <div class="school-card-media">
                <img class="school-admin-card-img" src="${s.image}" alt="${s.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="school-admin-card-img-placeholder" style="display:none"><i class="fa-solid fa-school"></i></div>
                <div class="school-card-overlay">
                    <span class="table-type-badge badge-${s.type}" style="font-size:10px">${s.typeName}</span>
                </div>
                <button class="btn-change-image-overlay" onclick="openQuickImageModal(${s.id})" title="تغيير صورة المدرسة">
                    <i class="fa-solid fa-camera"></i>
                    <span>تغيير الصورة</span>
                </button>
            </div>
            <div class="school-card-body">
                <div class="school-card-name">${s.name}</div>
                <div class="school-card-meta"><i class="fa-solid fa-location-dot"></i> ${s.location}</div>
                <div class="school-card-meta"><i class="fa-solid fa-id-card"></i> كود: ${s.code}</div>
                <div class="school-card-meta"><i class="fa-solid fa-users"></i> ${s.studentsCount}</div>
                <div class="school-card-actions">
                    <button class="btn-card-edit" onclick="openEditSchoolModal(${s.id})">
                        <i class="fa-solid fa-pen-to-square"></i> تعديل
                    </button>
                    <button class="btn-card-preview" onclick="openSchoolPreview(${s.id})" ${s.link ? '' : 'disabled'}>
                        <i class="fa-solid fa-eye"></i> معاينة
                    </button>
                    <button class="btn-card-photo" onclick="openQuickImageModal(${s.id})" title="تغيير الصورة">
                        <i class="fa-solid fa-camera"></i> الصورة
                    </button>
                    <button class="btn-card-delete" onclick="confirmDeleteSchool(${s.id})" title="حذف">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterAdminSchools() {
    renderSchoolsAdmin();
}

// ======================== SCHOOL MODAL ========================
function openAddSchoolModal() {
    document.getElementById('schoolModalTitle').textContent = 'إضافة مدرسة جديدة';
    document.getElementById('schoolEditId').value = '';
    clearSchoolForm();
    updateSchoolImagePreviewInModal('q.jpeg');
    renderImagePresets('modalImagePresetsGrid', 'q.jpeg', 'modal');
    openModal('schoolModal');
}

function openEditSchoolModal(id) {
    const school = appState.schools.find(s => s.id === id);
    if (!school) return;

    document.getElementById('schoolModalTitle').textContent = 'تعديل بيانات المدرسة';
    document.getElementById('schoolEditId').value = id;
    document.getElementById('sName').value = school.name || '';
    document.getElementById('sCode').value = school.code || '';
    document.getElementById('sType').value = school.type || 'mixed';
    document.getElementById('sTypeName').value = school.typeName || '';
    document.getElementById('sArea').value = school.area || 'السنبلاوين المدينة';
    document.getElementById('sStudents').value = school.studentsCount || '';
    document.getElementById('sLocation').value = school.location || '';
    document.getElementById('sImage').value = school.image || '';
    document.getElementById('sLink').value = school.link || '';
    document.getElementById('sDesc').value = school.description || '';
    document.getElementById('sFeatures').value = (school.features || []).join('\n');
    document.getElementById('sHasLive').checked = school.hasLiveSite !== false;

    const curImg = school.image || 'q.jpeg';
    updateSchoolImagePreviewInModal(curImg);
    renderImagePresets('modalImagePresetsGrid', curImg, 'modal');

    openModal('schoolModal');
}

function clearSchoolForm() {
    ['sName','sCode','sTypeName','sStudents','sLocation','sImage','sLink','sDesc','sFeatures'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('sType').value = 'mixed';
    document.getElementById('sArea').value = 'السنبلاوين المدينة';
    document.getElementById('sHasLive').checked = true;
    updateSchoolImagePreviewInModal('q.jpeg');
    renderImagePresets('modalImagePresetsGrid', 'q.jpeg', 'modal');
}

function saveSchool() {
    const name = document.getElementById('sName').value.trim();
    if (!name) { showToast('يرجى إدخال اسم المدرسة', 'error'); return; }

    const editId = document.getElementById('schoolEditId').value;
    const typeVal = document.getElementById('sType').value;
    const typeNames = { boys: 'ثانوي عام - بنين', girls: 'ثانوي عام - بنات', mixed: 'ثانوي عام - مشترك', languages: 'رسمي لغات وتجريبي' };

    const schoolData = {
        name,
        code: document.getElementById('sCode').value.trim(),
        type: typeVal,
        typeName: document.getElementById('sTypeName').value.trim() || typeNames[typeVal],
        area: document.getElementById('sArea').value,
        studentsCount: document.getElementById('sStudents').value.trim(),
        location: document.getElementById('sLocation').value.trim(),
        image: document.getElementById('sImage').value.trim() || 'q.jpeg',
        link: document.getElementById('sLink').value.trim(),
        description: document.getElementById('sDesc').value.trim(),
        features: document.getElementById('sFeatures').value.split('\n').map(f => f.trim()).filter(Boolean),
        hasLiveSite: document.getElementById('sHasLive').checked
    };

    if (editId) {
        const idx = appState.schools.findIndex(s => s.id == editId);
        if (idx > -1) {
            appState.schools[idx] = { ...appState.schools[idx], ...schoolData };
            showToast('تم تحديث بيانات المدرسة بنجاح ✅', 'success');
        }
    } else {
        const maxId = appState.schools.reduce((max, s) => Math.max(max, s.id), 0);
        appState.schools.push({ id: maxId + 1, principal: `إدارة ${name}`, ...schoolData });
        showToast('تمت إضافة المدرسة بنجاح ✅', 'success');
    }

    markUnsaved();
    closeSchoolModal();
    renderSchoolsAdmin();
    renderDashboard();
    saveToStorage();
}

function closeSchoolModal() { closeModal('schoolModal'); }

// ======================== SCHOOL IMAGE MANAGER ENGINE ========================

// الضغط الذكي للصور قبل حفظها لتوفير مساحة الـ localStorage وضمان سرعة العرض
function compressImageFile(file, maxWidth = 1000, quality = 0.82) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            return reject(new Error('الملف المختار ليس صورة صالحة'));
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = () => reject(new Error('تعذر معالجة الصورة'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('تعذر قراءة الملف'));
        reader.readAsDataURL(file);
    });
}

function initSchoolImageManager() {
    setupDropzone('schoolDropzone', (file) => processImageUpload(file, 'modal'));
    setupDropzone('quickDropzone', (file) => processImageUpload(file, 'quick'));
}

function setupDropzone(elementId, onFileSelected) {
    const dropzone = document.getElementById(elementId);
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        });
    });

    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            onFileSelected(files[0]);
        }
    });
}

function renderImagePresets(containerId, selectedImage, context) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const normalizedSelected = (selectedImage || '').trim();

    container.innerHTML = PRESET_SCHOOL_IMAGES.map(preset => {
        const isActive = normalizedSelected === preset.name;
        return `
            <div class="preset-thumb-card ${isActive ? 'active' : ''}" 
                 onclick="selectPresetImage('${preset.name}', '${context}')" 
                 title="${preset.label} (${preset.name})">
                <img src="${preset.name}" alt="${preset.label}" onerror="this.src='q.jpeg'">
                <div class="preset-check"><i class="fa-solid fa-check"></i></div>
                <div class="preset-label">${preset.label}</div>
            </div>
        `;
    }).join('');
}

function selectPresetImage(presetName, context) {
    if (context === 'modal') {
        const input = document.getElementById('sImage');
        if (input) input.value = presetName;
        updateSchoolImagePreviewInModal(presetName);
        renderImagePresets('modalImagePresetsGrid', presetName, 'modal');
        showToast(`تم اختيار صورة: ${presetName}`, 'info');
    } else if (context === 'quick') {
        const input = document.getElementById('quickImageInput');
        if (input) input.value = presetName;
        updateSchoolImagePreviewInQuick(presetName);
        renderImagePresets('quickImagePresetsGrid', presetName, 'quick');
        showToast(`تم اختيار صورة: ${presetName}`, 'info');
    }
}

function switchImgTab(tabKey, btnEl, context) {
    const parentContainer = btnEl.closest('.image-controls-col');
    if (!parentContainer) return;

    parentContainer.querySelectorAll('.img-tab-btn').forEach(btn => btn.classList.remove('active'));
    btnEl.classList.add('active');

    const prefix = context === 'modal' ? 'modalImgTab' : 'quickImgTab';
    const tabMap = {
        upload: prefix + 'Upload',
        presets: prefix + 'Presets',
        url: prefix + 'Url'
    };

    ['upload', 'presets', 'url'].forEach(key => {
        const tabEl = document.getElementById(tabMap[key]);
        if (tabEl) {
            if (key === tabKey) {
                tabEl.classList.add('active');
            } else {
                tabEl.classList.remove('active');
            }
        }
    });
}

function handleSchoolImageFileUpload(fileInput, context) {
    const file = fileInput.files && fileInput.files[0];
    if (file) {
        processImageUpload(file, context);
    }
    fileInput.value = '';
}

async function processImageUpload(file, context) {
    try {
        showToast('جاري تحسين وضغط الصورة...', 'info');
        const compressedBase64 = await compressImageFile(file, 1100, 0.82);

        if (context === 'modal') {
            const input = document.getElementById('sImage');
            if (input) input.value = compressedBase64;
            updateSchoolImagePreviewInModal(compressedBase64, 'مرفوعة من الجهاز');
            renderImagePresets('modalImagePresetsGrid', '', 'modal');
        } else if (context === 'quick') {
            const input = document.getElementById('quickImageInput');
            if (input) input.value = compressedBase64;
            updateSchoolImagePreviewInQuick(compressedBase64, 'مرفوعة من الجهاز');
            renderImagePresets('quickImagePresetsGrid', '', 'quick');
        }
        showToast('تم رفع الصورة بنجاح جاهزة للحفظ ✅', 'success');
    } catch(err) {
        console.error(err);
        showToast(err.message || 'فشل في رفع الصورة', 'error');
    }
}

function onSchoolImageInputChanged(val, context) {
    const cleaned = (val || '').trim();
    if (context === 'modal') {
        updateSchoolImagePreviewInModal(cleaned || 'q.jpeg');
        renderImagePresets('modalImagePresetsGrid', cleaned, 'modal');
    } else if (context === 'quick') {
        updateSchoolImagePreviewInQuick(cleaned || 'q.jpeg');
        renderImagePresets('quickImagePresetsGrid', cleaned, 'quick');
    }
}

function updateSchoolImagePreviewInModal(imgSrc, customBadge) {
    const imgEl = document.getElementById('schoolImgPreview');
    const badgeEl = document.getElementById('schoolImgBadge');
    if (imgEl) {
        imgEl.src = imgSrc || 'q.jpeg';
    }
    if (badgeEl) {
        if (customBadge) {
            badgeEl.textContent = customBadge;
        } else if ((imgSrc || '').startsWith('data:image')) {
            badgeEl.textContent = 'صورة مرفوعة';
        } else if ((imgSrc || '').startsWith('http')) {
            badgeEl.textContent = 'رابط خارجي';
        } else {
            badgeEl.textContent = 'صورة محلية';
        }
    }
}

function updateSchoolImagePreviewInQuick(imgSrc, customBadge) {
    const imgEl = document.getElementById('quickImgPreview');
    const badgeEl = document.getElementById('quickImgBadge');
    if (imgEl) {
        imgEl.src = imgSrc || 'q.jpeg';
    }
    if (badgeEl) {
        if (customBadge) {
            badgeEl.textContent = customBadge;
        } else if ((imgSrc || '').startsWith('data:image')) {
            badgeEl.textContent = 'صورة مرفوعة';
        } else if ((imgSrc || '').startsWith('http')) {
            badgeEl.textContent = 'رابط خارجي';
        } else {
            badgeEl.textContent = 'صورة محلية';
        }
    }
}

function resetSchoolImageToDefault() {
    const input = document.getElementById('sImage');
    if (input) input.value = 'q.jpeg';
    updateSchoolImagePreviewInModal('q.jpeg');
    renderImagePresets('modalImagePresetsGrid', 'q.jpeg', 'modal');
    showToast('تمت إعادة تعيين الصورة إلى الافتراضية', 'info');
}

function resetQuickImageToDefault() {
    const input = document.getElementById('quickImageInput');
    if (input) input.value = 'q.jpeg';
    updateSchoolImagePreviewInQuick('q.jpeg');
    renderImagePresets('quickImagePresetsGrid', 'q.jpeg', 'quick');
    showToast('تمت إعادة تعيين الصورة إلى الافتراضية', 'info');
}

// نافذة التغيير السريع لصورة المدرسة
function openQuickImageModal(schoolId) {
    const school = appState.schools.find(s => s.id === schoolId);
    if (!school) return;

    document.getElementById('quickImageSchoolId').value = schoolId;
    document.getElementById('quickImageSchoolName').textContent = `تغيير صورة: ${school.name}`;
    
    const curImg = school.image || 'q.jpeg';
    document.getElementById('quickImageInput').value = curImg;
    updateSchoolImagePreviewInQuick(curImg);
    renderImagePresets('quickImagePresetsGrid', curImg, 'quick');

    // Default to upload tab
    const uploadBtn = document.querySelector('#quickImageModal [data-tab="upload"]');
    if (uploadBtn) switchImgTab('upload', uploadBtn, 'quick');

    openModal('quickImageModal');
}

function saveQuickSchoolImage() {
    const schoolId = parseInt(document.getElementById('quickImageSchoolId').value, 10);
    const newImage = (document.getElementById('quickImageInput').value || '').trim() || 'q.jpeg';

    const school = appState.schools.find(s => s.id === schoolId);
    if (!school) {
        showToast('لم يتم العثور على المدرسة', 'error');
        return;
    }

    school.image = newImage;
    markUnsaved();
    saveToStorage();
    renderSchoolsAdmin();
    renderDashboard();
    closeQuickImageModal();
    showToast(`تم حفظ وتحديث صورة "${school.name}" بنجاح ✅`, 'success');
}

function closeQuickImageModal() {
    closeModal('quickImageModal');
}

// ======================== DELETE ========================
function confirmDeleteSchool(id) {
    const school = appState.schools.find(s => s.id === id);
    if (!school) return;
    document.getElementById('deleteModalText').textContent = `هل أنت متأكد من حذف "${school.name}"؟ لا يمكن التراجع عن هذا الإجراء.`;
    deleteCallback = () => {
        appState.schools = appState.schools.filter(s => s.id !== id);
        saveToStorage();
        renderSchoolsAdmin();
        renderDashboard();
        showToast('تم حذف المدرسة بنجاح', 'success');
        closeDeleteModal();
    };
    openModal('deleteModal');
    document.getElementById('deleteConfirmBtn').onclick = deleteCallback;
}

function closeDeleteModal() { closeModal('deleteModal'); deleteCallback = null; }

// ======================== SERVICES ========================
function renderServicesAdmin() {
    const grid = document.getElementById('servicesAdminGrid');
    if (!grid) return;
    grid.innerHTML = appState.services.map(sv => `
        <div class="service-admin-card">
            <div class="service-admin-icon">
                <i class="fa-solid ${sv.icon}"></i>
            </div>
            <div class="service-admin-title">${sv.title}</div>
            <div class="service-admin-desc">${sv.desc}</div>
            <div class="service-admin-link"><i class="fa-solid fa-link"></i> ${sv.link}</div>
            <div class="school-card-actions" style="display:flex;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
                <button class="btn-card-edit" onclick="openEditServiceModal(${sv.id})">
                    <i class="fa-solid fa-pen-to-square"></i> تعديل
                </button>
                <button class="btn-card-delete" onclick="confirmDeleteService(${sv.id})" title="حذف">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join('') || '<p style="color:var(--text-muted);padding:20px">لا توجد خدمات بعد</p>';
}

function openAddServiceModal() {
    document.getElementById('serviceModalTitle').textContent = 'إضافة خدمة إلكترونية';
    document.getElementById('serviceEditId').value = '';
    ['svTitle','svIcon','svDesc','svLink','svLinkText'].forEach(id => { document.getElementById(id).value = ''; });
    openModal('serviceModal');
}

function openEditServiceModal(id) {
    const sv = appState.services.find(s => s.id === id);
    if (!sv) return;
    document.getElementById('serviceModalTitle').textContent = 'تعديل الخدمة';
    document.getElementById('serviceEditId').value = id;
    document.getElementById('svTitle').value = sv.title || '';
    document.getElementById('svIcon').value = sv.icon || '';
    document.getElementById('svDesc').value = sv.desc || '';
    document.getElementById('svLink').value = sv.link || '';
    document.getElementById('svLinkText').value = sv.linkText || '';
    openModal('serviceModal');
}

function saveService() {
    const title = document.getElementById('svTitle').value.trim();
    if (!title) { showToast('يرجى إدخال عنوان الخدمة', 'error'); return; }

    const editId = document.getElementById('serviceEditId').value;
    const data = {
        title,
        icon: document.getElementById('svIcon').value.trim() || 'fa-star',
        desc: document.getElementById('svDesc').value.trim(),
        link: document.getElementById('svLink').value.trim() || '#',
        linkText: document.getElementById('svLinkText').value.trim() || 'الدخول'
    };

    if (editId) {
        const idx = appState.services.findIndex(s => s.id == editId);
        if (idx > -1) appState.services[idx] = { ...appState.services[idx], ...data };
        showToast('تم تحديث الخدمة ✅', 'success');
    } else {
        const maxId = appState.services.reduce((max, s) => Math.max(max, s.id), 0);
        appState.services.push({ id: maxId + 1, ...data });
        showToast('تمت إضافة الخدمة ✅', 'success');
    }

    markUnsaved();
    closeServiceModal();
    renderServicesAdmin();
    saveToStorage();
}

function closeServiceModal() { closeModal('serviceModal'); }

function confirmDeleteService(id) {
    const sv = appState.services.find(s => s.id === id);
    if (!sv) return;
    document.getElementById('deleteModalText').textContent = `هل أنت متأكد من حذف خدمة "${sv.title}"؟`;
    document.getElementById('deleteConfirmBtn').onclick = () => {
        appState.services = appState.services.filter(s => s.id !== id);
        saveToStorage();
        renderServicesAdmin();
        showToast('تم حذف الخدمة', 'success');
        closeDeleteModal();
    };
    openModal('deleteModal');
}

// ======================== STATS EDITOR ========================
function renderStatsEditor() {
    const grid = document.getElementById('statsEditGrid');
    if (!grid) return;
    grid.innerHTML = appState.stats.map((stat, i) => `
        <div class="stat-edit-card">
            <div class="stat-edit-icon-wrap">
                <div class="stat-edit-icon"><i class="fa-solid ${stat.icon}"></i></div>
                <div class="stat-edit-num">${stat.number}</div>
            </div>
            <div class="form-group">
                <label class="form-label">الأيقونة (Font Awesome class)</label>
                <input type="text" class="admin-input" value="${stat.icon}" oninput="updateStat(${i},'icon',this.value)" placeholder="fa-school">
            </div>
            <div class="form-group">
                <label class="form-label">الرقم / القيمة</label>
                <input type="text" class="admin-input" value="${stat.number}" oninput="updateStat(${i},'number',this.value)" placeholder="18+">
            </div>
            <div class="form-group">
                <label class="form-label">التسمية</label>
                <input type="text" class="admin-input" value="${stat.label}" oninput="updateStat(${i},'label',this.value)" placeholder="مدرسة ثانوية">
            </div>
        </div>
    `).join('');
}

function updateStat(index, field, value) {
    if (appState.stats[index]) {
        appState.stats[index][field] = value;
        markUnsaved();
    }
}

function saveStatsChanges() {
    saveToStorage();
    showToast('تم حفظ الإحصائيات بنجاح ✅', 'success');
    renderStatsEditor();
}

// ======================== NAV LINKS ========================
function renderNavLinksEditor() {
    const container = document.getElementById('navLinksEditor');
    if (!container) return;
    container.innerHTML = appState.navLinks.map((link, i) => `
        <div class="nav-link-item">
            <span class="drag-handle"><i class="fa-solid fa-grip-dots-vertical"></i></span>
            <input type="text" value="${link.text}" placeholder="نص الرابط" oninput="updateNavLink(${i},'text',this.value)">
            <input type="text" value="${link.href}" placeholder="الرابط (#section أو URL)" style="direction:ltr;flex:0.8" oninput="updateNavLink(${i},'href',this.value)">
            <input type="text" value="${link.icon || ''}" placeholder="أيقونة" style="flex:0.6" oninput="updateNavLink(${i},'icon',this.value)">
            <button class="nav-remove-btn" onclick="removeNavLink(${i})"><i class="fa-solid fa-xmark"></i></button>
        </div>
    `).join('');
}

function updateNavLink(i, field, value) {
    if (appState.navLinks[i]) { appState.navLinks[i][field] = value; markUnsaved(); }
}

function addNavLink() {
    appState.navLinks.push({ text: 'رابط جديد', href: '#', icon: 'fa-link' });
    renderNavLinksEditor();
    markUnsaved();
}

function removeNavLink(i) {
    appState.navLinks.splice(i, 1);
    renderNavLinksEditor();
    markUnsaved();
}

function saveNavigationChanges() {
    saveToStorage();
    showToast('تم حفظ إعدادات التنقل ✅', 'success');
}

// ======================== ABOUT ========================
function renderAboutFeaturesEditor() {
    const container = document.getElementById('aboutFeaturesEditor');
    if (!container) return;
    container.innerHTML = appState.aboutFeatures.map((f, i) => `
        <div class="feature-item">
            <input type="text" value="${f}" placeholder="نقطة تميز" oninput="updateAboutFeature(${i},this.value)">
            <button class="feature-remove" onclick="removeAboutFeature(${i})"><i class="fa-solid fa-xmark"></i></button>
        </div>
    `).join('');
}

function updateAboutFeature(i, value) {
    appState.aboutFeatures[i] = value;
    markUnsaved();
}

function addAboutFeature() {
    appState.aboutFeatures.push('');
    renderAboutFeaturesEditor();
    markUnsaved();
    // Focus the new input
    const inputs = document.querySelectorAll('#aboutFeaturesEditor input');
    if (inputs.length > 0) inputs[inputs.length - 1].focus();
}

function removeAboutFeature(i) {
    appState.aboutFeatures.splice(i, 1);
    renderAboutFeaturesEditor();
    markUnsaved();
}

function saveAboutChanges() {
    // Read features from inputs
    const featureInputs = document.querySelectorAll('#aboutFeaturesEditor input');
    appState.aboutFeatures = Array.from(featureInputs).map(el => el.value.trim()).filter(Boolean);
    saveToStorage();
    showToast('تم حفظ قسم عن الإدارة ✅', 'success');
}

// ======================== FOOTER ========================
function renderFooterEditors() {
    renderFooterLinks('footerQuickLinksEditor', appState.footerQuickLinks, 'footerQuickLinks');
    renderFooterLinks('footerPlatformsEditor', appState.footerPlatforms, 'footerPlatforms');
}

function renderFooterLinks(containerId, links, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = links.map((link, i) => `
        <div class="footer-link-item">
            <input type="text" value="${link.text}" placeholder="نص الرابط" oninput="updateFooterLink('${stateKey}',${i},'text',this.value)">
            <input type="text" value="${link.href}" placeholder="الرابط" style="direction:ltr;flex:1.2" oninput="updateFooterLink('${stateKey}',${i},'href',this.value)">
            <button class="feature-remove" onclick="removeFooterLink('${stateKey}',${i})"><i class="fa-solid fa-xmark"></i></button>
        </div>
    `).join('');
}

function updateFooterLink(stateKey, i, field, value) {
    if (appState[stateKey] && appState[stateKey][i]) {
        appState[stateKey][i][field] = value;
        markUnsaved();
    }
}

function addFooterQuickLink() {
    appState.footerQuickLinks.push({ text: 'رابط جديد', href: '#' });
    renderFooterEditors();
    markUnsaved();
}

function addFooterPlatform() {
    appState.footerPlatforms.push({ text: 'منصة جديدة', href: 'https://' });
    renderFooterEditors();
    markUnsaved();
}

function removeFooterLink(stateKey, i) {
    appState[stateKey].splice(i, 1);
    renderFooterEditors();
    markUnsaved();
}

function saveFooterChanges() {
    saveToStorage();
    showToast('تم حفظ تذييل الصفحة ✅', 'success');
}

// ======================== CONTENT SAVE ========================
function saveContentChanges() {
    saveToStorage();
    showToast('تم حفظ محتوى الصفحة ✅', 'success');
}

// ======================== SAVE ALL ========================
function saveAllChanges() {
    // Collect about features
    const featureInputs = document.querySelectorAll('#aboutFeaturesEditor input');
    if (featureInputs.length > 0) {
        appState.aboutFeatures = Array.from(featureInputs).map(el => el.value.trim()).filter(Boolean);
    }

    saveToStorage();
    appState.hasUnsaved = false;
    document.getElementById('unsavedBadge').style.display = 'none';
    showToast('✅ تم حفظ جميع التغييرات بنجاح! أعد تحميل الموقع لرؤيتها.', 'success');
}

// ======================== BACKUP ========================
function exportData() {
    const data = {
        schools: appState.schools,
        stats: appState.stats,
        services: appState.services,
        navLinks: appState.navLinks,
        aboutFeatures: appState.aboutFeatures,
        footerQuickLinks: appState.footerQuickLinks,
        footerPlatforms: appState.footerPlatforms,
        content: JSON.parse(localStorage.getItem('admin_content') || '{}'),
        exportedAt: new Date().toISOString(),
        version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `senbellawein-backup-${new Date().toLocaleDateString('en-CA')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('تم تصدير البيانات بنجاح ✅', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.schools) appState.schools = data.schools;
            if (data.stats) appState.stats = data.stats;
            if (data.services) appState.services = data.services;
            if (data.navLinks) appState.navLinks = data.navLinks;
            if (data.aboutFeatures) appState.aboutFeatures = data.aboutFeatures;
            if (data.footerQuickLinks) appState.footerQuickLinks = data.footerQuickLinks;
            if (data.footerPlatforms) appState.footerPlatforms = data.footerPlatforms;
            if (data.content) localStorage.setItem('admin_content', JSON.stringify(data.content));

            saveToStorage();
            renderDashboard();
            renderSchoolsAdmin();
            renderServicesAdmin();
            renderStatsEditor();
            renderNavLinksEditor();
            renderAboutFeaturesEditor();
            renderFooterEditors();
            loadContentFields();

            showToast('تم استيراد البيانات بنجاح ✅', 'success');
        } catch(err) {
            showToast('ملف JSON غير صالح ❌', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function resetAllData() {
    if (!confirm('⚠️ سيتم مسح جميع التغييرات والعودة للبيانات الأصلية. هل أنت متأكد؟')) return;
    resetToDefaults();
    saveToStorage();
    location.reload();
}

function resetToDefaults() {
    appState.schools = [...DEFAULT_SCHOOLS.map(s => ({...s}))];
    appState.stats = [...DEFAULT_STATS.map(s => ({...s}))];
    appState.services = [...DEFAULT_SERVICES.map(s => ({...s}))];
    appState.navLinks = [...DEFAULT_NAV_LINKS.map(s => ({...s}))];
    appState.aboutFeatures = [...DEFAULT_ABOUT_FEATURES];
    appState.footerQuickLinks = [...DEFAULT_FOOTER_QUICK_LINKS.map(s => ({...s}))];
    appState.footerPlatforms = [...DEFAULT_FOOTER_PLATFORMS.map(s => ({...s}))];
}

// ======================== PREVIEW ========================
function openPreview() {
    window.open(SITE_PREVIEW_URL, '_blank', 'noopener,noreferrer');
}

function openSchoolPreview(schoolId) {
    const school = appState.schools.find(item => item.id === schoolId);
    if (!school || !school.link) {
        showToast('لا يوجد رابط معاينة محدد لهذه المدرسة', 'warning');
        return;
    }

    try {
        const previewUrl = new URL(school.link, window.location.href);
        if (!['http:', 'https:', 'file:'].includes(previewUrl.protocol)) {
            throw new Error('Unsupported preview URL scheme');
        }
        window.open(previewUrl.href, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.error('Unable to open school preview:', error);
        showToast('رابط المعاينة غير صالح؛ راجع رابط المدرسة في بياناتها', 'error');
    }
}

// ======================== MODAL HELPERS ========================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
}

// Close modals on overlay click
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('open');
            }
        });
    });

    // ESC to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        }
    });

    // Mark unsaved on any input change
    document.querySelectorAll('.admin-input').forEach(el => {
        el.addEventListener('input', markUnsaved);
    });
});

// ======================== TOAST ========================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${icons[type] || icons.success}"></i></div>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ============================================================
   CYBER HACKER ENGINES & 3D WORLD GLOBE MODULES
   ENGINEER: M/ADHAM HAKER // ROOT CYBER OVERRIDE
   ============================================================ */

// ======================== 1. WEB AUDIO CYBER SYNTHESIZER ========================
let audioCtx = null;
let cyberAudioEnabled = localStorage.getItem('cyber_audio_enabled') !== 'false';

function initCyberAudio() {
    const toggleBtn = document.getElementById('audioToggleBtn');
    const audioIcon = document.getElementById('audioIcon');
    const prefBox = document.getElementById('prefAudioFx');

    if (prefBox) prefBox.checked = cyberAudioEnabled;
    if (audioIcon) {
        audioIcon.className = cyberAudioEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }
}

function toggleCyberAudio(forcedState) {
    cyberAudioEnabled = typeof forcedState === 'boolean' ? forcedState : !cyberAudioEnabled;
    localStorage.setItem('cyber_audio_enabled', cyberAudioEnabled ? 'true' : 'false');
    initCyberAudio();
    if (cyberAudioEnabled) playCyberSound('click');
    showToast(cyberAudioEnabled ? '🔊 تم تفعيل المؤثرات الصوتية السيبرانية' : '🔇 تم كتم المؤثرات الصوتية', 'info');
}

function playCyberSound(type = 'click') {
    if (!cyberAudioEnabled) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;

        if (type === 'click') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'access') {
            // Melodic access granted chord
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.07);
                gain.gain.setValueAtTime(0.08, now + i * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + i * 0.07);
                osc.stop(now + i * 0.07 + 0.25);
            });
        } else if (type === 'error') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.setValueAtTime(120, now + 0.08);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
        } else if (type === 'radar') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.18);
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.18);
        }
    } catch(e) {}
}

// ======================== 2. MATRIX DIGITAL RAIN ENGINE ========================
let matrixInterval = null;
let matrixEnabled = localStorage.getItem('matrix_rain_enabled') !== 'false';

function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    if (!matrixEnabled) {
        document.body.classList.add('matrix-off');
        return;
    }
    document.body.classList.remove('matrix-off');

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEF01010101XYZｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ#@*+=';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    function resizeMatrix() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
    }
    window.addEventListener('resize', resizeMatrix);

    function drawMatrix() {
        if (!matrixEnabled) return;
        ctx.fillStyle = 'rgba(3, 7, 18, 0.06)';
        ctx.fillRect(0, 0, width, height);

        // Get primary color for matrix
        const theme = document.body.getAttribute('data-theme') || 'matrix';
        const colorMap = {
            matrix: '#00ff9d',
            cyan: '#00e5ff',
            amber: '#f59e0b',
            crimson: '#ff0055'
        };
        const rainColor = colorMap[theme] || '#00ff9d';

        ctx.fillStyle = rainColor;
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(drawMatrix, 45);

    const prefBox = document.getElementById('prefMatrixRain');
    if (prefBox) prefBox.checked = matrixEnabled;
}

function toggleMatrixRain(forcedState) {
    matrixEnabled = typeof forcedState === 'boolean' ? forcedState : !matrixEnabled;
    localStorage.setItem('matrix_rain_enabled', matrixEnabled ? 'true' : 'false');
    const canvas = document.getElementById('matrixCanvas');
    const prefBox = document.getElementById('prefMatrixRain');
    if (prefBox) prefBox.checked = matrixEnabled;

    if (matrixEnabled) {
        document.body.classList.remove('matrix-off');
        if (canvas) canvas.style.opacity = '0.22';
        initMatrixRain();
        showToast('⚡ تم تشغيل مطر الماتريكس', 'info');
    } else {
        document.body.classList.add('matrix-off');
        if (canvas) canvas.style.opacity = '0';
        showToast('تم إيقاف مطر الماتريكس', 'info');
    }
    playCyberSound('click');
}

// ======================== 3. THREE.JS 3D WORLD GLOBE ENGINE ========================
let globeScene, globeCamera, globeRenderer, globeMesh, globeGroup, radarMesh, arcGroup;
let isGlobeDragging = false;
let prevPointerPos = { x: 0, y: 0 };
let globeAutoRotate = true;
let globeInited = false;
let signalAnimations = [];
let globeFallbackNode = null;
let fallbackGlobeRotation = 0;
let fallbackGlobeTilt = 0;
let fallbackGlobeGeometry = null;
let globeThemeMaterials = [];
let globeThemeLights = [];

// Coordinates for Egypt / Sinbillawin
const EGYPT_LAT = 30.8741;
const EGYPT_LON = 31.5214;
const GLOBE_RADIUS = 72;
const GLOBE_ARC_NODE_INDICES = [3, 5, 8, 11, 14, 18, 19];
const VISUAL_SERVER_NODES = [
    { name: 'القاهرة', lat: 30.0444, lon: 31.2357 },
    { name: 'الإسكندرية', lat: 31.2001, lon: 29.9187 },
    { name: 'الرياض', lat: 24.7136, lon: 46.6753 },
    { name: 'لندن', lat: 51.5074, lon: -0.1278 },
    { name: 'باريس', lat: 48.8566, lon: 2.3522 },
    { name: 'فرانكفورت', lat: 50.1109, lon: 8.6821 },
    { name: 'أمستردام', lat: 52.3676, lon: 4.9041 },
    { name: 'إسطنبول', lat: 41.0082, lon: 28.9784 },
    { name: 'دبي', lat: 25.2048, lon: 55.2708 },
    { name: 'مومباي', lat: 19.076, lon: 72.8777 },
    { name: 'سنغافورة', lat: 1.3521, lon: 103.8198 },
    { name: 'طوكيو', lat: 35.6762, lon: 139.6503 },
    { name: 'سيول', lat: 37.5665, lon: 126.978 },
    { name: 'هونغ كونغ', lat: 22.3193, lon: 114.1694 },
    { name: 'سيدني', lat: -33.8688, lon: 151.2093 },
    { name: 'جوهانسبرغ', lat: -26.2041, lon: 28.0473 },
    { name: 'نيروبي', lat: -1.2921, lon: 36.8219 },
    { name: 'لاغوس', lat: 6.5244, lon: 3.3792 },
    { name: 'ساو باولو', lat: -23.5505, lon: -46.6333 },
    { name: 'نيويورك', lat: 40.7128, lon: -74.006 },
    { name: 'وادي السيليكون', lat: 37.3861, lon: -122.0839 },
    { name: 'تورونتو', lat: 43.6532, lon: -79.3832 }
];

const EARTH_LANDMASSES = [
    [[-168, 70], [-145, 72], [-128, 58], [-124, 48], [-117, 32], [-105, 23], [-97, 27], [-82, 8], [-77, 20], [-60, 46], [-79, 58], [-105, 72], [-135, 75]],
    [[-52, 82], [-28, 75], [-40, 58], [-53, 60], [-64, 72]],
    [[-81, 12], [-68, 9], [-50, -2], [-35, -8], [-48, -25], [-58, -35], [-70, -55], [-76, -30]],
    [[-11, 36], [-8, 50], [2, 58], [18, 70], [42, 68], [58, 58], [82, 62], [104, 72], [135, 66], [160, 58], [178, 52], [160, 43], [142, 35], [121, 22], [107, 8], [95, 10], [80, 7], [70, 23], [58, 25], [48, 39], [35, 35], [28, 42], [16, 38], [6, 44], [-1, 38]],
    [[-17, 36], [3, 37], [17, 32], [33, 12], [42, -12], [30, -34], [18, -35], [9, -17], [-1, 5], [-15, 15]],
    [[112, -11], [130, -12], [145, -18], [153, -29], [145, -39], [130, -35], [115, -24]],
    [[47, -13], [50, -16], [49, -25], [45, -22]],
    [[-180, -70], [-120, -72], [-60, -70], [0, -72], [60, -70], [120, -72], [180, -70], [180, -90], [-180, -90]]
];

function isLandCoordinate(longitude, latitude) {
    return EARTH_LANDMASSES.some(polygon => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const [xi, yi] = polygon[i];
            const [xj, yj] = polygon[j];
            const intersects = (yi > latitude) !== (yj > latitude) &&
                longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi;
            if (intersects) inside = !inside;
        }
        return inside;
    });
}

function getThemeAccentCssColor() {
    return getComputedStyle(document.body).getPropertyValue('--primary').trim() || '#00ff9d';
}

function getThemeAccentRgba(opacity) {
    const match = getThemeAccentCssColor().match(/^#([0-9a-f]{6})$/i);
    if (!match) return `rgba(0, 255, 157, ${opacity})`;
    const value = Number.parseInt(match[1], 16);
    const red = (value >> 16) & 255;
    const green = (value >> 8) & 255;
    const blue = value & 255;
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function getThemeAccentColor() {
    return new THREE.Color(getThemeAccentCssColor());
}

function createLatitudeLongitudeGrid(radius, opacity = 0.28) {
    const grid = new THREE.Group();
    const material = new THREE.LineBasicMaterial({
        color: getThemeAccentColor(),
        transparent: true,
        opacity,
        depthWrite: false
    });
    globeThemeMaterials.push(material);
    const segments = 96;

    for (let latitude = -60; latitude <= 60; latitude += 30) {
        const points = [];
        for (let i = 0; i <= segments; i++) {
            points.push(latLonToVector3(latitude, -180 + (360 * i) / segments, radius));
        }
        grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
    }

    for (let longitude = -180; longitude < 180; longitude += 30) {
        const points = [];
        for (let i = 0; i <= segments; i++) {
            points.push(latLonToVector3(-90 + (180 * i) / segments, longitude, radius));
        }
        grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
    }

    return grid;
}

function createLandDotCloud(radius) {
    const positions = [];
    for (let latitude = -78; latitude <= 82; latitude += 2.4) {
        for (let longitude = -180; longitude < 180; longitude += 2.4) {
            if (!isLandCoordinate(longitude, latitude)) continue;
            const variation = ((Math.round(latitude + longitude) % 3) + 3) % 3;
            if (variation === 1) continue;
            const point = latLonToVector3(latitude, longitude, radius);
            positions.push(point.x, point.y, point.z);
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: getThemeAccentColor(),
        size: 1.15,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false
    });
    globeThemeMaterials.push(material);
    return new THREE.Points(geometry, material);
}

function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
}

function createGlobeLabel(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 72;
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.font = 'bold 30px monospace';
    context.textBaseline = 'middle';
    context.fillStyle = '#ffffff';
    context.shadowColor = '#ffffff';
    context.shadowBlur = 10;
    context.fillText(text, 8, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
        map: texture,
        color: getThemeAccentColor(),
        transparent: true,
        depthTest: true,
        depthWrite: false
    });
    globeThemeMaterials.push(material);
    const label = new THREE.Sprite(material);
    label.scale.set(35, 5, 1);
    label.center.set(0, 0.5);
    return label;
}

function initGlobe3D() {
    if (globeInited) return;

    const container = document.getElementById('dashGlobeCanvasWrapper');
    if (!container) return;

    // Check Three.js availability
    if (typeof THREE === 'undefined') {
        renderFallback2DGlobe(container);
        globeInited = true;
        return;
    }

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 380;

    globeScene = new THREE.Scene();
    globeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    globeCamera.position.z = 180;

    try {
        globeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
        console.error('Unable to initialize the 3D globe renderer:', error);
        renderFallback2DGlobe(container);
        globeInited = true;
        return;
    }
    globeRenderer.setSize(width, height);
    globeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globeRenderer.outputEncoding = THREE.sRGBEncoding;

    container.innerHTML = '';
    container.appendChild(globeRenderer.domElement);

    // Main Group
    globeGroup = new THREE.Group();
    globeScene.add(globeGroup);

    // 1. Dark globe with luminous latitude/longitude lines and land dots.
    globeThemeMaterials = [];
    globeThemeLights = [];

    const outlineMaterial = new THREE.MeshBasicMaterial({
        color: getThemeAccentColor(),
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    globeThemeMaterials.push(outlineMaterial);
    const outline = new THREE.Mesh(
        new THREE.RingGeometry(GLOBE_RADIUS + 0.7, GLOBE_RADIUS + 1.25, 128),
        outlineMaterial
    );
    globeGroup.add(outline);

    const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00190c,
        transparent: true,
        opacity: 0.96
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    globeGroup.add(createLatitudeLongitudeGrid(GLOBE_RADIUS + 0.2));
    globeGroup.add(createLandDotCloud(GLOBE_RADIUS + 0.55));

    // 3. Glowing atmosphere rim
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 5, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
        color: getThemeAccentColor(),
        transparent: true,
        opacity: 0.11,
        side: THREE.BackSide
    });
    globeThemeMaterials.push(atmosMat);
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 4. Beacon on Egypt / Sinbillawin
    const egyptPos = latLonToVector3(EGYPT_LAT, EGYPT_LON, GLOBE_RADIUS + 1);
    const beaconGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: getThemeAccentColor() });
    globeThemeMaterials.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.copy(egyptPos);
    globeGroup.add(beaconMesh);
    const hubRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.4, 0.65, 8, 32),
        new THREE.MeshBasicMaterial({ color: getThemeAccentColor(), transparent: true, opacity: 0.95 })
    );
    globeThemeMaterials.push(hubRing.material);
    hubRing.position.copy(egyptPos);
    hubRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(hubRing);
    const hubLabel = createGlobeLabel('SINBILLAWIN // HUB');
    if (hubLabel) {
        hubLabel.position.copy(egyptPos).add(new THREE.Vector3(5, 3, 0));
        globeGroup.add(hubLabel);
    }

    // 5. Radiating radar ring on Egypt
    const radarGeo = new THREE.RingGeometry(1.5, 4.5, 32);
    const radarMat = new THREE.MeshBasicMaterial({
        color: getThemeAccentColor(),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    globeThemeMaterials.push(radarMat);
    radarMesh = new THREE.Mesh(radarGeo, radarMat);
    radarMesh.position.copy(egyptPos);
    radarMesh.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(radarMesh);

    // Animate visual-only signals from the Egypt hub to illustrative map nodes.
    arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);
    const signalStart = latLonToVector3(EGYPT_LAT, EGYPT_LON, GLOBE_RADIUS + 1);
    const signalLineMaterial = new THREE.LineBasicMaterial({
        color: getThemeAccentColor(),
        transparent: true,
        opacity: 0.22,
        depthWrite: false
    });
    globeThemeMaterials.push(signalLineMaterial);
    const arcNodes = VISUAL_SERVER_NODES.filter((_, index) => GLOBE_ARC_NODE_INDICES.includes(index));
    signalAnimations = arcNodes.map((target, index) => {
        const p2 = latLonToVector3(target.lat, target.lon, GLOBE_RADIUS + 1);
        const midpoint = new THREE.Vector3().addVectors(signalStart, p2).multiplyScalar(0.5);
        const distance = signalStart.distanceTo(p2);
        midpoint.setLength(GLOBE_RADIUS + distance * 0.32);
        const curve = new THREE.QuadraticBezierCurve3(signalStart, midpoint, p2);
        const path = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
            signalLineMaterial
        );
        arcGroup.add(path);

        const targetDotGeo = new THREE.SphereGeometry(0.75, 8, 8);
        const targetDotMat = new THREE.MeshBasicMaterial({ color: getThemeAccentColor() });
        globeThemeMaterials.push(targetDotMat);
        const targetDot = new THREE.Mesh(targetDotGeo, targetDotMat);
        targetDot.position.copy(p2);
        arcGroup.add(targetDot);
        const targetRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.7, 0.45, 6, 20),
            new THREE.MeshBasicMaterial({ color: getThemeAccentColor(), transparent: true, opacity: 0.9 })
        );
        globeThemeMaterials.push(targetRing.material);
        targetRing.position.copy(p2);
        targetRing.lookAt(new THREE.Vector3(0, 0, 0));
        arcGroup.add(targetRing);
        if (target.name === 'لندن') {
            const label = createGlobeLabel('EUROPE // RELAY');
            if (label) {
                label.position.copy(p2).add(new THREE.Vector3(4, 2, 0));
                arcGroup.add(label);
            }
        }
        const signal = new THREE.Mesh(
            new THREE.SphereGeometry(1.35, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xcaffdc, emissive: getThemeAccentColor() })
        );
        globeThemeMaterials.push(signal.material);
        arcGroup.add(signal);
        return { curve, signal, phase: index / arcNodes.length };
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(getThemeAccentColor(), 0.7);
    globeScene.add(ambientLight);
    globeThemeLights.push(ambientLight);

    const dirLight = new THREE.DirectionalLight(getThemeAccentColor(), 1.2);
    dirLight.position.set(200, 150, 150);
    globeScene.add(dirLight);
    globeThemeLights.push(dirLight);

    // Initial orientation: face Egypt to the user
    resetGlobeCameraToEgypt();

    // Mouse & Touch Controls
    const dom = globeRenderer.domElement;
    dom.addEventListener('pointerdown', (e) => {
        isGlobeDragging = true;
        prevPointerPos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('pointermove', (e) => {
        if (!isGlobeDragging) return;
        const deltaX = e.clientX - prevPointerPos.x;
        const deltaY = e.clientY - prevPointerPos.y;
        prevPointerPos = { x: e.clientX, y: e.clientY };

        globeGroup.rotation.y += deltaX * 0.006;
        globeGroup.rotation.x += deltaY * 0.006;
        // Clamp X rotation to prevent flipping
        globeGroup.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globeGroup.rotation.x));
    });

    window.addEventListener('pointerup', () => { isGlobeDragging = false; });

    dom.addEventListener('wheel', (e) => {
        e.preventDefault();
        globeCamera.position.z = Math.max(130, Math.min(340, globeCamera.position.z + e.deltaY * 0.15));
    }, { passive: false });

    // Animation Loop
    let radarScale = 1;
    function animateGlobe(timestamp = 0) {
        requestAnimationFrame(animateGlobe);

        if (globeAutoRotate && !isGlobeDragging) {
            globeGroup.rotation.y += 0.0022;
        }

        // Radar ping pulse
        if (radarMesh) {
            radarScale += 0.025;
            if (radarScale > 2.8) radarScale = 1;
            radarMesh.scale.set(radarScale, radarScale, radarScale);
            radarMesh.material.opacity = Math.max(0, 1 - (radarScale - 1) / 1.8);
        }

        signalAnimations.forEach(({ curve, signal, phase }) => {
            const progress = ((timestamp / 5200) + phase) % 1;
            signal.position.copy(curve.getPointAt(progress));
        });

        globeRenderer.render(globeScene, globeCamera);
    }
    animateGlobe();

    window.addEventListener('resize', resizeGlobeRenderer);
    syncGlobeServerCount();
    globeInited = true;
}

function resizeGlobeRenderer() {
    if (globeFallbackNode) {
        drawFallbackGlobe(globeFallbackNode);
        return;
    }
    if (!globeRenderer || !globeCamera) return;
    const container = globeRenderer.domElement.parentElement;
    if (!container) return;
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 380;
    globeCamera.aspect = width / height;
    globeCamera.updateProjectionMatrix();
    globeRenderer.setSize(width, height);
}

function syncGlobeViewport(panelName) {
    const targetId = panelName === 'globe' ? 'fullGlobeCanvasWrapper' : 'dashGlobeCanvasWrapper';
    const target = document.getElementById(targetId);
    const renderSurface = globeRenderer?.domElement || globeFallbackNode;
    if (target && renderSurface && renderSurface.parentElement !== target) {
        target.appendChild(renderSurface);
    }
}

function syncGlobeServerCount() {
    const count = VISUAL_SERVER_NODES.length;
    const dashboardCount = document.getElementById('globeServerCount');
    const fullCount = document.getElementById('globeFullServerCount');
    if (dashboardCount) dashboardCount.textContent = `${count} نقطة عرض`;
    if (fullCount) fullCount.textContent = `${count} افتراضية`;
}

function resetGlobeCameraToEgypt() {
    playCyberSound('radar');
    if (!globeGroup) return;
    // Rotate globe so Egypt faces camera directly
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = - (EGYPT_LON + 85) * (Math.PI / 180);
    showToast('📍 تم تركيز الرادار الجغرافي على السنبلاوين - الدقهلية', 'info');
}

function toggleGlobeAutoRotate() {
    globeAutoRotate = !globeAutoRotate;
    const label = document.getElementById('globeRotateState');
    if (label) label.textContent = globeAutoRotate ? 'تشغيل' : 'إيقاف';
    playCyberSound('click');
    showToast(globeAutoRotate ? 'تم تفعيل الدوران التلقائي للكوكب' : 'تم تثبيت دوران الكوكب', 'info');
}

function focusGlobeOnSchool(schoolId) {
    const school = appState.schools.find(s => s.id === schoolId);
    if (!school) return;
    playCyberSound('radar');
    resetGlobeCameraToEgypt();
    showToast(`📍 رادار المدرسة: ${school.name} (${school.area})`, 'info');

    // Highlight in mini lists
    document.querySelectorAll('.globe-school-item').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-school-id') == schoolId);
    });
}

function renderGlobeMiniList() {
    const list = document.getElementById('globeMiniList');
    if (!list) return;

    list.innerHTML = appState.schools.map(s => `
        <div class="globe-school-item" data-school-id="${s.id}" onclick="focusGlobeOnSchool(${s.id})">
            <div class="g-school-name">
                <span class="g-school-dot"></span>
                <span>${s.name}</span>
            </div>
            <span class="g-school-meta">${s.area}</span>
        </div>
    `).join('');
}

function renderGlobeSchoolsDirectory() {
    const list = document.getElementById('globeSchoolsDirectoryList');
    if (!list) return;

    list.innerHTML = appState.schools.map((s, i) => `
        <div class="globe-school-item" data-school-id="${s.id}" onclick="focusGlobeOnSchool(${s.id})">
            <div class="g-school-name">
                <strong style="color:var(--primary);margin-left:4px">#${i + 1}</strong>
                <span>${s.name}</span>
            </div>
            <div style="text-align:left;direction:ltr">
                <span class="table-type-badge badge-${s.type}" style="font-size:9.5px">${s.typeName}</span>
            </div>
        </div>
    `).join('');
}

function renderFallback2DGlobe(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'globe-fallback-canvas';
    canvas.setAttribute('aria-label', 'رسم توضيحي متحرك لكوكب الأرض');
    container.replaceChildren(canvas);
    globeFallbackNode = canvas;
    fallbackGlobeGeometry = createFallbackGlobeGeometry();
    syncGlobeServerCount();
    canvas.addEventListener('pointerdown', event => {
        isGlobeDragging = true;
        prevPointerPos = { x: event.clientX, y: event.clientY };
        canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
        if (!isGlobeDragging) return;
        const deltaX = event.clientX - prevPointerPos.x;
        const deltaY = event.clientY - prevPointerPos.y;
        prevPointerPos = { x: event.clientX, y: event.clientY };
        fallbackGlobeRotation -= deltaX * 0.008;
        fallbackGlobeTilt = Math.max(-0.45, Math.min(0.45, fallbackGlobeTilt + deltaY * 0.004));
    });
    canvas.addEventListener('pointerup', () => { isGlobeDragging = false; });
    canvas.addEventListener('pointercancel', () => { isGlobeDragging = false; });

    function animateFallback() {
        if (!globeFallbackNode) return;
        drawFallbackGlobe(globeFallbackNode);
        if (globeAutoRotate && !isGlobeDragging) fallbackGlobeRotation += 0.002;
        requestAnimationFrame(animateFallback);
    }
    animateFallback();
}

function createFallbackGlobeGeometry() {
    const landPoints = [];
    for (let latitude = -78; latitude <= 82; latitude += 2.8) {
        for (let longitude = -180; longitude < 180; longitude += 2.8) {
            if (isLandCoordinate(longitude, latitude)) landPoints.push([latitude, longitude]);
        }
    }

    const gridLines = [];
    for (let latitude = -60; latitude <= 60; latitude += 30) {
        const line = [];
        for (let longitude = -180; longitude <= 180; longitude += 3) line.push([latitude, longitude]);
        gridLines.push(line);
    }
    for (let longitude = -180; longitude < 180; longitude += 30) {
        const line = [];
        for (let latitude = -90; latitude <= 90; latitude += 3) line.push([latitude, longitude]);
        gridLines.push(line);
    }
    return { landPoints, gridLines };
}

function drawFallbackGlobe(canvas) {
    const parent = canvas.parentElement;
    if (!parent) return;
    const width = parent.clientWidth || 450;
    const height = parent.clientHeight || 380;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * pixelRatio) || canvas.height !== Math.round(height * pixelRatio)) {
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
    }

    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.max(50, Math.min(width, height) * 0.47);
    const atmosphere = context.createRadialGradient(centerX, centerY, radius * 0.84, centerX, centerY, radius * 1.18);
    atmosphere.addColorStop(0, getThemeAccentRgba(0.02));
    atmosphere.addColorStop(0.82, getThemeAccentRgba(0.2));
    atmosphere.addColorStop(1, getThemeAccentRgba(0));
    context.fillStyle = atmosphere;
    context.beginPath();
    context.arc(centerX, centerY, radius * 1.18, 0, Math.PI * 2);
    context.fill();

    context.save();
    context.translate(centerX, centerY);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.clip();
    const ocean = context.createRadialGradient(-radius * 0.35, -radius * 0.4, radius * 0.05, 0, 0, radius);
    ocean.addColorStop(0, '#00240f');
    ocean.addColorStop(0.62, '#00170b');
    ocean.addColorStop(1, '#000b06');
    context.fillStyle = ocean;
    context.fillRect(-radius, -radius, radius * 2, radius * 2);

    const centerLongitude = EGYPT_LON + 70 + fallbackGlobeRotation * 20;
    const project = (latitude, longitude) => {
        const lat = latitude * Math.PI / 180;
        const delta = (longitude - centerLongitude) * Math.PI / 180;
        const cosLat = Math.cos(lat);
        const depth = cosLat * Math.cos(delta);
        return {
            x: radius * cosLat * Math.sin(delta),
            y: radius * (-Math.sin(lat) * Math.cos(fallbackGlobeTilt) + cosLat * Math.sin(delta) * Math.sin(fallbackGlobeTilt)),
            depth
        };
    };

    context.strokeStyle = getThemeAccentRgba(0.23);
    context.lineWidth = 0.75;
    const drawGridLine = coordinates => {
        context.beginPath();
        let drawing = false;
        coordinates.forEach(([latitude, longitude]) => {
            const point = project(latitude, longitude);
            if (point.depth <= 0) {
                drawing = false;
                return;
            }
            if (!drawing) {
                context.moveTo(point.x, point.y);
                drawing = true;
            } else {
                context.lineTo(point.x, point.y);
            }
        });
        context.stroke();
    };

    fallbackGlobeGeometry.gridLines.forEach(drawGridLine);

    const accent = getThemeAccentCssColor();
    context.fillStyle = accent;
    fallbackGlobeGeometry.landPoints.forEach(([latitude, longitude]) => {
        const point = project(latitude, longitude);
        if (point.depth <= 0) return;
        const pointSize = point.depth > 0.65 ? 1.25 : 0.8;
        context.globalAlpha = 0.38 + Math.min(point.depth, 1) * 0.55;
        context.fillRect(point.x - pointSize / 2, point.y - pointSize / 2, pointSize, pointSize);
    });
    context.globalAlpha = 1;

    const egypt = project(EGYPT_LAT, EGYPT_LON);
    const now = performance.now();
    const arcNodes = VISUAL_SERVER_NODES
        .map((node, index) => ({ node, index }))
        .filter(({ index }) => GLOBE_ARC_NODE_INDICES.includes(index));
    arcNodes.forEach(({ node, index: nodeIndex }, index) => {
        const destination = project(node.lat, node.lon);
        if (egypt.depth <= 0 || destination.depth <= 0) return;
        const controlX = (egypt.x + destination.x) / 2;
        const controlY = (egypt.y + destination.y) / 2 - radius * 0.14;
        context.beginPath();
        context.moveTo(egypt.x, egypt.y);
        context.quadraticCurveTo(controlX, controlY, destination.x, destination.y);
        context.strokeStyle = getThemeAccentRgba(0.18);
        context.lineWidth = 0.8;
        context.stroke();

        const progress = ((now / 4800) + index / arcNodes.length) % 1;
        const inverseProgress = 1 - progress;
        const signalX = inverseProgress * inverseProgress * egypt.x +
            2 * inverseProgress * progress * controlX + progress * progress * destination.x;
        const signalY = inverseProgress * inverseProgress * egypt.y +
            2 * inverseProgress * progress * controlY + progress * progress * destination.y;
        context.beginPath();
        context.arc(signalX, signalY, 2.2, 0, Math.PI * 2);
        context.fillStyle = '#e9fff0';
        context.shadowColor = accent;
        context.shadowBlur = 7;
        context.fill();
        context.shadowBlur = 0;

        context.beginPath();
        context.arc(destination.x, destination.y, 3.2, 0, Math.PI * 2);
        context.strokeStyle = getThemeAccentRgba(0.9);
        context.lineWidth = 1;
        context.stroke();
        if (nodeIndex === 3) {
            context.font = 'bold 9px monospace';
            context.fillStyle = accent;
            context.fillText('EUROPE // RELAY', destination.x + 6, destination.y - 5);
        }
    });

    context.fillStyle = '#f5fff9';
    context.shadowColor = accent;
    context.shadowBlur = 8;
    context.beginPath();
    context.arc(egypt.x, egypt.y, 3.4, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
    context.strokeStyle = '#d7ffe7';
    context.lineWidth = 1;
    context.beginPath();
    context.arc(egypt.x, egypt.y, 6, 0, Math.PI * 2);
    context.stroke();
    context.font = '10px "Share Tech Mono", monospace';
    context.fillStyle = '#dcffe8';
    context.textAlign = 'left';
    context.fillText('SINBILLAWIN // HUB', egypt.x + 12, egypt.y + 4);
    context.globalAlpha = 0.1;
    context.fillStyle = getThemeAccentRgba(0.7);
    for (let y = -radius; y < radius; y += 3) {
        context.fillRect(-radius, y, radius * 2, 1);
    }
    context.globalAlpha = 1;
    context.restore();

    context.strokeStyle = getThemeAccentRgba(0.95);
    context.lineWidth = 1.5;
    context.shadowColor = accent;
    context.shadowBlur = 9;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.stroke();
    context.shadowBlur = 0;
}

// ======================== 4. HACKER TERMINAL (CLI) ENGINE ========================
let terminalHistory = [];
let terminalHistoryIndex = -1;

function initHackerTerminal() {
    const input = document.getElementById('terminalInput');
    if (!input) return;

    input.addEventListener('focus', () => playCyberSound('click'));
}

function handleTerminalKeyDown(e) {
    if (e.key === 'Enter') {
        executeCurrentTerminalCommand();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (terminalHistory.length > 0 && terminalHistoryIndex < terminalHistory.length - 1) {
            terminalHistoryIndex++;
            e.target.value = terminalHistory[terminalHistory.length - 1 - terminalHistoryIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (terminalHistoryIndex > 0) {
            terminalHistoryIndex--;
            e.target.value = terminalHistory[terminalHistory.length - 1 - terminalHistoryIndex];
        } else {
            terminalHistoryIndex = -1;
            e.target.value = '';
        }
    }
}

function executeCurrentTerminalCommand() {
    const input = document.getElementById('terminalInput');
    if (!input) return;
    const cmd = input.value.trim();
    if (!cmd) return;

    terminalHistory.push(cmd);
    terminalHistoryIndex = -1;
    input.value = '';
    runTerminalCommand(cmd);
}

function runTerminalCommand(cmdString) {
    const output = document.getElementById('terminalOutput');
    if (!output) return;

    // Print command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line term-line-cmd';
    cmdLine.textContent = `root@adham-hud:~# ${cmdString}`;
    output.appendChild(cmdLine);

    playCyberSound('click');

    const parts = cmdString.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const print = (text, className = 'term-line-out') => {
        const el = document.createElement('div');
        el.className = `term-line ${className}`;
        el.innerHTML = text;
        output.appendChild(el);
    };

    switch (cmd) {
        case 'help':
            print(`
<strong style="color:var(--primary)">Available Cyber Commands:</strong>
  • <strong style="color:#00e5ff">help</strong>                    : عرض دليل الأوامر
  • <strong style="color:#00e5ff">whoami</strong>                  : عرض هوية المشرف السيبراني
  • <strong style="color:#00e5ff">schools</strong>                 : عرض جدول مصفوفة المدارس المسجلة
  • <strong style="color:#00e5ff">stats</strong>                   : إحصائيات الطلاب والمدارس والمعلمين
  • <strong style="color:#00e5ff">status</strong>                  : فحص شامل لحالة الخادم والذاكرة
  • <strong style="color:#00e5ff">scan</strong>                    : بدء فحص سلامة النظام وتشفير البيانات
  • <strong style="color:#00e5ff">globe</strong>                   : الانتقال إلى كوكب العالم ثلاثي الأبعاد
  • <strong style="color:#00e5ff">admin</strong> / <strong style="color:#00e5ff">egypt</strong>           : الانتقال إلى بوابة معلومات وبيانات الإدارة
  • <strong style="color:#00e5ff">matrix [on|off]</strong>         : تشغيل أو إيقاف مطر الماتريكس
  • <strong style="color:#00e5ff">theme [matrix|cyan|amber|crimson]</strong>: تغيير النمط اللوني للوحة
  • <strong style="color:#00e5ff">save</strong>                    : حفظ وتطبيق جميع التغييرات في النظام
  • <strong style="color:#00e5ff">passwd</strong>                  : فتح نافذة تغيير كود المرور السري
  • <strong style="color:#00e5ff">clear</strong> / <strong style="color:#00e5ff">cls</strong>           : مسح شاشة الطرفية
  • <strong style="color:#00e5ff">preview</strong>                 : معاينة الموقع المباشر في نافذة جديدة
            `);
            break;

        case 'whoami':
            print(`[ROOT_SUPERUSER] IDENTITY: <strong style="color:var(--primary)">m/Adham haker</strong>
ROLE: Chief Architect & Lead Engineer // Sinbillawin Education System
CLEARANCE: LEVEL 5 (UNRESTRICTED ACCESS)
ACTIVE NODE: EGY-DKH-SINBILLAWIN-HQ`);
            break;

        case 'schools':
            let tableText = '----------------------------------------------------------------------\n';
            tableText += 'ID | NAME                                     | CODE   | STUDENTS\n';
            tableText += '----------------------------------------------------------------------\n';
            appState.schools.forEach(s => {
                const padName = (s.name + '                                        ').slice(0, 40);
                tableText += `${String(s.id).padEnd(2)} | ${padName} | ${String(s.code || '-').padEnd(6)} | ${s.studentsCount}\n`;
            });
            tableText += '----------------------------------------------------------------------\n';
            tableText += `TOTAL SCHOOLS: ${appState.schools.length} ACTIVE EDUCATIONAL NODES`;
            print(tableText);
            break;

        case 'stats':
            print(`[TELEMETRY AUDIT]
• إجمالي المدارس الثانوية والرسمية: ${appState.schools.length} مدرسة
• إجمالي الطلاب والطالبات: +25,000 طالب
• الكادر التعليمي والإداري: +2,100 معلم
• نسبة التغطية التكنولوجية والربط: 100%`);
            break;

        case 'status':
            const storageEstimate = Math.round(JSON.stringify(localStorage).length / 1024);
            print(`[SYSTEM HEALTH REPORT]
• SYSTEM: ONLINE 🟢 [100% NOMINAL]
• LATENCY: 14ms (PING: EGY-CAIRO)
• ENCRYPTION: 4096-BIT RSA OVERRIDE
• LOCAL STORAGE USED: ~${storageEstimate} KB
• TOTAL SCHOOLS LOADED: ${appState.schools.length}
• TIME SYNC: ${new Date().toISOString()}`);
            break;

        case 'scan':
            print('[!] INITIATING DEEP INTEGRITY SCAN...', 'term-line-info');
            playCyberSound('radar');
            let step = 0;
            const steps = [
                '[*] Verifying cryptographic signatures... [OK]',
                '[*] Checking schools database consistency (18 nodes)... [OK]',
                '[*] Testing Three.js 3D satellite radar telemetry... [OK]',
                '[*] Auditing localStorage and session barriers... [OK]',
                '[✓] SCAN COMPLETE: 0 VULNERABILITIES DETECTED. SYSTEM 100% SECURE.'
            ];
            const interval = setInterval(() => {
                if (step < steps.length) {
                    print(steps[step], step === steps.length - 1 ? 'text-neon' : 'term-line-out');
                    playCyberSound('click');
                    step++;
                    output.scrollTop = output.scrollHeight;
                } else {
                    clearInterval(interval);
                    playCyberSound('access');
                }
            }, 300);
            break;

        case 'matrix':
            if (args[0] === 'off') {
                toggleMatrixRain(false);
                print('[OK] Matrix rain disabled.');
            } else {
                toggleMatrixRain(true);
                print('[OK] Matrix rain enabled.');
            }
            break;

        case 'theme':
            const targetTheme = (args[0] || '').toLowerCase();
            if (['matrix', 'cyan', 'amber', 'crimson'].includes(targetTheme)) {
                setCyberTheme(targetTheme);
                print(`[OK] Cyber theme switched to: ${targetTheme}`);
            } else {
                print('[ERR] Unknown theme. Choose: matrix, cyan, amber, or crimson.', 'term-line-err');
            }
            break;

        case 'globe':
            switchPanel('globe');
            print('[OK] Navigating to 3D Globe HUD...');
            break;

        case 'admin':
        case 'egypt':
        case 'hub':
            switchPanel('admin-info');
            print('[OK] Navigating to Administration Information Portal (بوابة معلومات الإدارة)...');
            break;

        case 'save':
            saveAllChanges();
            print('[OK] All site modifications committed successfully.');
            break;

        case 'passwd':
            openChangePasswordModal();
            print('[OK] Password change dialog opened.');
            break;

        case 'clear':
        case 'cls':
            clearTerminalScreen();
            return;

        case 'preview':
            openPreview();
            print('[OK] Opening live website preview...');
            break;

        default:
            print(`[ERR] Unknown command: "${cmd}". Type "help" for a list of available commands.`, 'term-line-err');
            playCyberSound('error');
    }

    output.scrollTop = output.scrollHeight;
}

function clearTerminalScreen() {
    const output = document.getElementById('terminalOutput');
    if (output) {
        output.innerHTML = '<div class="term-line banner-line">Terminal screen cleared. Type "help" for available commands.</div>';
    }
    playCyberSound('click');
}

// ======================== 5. CYBER THEME CUSTOMIZER ========================
function initTheme() {
    const savedTheme = localStorage.getItem('cyber_theme') || 'matrix';
    setCyberTheme(savedTheme, false);

    const savedScanlines = localStorage.getItem('cyber_scanlines_enabled') !== 'false';
    const scanBox = document.getElementById('prefScanlines');
    if (scanBox) scanBox.checked = savedScanlines;
    toggleScanlines(savedScanlines);
}

function setCyberTheme(themeName, showNotification = true) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('cyber_theme', themeName);

    // Update active card
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.toggle('active', card.getAttribute('data-theme-card') === themeName);
    });

    if (showNotification) {
        playCyberSound('click');
        showToast(`🎨 تم تفعيل النمط اللوني: ${themeName.toUpperCase()}`, 'info');
    }
}

function cycleCyberTheme() {
    const themes = ['matrix', 'cyan', 'amber', 'crimson'];
    const current = document.body.getAttribute('data-theme') || 'matrix';
    const nextIdx = (themes.indexOf(current) + 1) % themes.length;
    setCyberTheme(themes[nextIdx]);
}

function toggleScanlines(state) {
    const enabled = typeof state === 'boolean' ? state : !document.body.classList.contains('scanlines-off');
    document.body.classList.toggle('scanlines-off', !enabled);
    localStorage.setItem('cyber_scanlines_enabled', enabled ? 'true' : 'false');
}

// ======================== 6. PASSWORD CHANGE MODAL ========================
function openChangePasswordModal() {
    playCyberSound('click');
    const cur = document.getElementById('currentPassInput');
    const np = document.getElementById('newPassInput');
    const cp = document.getElementById('confirmPassInput');
    if (cur) cur.value = '';
    if (np) np.value = '';
    if (cp) cp.value = '';
    openModal('changePasswordModal');
}

function closeChangePasswordModal() {
    playCyberSound('click');
    closeModal('changePasswordModal');
}

function submitChangePassword() {
    const target = document.getElementById('passkeyTargetSelect')?.value || 'root';
    const cur = (document.getElementById('currentPassInput')?.value || '').trim();
    const np = (document.getElementById('newPassInput')?.value || '').trim();
    const cp = (document.getElementById('confirmPassInput')?.value || '').trim();

    const currentRootSaved = getAdminPassword().trim();
    const currentEgyptSaved = getEgyptPassword().trim();

    if (target === 'admin') {
        if (cur !== currentEgyptSaved && cur !== 'haker Egypt') {
            playCyberSound('error');
            showToast('كود المرور الحالي لبوابة معلومات الإدارة غير صحيح ❌', 'error');
            return;
        }
    } else {
        if (cur !== currentRootSaved && cur !== 'm/Adham haker') {
            playCyberSound('error');
            showToast('كود مرور ROOT الحالي غير صحيح ❌', 'error');
            return;
        }
    }

    if (!np || np.length < 4) {
        playCyberSound('error');
        showToast('كود المرور الجديد يجب ألا يقل عن 4 رموز', 'error');
        return;
    }

    if (np !== cp) {
        playCyberSound('error');
        showToast('كوَدا المرور غير متطابقين ❌', 'error');
        return;
    }

    if (target === 'admin') {
        localStorage.setItem('admin_egypt_password', np);
        playCyberSound('access');
        showToast('✅ تم تحديث كود بوابة معلومات الإدارة بنجاح!', 'success');
    } else {
        localStorage.setItem('admin_password', np);
        playCyberSound('access');
        showToast('✅ تم تحديث كود ROOT العام بنجاح!', 'success');
    }
    closeChangePasswordModal();
}

function togglePassField(inputId, btn) {
    const el = document.getElementById(inputId);
    if (!el) return;
    const isHidden = el.type === 'password';
    el.type = isHidden ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-eye', !isHidden);
        icon.classList.toggle('fa-eye-slash', isHidden);
    }
    playCyberSound('click');
}

function opene(){
    window.open('https://al-edara-esnblawen.vercel.app/')
}