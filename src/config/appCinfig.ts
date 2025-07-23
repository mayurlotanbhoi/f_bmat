import { varIcon, vadhuIcon } from "../util/images.util";

export const appConfig = {
    "_id": "app_config",
    "app": {
        "name": "Bhoi Wedding",
        "slug": "bhoiwedding",
        "version": "1.2.0",
        "tagline": "Connecting Brides & Grooms in Samaj",
        "logo": {
            "light": "/assets/logo-light.png",
            "dark": "/assets/logo-dark.png",
            "favicon": "/assets/favicon.ico"
        },
        "theme": {
            "primaryColor": "#db2777",
            "font": "Poppins, sans-serif"
        },
        "defaultLanguage": "en"
    },
    "category": [
        {
            key: 'job',
            text: 'Job',
            image: varIcon,
            gradientFrom: '#ff9a9e',
            gradientTo: '#fad0c4',
        },
        {
            key: 'nearBy',
            text: '10th, 12th',
            image: vadhuIcon,
            gradientFrom: '#a18cd1',
            gradientTo: '#fbc2eb',
        },
        {
            key: '10-12',
            text: '10th, 12th',
            image: vadhuIcon,
            gradientFrom: '#a18cd1',
            gradientTo: '#fbc2eb',
        },
        {
            key: 'matches',
            text: 'Matches',
            image: varIcon,
            gradientFrom: '#fbc2eb',
            gradientTo: '#a6c1ee',
        },
        {
            key: 'like',
            text: 'Like',
            image: vadhuIcon,
            gradientFrom: '#fddb92',
            gradientTo: '#d1fdff',
        },
    ],



    "mainMenu": [
        {
            "key": "bride",
            "disKey": "brideDis",
            "url": "/profile",
            "text": "vadhu",
            "description": "View All Vadhu",
            "icon": "👰",
            "accessLevel": "public"
        },
        {
            "key": "groom",
            "disKey": "groomDis",
            "url": "/profile",
            "text": "var",
            "description": "View All Var",
            "icon": "🤵",
            "accessLevel": "public"
        },
        {
            "key": "widow",
            "disKey": "widowDis",
            "url": "/profile",
            "text": "widow",
            "description": "View All Widow",
            "icon": "❤️",
            "accessLevel": "private"
        },
        {
            "key": "divorcee",
            "disKey": "divorceeDis",
            "url": "/profile",
            "text": "Divorcee",
            "description": "View All Divorcee",
            "icon": "📃",
            "accessLevel": "public"
        }
    ]
    ,



    "roles": {
        "guest": {
            "label": "Guest",
            "permissions": ["view_home", "search_profiles", "view_terms"],
            "access": {
                "showRegisterCTA": true,
                "features": {
                    "viewProfiles": true,
                    "expressInterest": false,
                    "chat": false
                }
            }
        },
        "member": {
            "label": "Member",
            "permissions": ["edit_profile", "express_interest", "view_matches"],
            "access": {
                "showRegisterCTA": false,
                "features": {
                    "viewProfiles": true,
                    "expressInterest": true,
                    "chat": false
                }
            },
            "termsVersionAccepted": "1.0"
        },
        "admin": {
            "label": "Admin",
            "permissions": ["manage_users", "view_stats", "edit_config"],
            "access": {
                "features": {
                    "dashboard": true,
                    "profileModeration": true,
                    "userApproval": true
                }
            }
        },
        "superadmin": {
            "label": "Super Admin",
            "permissions": ["*"],
            "access": {
                "features": {
                    "everything": true
                }
            }
        }
    },

    "terms": {
        "latestVersion": "1.1",
        "lastUpdated": "2025-05-01T00:00:00.000Z",
        "requireAcceptance": true,
        "acceptedBy": {
            "guest": false,
            "member": true,
            "admin": true
        },
        "content": {
            "title": "Terms and Conditions",
            "html": "<h1>Welcome to Bhoi Wedding</h1><p>By using our services, you agree to the following terms...</p>"
        }
    },

    "menus": {
        "header": [
            { "label": "Home", "path": "/", "roles": ["guest", "member", "admin"] },
            { "label": "Vadhu", "path": "/vadhu", "roles": ["guest", "member", "admin"] },
            { "label": "Var", "path": "/var", "roles": ["guest", "member", "admin"] },
            { "label": "Matches", "path": "/matches", "roles": ["member", "admin"] },
            { "label": "Admin Panel", "path": "/admin", "roles": ["admin", "superadmin"] }
        ],
        "footer": [
            { "label": "Privacy Policy", "path": "/privacy-policy" },
            { "label": "Terms of Service", "path": "/terms" },
            { "label": "Support", "path": "/support" }
        ]
    },

    "features": {
        "qrCodeAccess": true,
        "verifiedProfiles": true,
        "maintenanceMode": false,
        "locationFilter": true,
        "gotraFilter": true
    },

    "banners": {
        "home": {
            "image": "/assets/banner-home.webp",
            "alt": "Find Your Match",
            "cta": {
                "text": "Register Now",
                "link": "/register"
            }
        }
    },

    "contact": {
        "email": "support@bhoiwedding.com",
        "phone": "+91 99999 99999",
        "whatsapp": "https://wa.me/919999999999",
        "address": "Bhoi Nagar, Surat, Gujarat, India"
    },

    "meta": {
        "seo": {
            "title": "Bhoi Wedding - Find Your Life Partner",
            "description": "Best matrimonial platform for Bhoi samaj.",
            "canonicalUrl": "https://bhoiwedding.com",
            "robots": "index, follow"
        },
        "analytics": {
            "googleAnalyticsId": "G-XXXXXX",
            "facebookPixelId": "1234567890"
        }
    },

    "social": {
        "facebook": "https://facebook.com/bhoiwedding",
        "instagram": "https://instagram.com/bhoiwedding",
        "youtube": "https://youtube.com/@bhoiwedding"
    },

    "legal": {
        "privacyPolicyUrl": "/privacy-policy",
        "termsUrl": "/terms",
        "disclaimer": "Profiles are visible only to verified users. We do not take responsibility for fake information."
    },

    "support": {
        "faqUrl": "/faq",
        "liveChatEnabled": false
    },

    "updatedAt": "2025-05-18T05:30:00.000Z"
}
