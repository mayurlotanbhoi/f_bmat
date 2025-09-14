import { useState } from "react";



const translations = {
    en: {
        title: "Terms of Use and Privacy Policy",
        terms: {
            introduction: {
                title: "Introduction",
                content: `
              Please carefully read the following Terms of Use before using https://bhoi.joodi.in. By accessing and using the services of https://bhoi.joodi.in, you agree to be bound by these Terms of Use. If you do not agree, please do not access or use https://bhoi.joodi.in.
              We reserve the right to modify these Terms of Use at any time without prior notice. Your continued use of https://bhoi.joodi.in following any modification constitutes your agreement to the updated Terms of Use.
              Any additional terms, disclaimers, privacy policies, and other policies applicable to specific areas of https://bhoi.joodi.in are also considered part of these Terms of Use.
            `
            },
            ageRestrictions: {
                title: "Age Restrictions",
                content: `
              https://bhoi.joodi.in is only available for adults (individuals aged 18 years or older). No persons under the age of 18 (or 21 in places where 18 is not the age of majority) may directly or indirectly view, possess, or use https://bhoi.joodi.in.
              By using https://bhoi.joodi.in, you affirm and warrant that you are at least 18 years of age (or 21 where applicable) and are capable of lawfully entering into and performing all obligations set forth in this agreement.
            `
            },
            safety: {
                title: "Safety",
                content: `
              https://bhoi.joodi.in is not responsible for your use of the platform or for the actions of other users with whom you may exchange information or have contact. We do not conduct criminal background screenings of users or verify information provided by users regarding their health, physical condition, or otherwise.
              You must make informed decisions about using https://bhoi.joodi.in in your location and assess any potential adverse consequences. Registered users may contact each other via call or SMS to connect, as facilitated by the platform.
            `
            },
            registration: {
                title: "Registration",
                content: `
              To use the services of https://bhoi.joodi.in, registration is optional for browsing but required for creating a profile or contacting other users. You agree to provide accurate and complete registration information, including your name, contact number, and a valid email address. Registered users can call or SMS other users to connect, as per the platform's functionality.
              Read our Privacy Policy to understand how we use your personal information.
            `
            },
            contentSubmission: {
                title: "Content Submission",
                content: `
              https://bhoi.joodi.in acts as a platform for posting user-submitted content and is not obligated to screen communications or content in advance. We may investigate and remove content that violates these Terms of Use at our discretion.
              By submitting content, you grant https://bhoi.joodi.in and its affiliates a royalty-free, perpetual, irrevocable, non-exclusive right to use, reproduce, modify, publish, and distribute the content worldwide in any form or media.
            `
            },
            listingPolicy: {
                title: "Listing Policy and Conduct",
                content: `
              Duplicate user profiles are not allowed. Creating multiple profiles may result in account suspension. We do not guarantee that your profile will always appear on https://bhoi.joodi.in, and we reserve the right to remove listings that violate these Terms of Use.
              You agree not to post content that is unlawful, harmful, threatening, abusive, defamatory, or invasive of another's privacy. Prohibited content includes, but is not limited to, material related to prostitution, child pornography, or misleading information.
            `
            },
            warrantyDisclaimer: {
                title: "Warranty Disclaimer",
                content: `
              https://bhoi.joodi.in and its content are provided "as is" without any warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that defects or errors will be corrected or that the content is free of viruses or other harmful components.
            `
            },
            contact: {
                title: "Contact Us",
                content: `
              If you have questions, comments, or concerns about our Terms of Use or wish to cancel your account, please contact us at support@https://bhoi.joodi.in.
            `
            }
        },
        privacy: {
            title: "Privacy Policy",
            introduction: {
                title: "Introduction",
                content: `
              This Privacy Policy outlines how https://bhoi.joodi.in uses and protects your information when you use our platform. We are committed to ensuring your privacy is protected. Any information you provide will be used in accordance with this Privacy Policy.
              We may update this Privacy Policy periodically, so please check this page to stay informed of any changes.
            `
            },
            dataCollection: {
                title: "What Personal Information We Collect",
                content: `
              We collect the following information during registration on https://bhoi.joodi.in:
              - Your Name
              - Your Age
              - Other Personal Details (e.g., family details, financial details)
              - Contact Information (email address, mobile number)
              - Current Location
              - Information about your interactions with other users
            `
            },
            dataUsage: {
                title: "What We Do With the Information",
                content: `
              We use your information to:
              - Facilitate communication between registered users via call or SMS.
              - Maintain internal records.
              - Ensure age eligibility (18+ for females, 21+ for males).
              - Send promotional emails about new features or offers, if you opt-in.
            `
            },
            dataSharing: {
                title: "Data Sharing",
                content: `
              Your contact information (email address, mobile number, and location) will be shared with other registered users to enable communication via call or SMS. If you do not want your information shared, please do not use https://bhoi.joodi.in.
              We do not sell or share your personal information with third-party marketing or advertising agencies.
            `
            },
            security: {
                title: "Security",
                content: `
              We are committed to ensuring your information is secure. We implement reasonable measures to protect your data, but we cannot guarantee absolute security.
            `
            },
            dataDeletion: {
                title: "Data Deletion Instructions",
                content: `
              To delete your data from https://bhoi.joodi.in:
              1. Log in to your https://bhoi.joodi.in account.
              2. Navigate to your account details page.
              3. Select the option to delete your account.
            `
            },
            cookies: {
                title: "Cookies",
                content: `
              https://bhoi.joodi.in uses third-party services that may place cookies to collect information about your visits. You can disable cookies by adjusting your browser settings.
            `
            }
        }
    },
    hi: {
        title: "उपयोग की शर्तें और गोपनीयता नीति",
        terms: {
            introduction: {
                title: "परिचय",
                content: `
              कृपया https://bhoi.joodi.in का उपयोग करने से पहले निम्नलिखित उपयोग की शर्तों को ध्यान से पढ़ें। https://bhoi.joodi.in की सेवाओं का उपयोग करने से आप इन उपयोग की शर्तों से बाध्य होने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया https://bhoi.joodi.in का उपयोग न करें।
              हम किसी भी समय बिना पूर्व सूचना के इन उपयोग की शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। संशोधन के बाद https://bhoi.joodi.in का उपयोग करने से आप संशोधित शर्तों का पालन करने के लिए सहमत होते हैं।
            `
            },
            ageRestrictions: {
                title: "आयु प्रतिबंध",
                content: `
              https://bhoi.joodi.in केवल वयस्कों (18 वर्ष या उससे अधिक आयु के व्यक्तियों) के लिए उपलब्ध है। 18 वर्ष से कम आयु के व्यक्ति (या जहां 18 वर्ष बहुमत की आयु नहीं है, वहां 21 वर्ष) https://bhoi.joodi.in का उपयोग नहीं कर सकते।
              https://bhoi.joodi.in का उपयोग करके, आप पुष्टि करते हैं कि आप कम से कम 18 वर्ष (या लागू होने पर 21 वर्ष) के हैं और इस समझौते में निर्धारित सभी दायित्वों को कानूनी रूप से पूरा करने में सक्षम हैं।
            `
            },
            safety: {
                title: "सुरक्षा",
                content: `
              https://bhoi.joodi.in आपके उपयोग या अन्य उपयोगकर्ताओं के कार्यों के लिए जिम्मेदार नहीं है, जिनके साथ आप जानकारी साझा कर सकते हैं या संपर्क कर सकते हैं। हम उपयोगकर्ताओं की आपराधिक पृष्ठभूमि की जांच नहीं करते हैं या उनके द्वारा प्रदान की गई जानकारी को सत्यापित नहीं करते हैं।
              आपको अपने स्थान पर https://bhoi.joodi.in का उपयोग करने के बारे में सूचित निर्णय लेना होगा। पंजीकृत उपयोगकर्ता एक-दूसरे से कॉल या SMS के माध्यम से संपर्क कर सकते हैं।
            `
            },
            registration: {
                title: "पंजीकरण",
                content: `
              https://bhoi.joodi.in की सेवाओं का उपयोग करने के लिए पंजीकरण वैकल्पिक है, लेकिन प्रोफाइल बनाने या अन्य उपयोगकर्ताओं से संपर्क करने के लिए आवश्यक है। आप सटीक और पूर्ण पंजीकरण जानकारी प्रदान करने के लिए सहमत हैं, जिसमें आपका नाम, संपर्क नंबर और एक वैध ईमेल पता शामिल है।
              हमारी गोपनीयता नीति पढ़ें ताकि यह समझ सकें कि हम आपकी व्यक्तिगत जानकारी का उपयोग कैसे करते हैं।
            `
            },
            contentSubmission: {
                title: "सामग्री प्रस्तुति",
                content: `
              https://bhoi.joodi.in उपयोगकर्ता द्वारा प्रस्तुत सामग्री को पोस्ट करने का मंच है और सामग्री को पहले से जांचने की कोई जिम्मेदारी नहीं लेता। हम ऐसी सामग्री को हटा सकते हैं जो इन उपयोग की शर्तों का उल्लंघन करती हो।
              सामग्री जमा करके, आप https://bhoi.joodi.in को विश्व स्तर पर सामग्री का उपयोग, पुनरुत्पादन, संशोधन, प्रकाशन और वितरण करने का अधिकार प्रदान करते हैं।
            `
            },
            listingPolicy: {
                title: "लिस्टिंग नीति और आचरण",
                content: `
              डुप्लिकेट उपयोगकर्ता प्रोफाइल की अनुमति नहीं है। एक से अधिक प्रोफाइल बनाने से खाता निलंबन हो सकता है। हम यह गारंटी नहीं देते कि आपका प्रोफाइल हमेशा https://bhoi.joodi.in पर दिखाई देगा।
              आप ऐसी सामग्री पोस्ट नहीं करेंगे जो गैरकानूनी, हानिकारक, धमकी देने वाली, अपमानजनक या किसी की गोपनीयता का उल्लंघन करने वाली हो।
            `
            },
            warrantyDisclaimer: {
                title: "वारंटी अस्वीकरण",
                content: `
              https://bhoi.joodi.in और इसकी सामग्री "जैसी है" प्रदान की जाती है, बिना किसी प्रकार की वारंटी के। हम यह नहीं गारंटी देते कि दोष या त्रुटियां ठीक की जाएंगी या सामग्री वायरस या अन्य हानिकारक घटकों से मुक्त है।
            `
            },
            contact: {
                title: "हमसे संपर्क करें",
                content: `
              यदि आपके कोई प्रश्न, टिप्पणियां या चिंताएं हैं या आप अपना खाता रद्द करना चाहते हैं, तो कृपया हमसे support@https://bhoi.joodi.in पर संपर्क करें।
            `
            }
        },
        privacy: {
            title: "गोपनीयता नीति",
            introduction: {
                title: "परिचय",
                content: `
              यह गोपनीयता नीति बताती है कि https://bhoi.joodi.in आपके द्वारा उपयोग किए जाने पर आपकी जानकारी का उपयोग और संरक्षण कैसे करता है। हम आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध हैं। आपकी जानकारी इस गोपनीयता नीति के अनुसार उपयोग की जाएगी।
              हम इस गोपनीयता नीति को समय-समय पर अपडेट कर सकते हैं, इसलिए कृपया इस पेज को जांचें।
            `
            },
            dataCollection: {
                title: "हम कौन सी व्यक्तिगत जानकारी एकत्र करते हैं",
                content: `
              https://bhoi.joodi.in पर पंजीकरण के समय हम निम्नलिखित जानकारी एकत्र करते हैं:
              - आपका नाम
              - आपकी आयु
              - अन्य व्यक्तिगत विवरण (जैसे, परिवार विवरण, वित्तीय विवरण)
              - संपर्क जानकारी (ईमेल पता, मोबाइल नंबर)
              - वर्तमान स्थान
              - अन्य उपयोगकर्ताओं के साथ आपकी बातचीत की जानकारी
            `
            },
            dataUsage: {
                title: "हम जानकारी के साथ क्या करते हैं",
                content: `
              हम आपकी जानकारी का उपयोग निम्नलिखित के लिए करते हैं:
              - पंजीकृत उपयोगकर्ताओं के बीच कॉल या SMS के माध्यम से संचार की सुविधा।
              - आंतरिक रिकॉर्ड रखने के लिए।
              - आयु पात्रता सुनिश्चित करने के लिए (महिलाओं के लिए 18+, पुरुषों के लिए 21+)।
              - नए फीचर्स या ऑफर्स के बारे में प्रचारात्मक ईमेल भेजने के लिए, यदि आप ऑप्ट-इन करते हैं।
            `
            },
            dataSharing: {
                title: "डेटा साझाकरण",
                content: `
              आपकी संपर्क जानकारी (ईमेल पता, मोबाइल नंबर, और स्थान) अन्य पंजीकृत उपयोगकर्ताओं के साथ साझा की जाएगी ताकि कॉल या SMS के माध्यम से संचार हो सके। यदि आप नहीं चाहते कि आपकी जानकारी साझा की जाए, तो कृपया https://bhoi.joodi.in का उपयोग न करें।
              हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष के विपणन या विज्ञापन एजेंसियों के साथ नहीं बेचते या साझा करते।
            `
            },
            security: {
                title: "सुरक्षा",
                content: `
              हम आपकी जानकारी को सुरक्षित रखने के लिए प्रतिबद्ध हैं। हम आपकी जानकारी की सुरक्षा के लिए उचित उपाय लागू करते हैं, लेकिन पूर्ण सुरक्षा की गारंटी नहीं दे सकते।
            `
            },
            dataDeletion: {
                title: "डेटा हटाने के निर्देश",
                content: `
              https://bhoi.joodi.in से अपनी डेटा हटाने के लिए:
              1. अपने https://bhoi.joodi.in खाते में लॉग इन करें।
              2. अपने खाता विवरण पेज पर जाएं।
              3. अपने खाते को हटाने का विकल्प चुनें।
            `
            },
            cookies: {
                title: "कुकीज़",
                content: `
              https://bhoi.joodi.in तृतीय-पक्ष सेवाओं का उपयोग करता है जो आपकी यात्राओं के बारे में जानकारी एकत्र करने के लिए कुकीज़ का उपयोग कर सकता है। आप अपने ब्राउज़र सेटिंग्स को समायोजित करके कुकीज़ को अक्षम कर सकते हैं।
            `
            }
        }
    },
    mr: {
        title: "वापराच्या अटी आणि गोपनीयता धोरण",
        terms: {
            introduction: {
                title: "प्रस्तावना",
                content: `
              कृपया https://bhoi.joodi.in वापरण्यापूर्वी खालील वापराच्या अटी काळजीपूर्वक वाचा. https://bhoi.joodi.in च्या सेवांचा वापर करून, तुम्ही या वापराच्या अटींनी बांधील राहण्यास सहमती देता. तुम्ही या अटींशी सहमत नसल्यास, कृपया https://bhoi.joodi.in चा वापर करू नका.
              आम्ही कोणत्याही पूर्वसूचनेशिवाय या वापराच्या अटी कधीही बदलण्याचा अधिकार राखून ठेवतो. बदलानंतर https://bhoi.joodi.in चा वापर करणे म्हणजे तुम्ही सुधारित अटींचे पालन करण्यास सहमती देता.
            `
            },
            ageRestrictions: {
                title: "वय प्रतिबंध",
                content: `
              https://bhoi.joodi.in फक्त प्रौढांसाठी (18 वर्षे किंवा त्याहून अधिक वयाच्या व्यक्तींसाठी) उपलब्ध आहे. 18 वर्षांपेक्षा कमी वयाच्या व्यक्ती (किंवा जिथे 18 वर्षे बहुमताचे वय नाही, तिथे 21 वर्षे) https://bhoi.joodi.in चा वापर करू शकत नाहीत.
              https://bhoi.joodi.in चा वापर करून, तुम्ही पुष्टी करता की तुमचे वय किमान 18 वर्षे (किंवा लागू असल्यास 21 वर्षे) आहे आणि तुम्ही या करारात नमूद केलेल्या सर्व जबाबदाऱ्या कायदेशीररित्या पूर्ण करण्यास सक्षम आहात.
            `
            },
            safety: {
                title: "सुरक्षा",
                content: `
              https://bhoi.joodi.in तुमच्या वापरासाठी किंवा इतर वापरकर्त्यांच्या कृतींसाठी जबाबदार नाही, ज्यांच्याशी तुम्ही माहिती शेअर करू शकता किंवा संपर्क साधू शकता. आम्ही वापरकर्त्यांची गुन्हेगारी पार्श्वभूमी तपासणी करत नाही किंवा त्यांनी दिलेली माहिती सत्यापित करत नाही.
              तुम्हाला तुमच्या स्थानावर https://bhoi.joodi.in चा वापर करण्याबाबत माहितीपूर्ण निर्णय घ्यावा लागेल. नोंदणीकृत वापरकर्ते कॉल किंवा SMS द्वारे एकमेकांशी संपर्क साधू शकतात.
            `
            },
            registration: {
                title: "नोंदणी",
                content: `
              https://bhoi.joodi.in च्या सेवांचा वापर करण्यासाठी नोंदणी ऐच्छिक आहे, परंतु प्रोफाइल तयार करण्यासाठी किंवा इतर वापरकर्त्यांशी संपर्क साधण्यासाठी आवश्यक आहे. तुम्ही अचूक आणि पूर्ण नोंदणी माहिती प्रदान करण्यास सहमती देता, ज्यामध्ये तुमचे नाव, संपर्क क्रमांक आणि वैध ईमेल पत्ता समाविष्ट आहे.
              आमचे गोपनीयता धोरण वाचा जेणेकरून तुम्हाला आम्ही तुमच्या वैयक्तिक माहितीचा वापर कसा करतो हे समजेल.
            `
            },
            contentSubmission: {
                title: "सामग्री सादर करणे",
                content: `
              https://bhoi.joodi.in वापरकर्त्याने सादर केलेल्या सामग्रीसाठी मंच आहे आणि सामग्रीची आधी तपासणी करण्याची कोणतीही जबाबदारी घेत नाही. आम्ही या वापराच्या अटींचे उल्लंघन करणारी सामग्री हटवू शकतो.
              सामग्री सादर करून, तुम्ही https://bhoi.joodi.in ला जागतिक स्तरावर सामग्रीचा वापर, पुनरुत्पादन, सुधारणा, प्रकाशन आणि वितरण करण्याचा अधिकार प्रदान करता.
            `
            },
            listingPolicy: {
                title: "लिस्टिंग धोरण आणि आचरण",
                content: `
              डुप्लिकेट वापरकर्ता प्रोफाइलला परवानगी नाही. एकापेक्षा जास्त प्रोफाइल तयार केल्यास खाते निलंबित होऊ शकते. आम्ही हमी देत नाही की तुमचे प्रोफाइल नेहमी https://bhoi.joodi.in वर दिसेल.
              तुम्ही बेकायदेशीर, हानिकारक, धमकी देणारी, अपमानास्पद किंवा कोणाच्या गोपनीयतेचे उल्लंघन करणारी सामग्री पोस्ट करणार नाही.
            `
            },
            warrantyDisclaimer: {
                title: "वॉरंटी अस्वीकरण",
                content: `
              https://bhoi.joodi.in आणि त्याची सामग्री "जशी आहे" प्रदान केली जाते, कोणत्याही प्रकारच्या वॉरंटीशिवाय. आम्ही दोष किंवा त्रुटी दुरुस्त केल्या जातील याची हमी देत नाही किंवा सामग्री व्हायरस किंवा इतर हानिकारक घटकांपासून मुक्त आहे.
            `
            },
            contact: {
                title: "आमच्याशी संपर्क साधा",
                content: `
              तुम्हाला कोणतेही प्रश्न, टिप्पण्या किंवा चिंता असल्यास किंवा तुम्हाला तुमचे खाते रद्द करायचे असल्यास, कृपया आमच्याशी support@https://bhoi.joodi.in वर संपर्क साधा.
            `
            }
        },
        privacy: {
            title: "गोपनीयता धोरण",
            introduction: {
                title: "प्रस्तावना",
                content: `
              हे गोपनीयता धोरण https://bhoi.joodi.in तुमच्या माहितीचा वापर आणि संरक्षण कसे करते याची रूपरेषा देते. आम्ही तुमच्या गोपनीयतेचे संरक्षण करण्यासाठी वचनबद्ध आहोत. तुम्ही प्रदान केलेली कोणतीही माहिती या गोपनीयता धोरणानुसार वापरली जाईल.
              आम्ही या गोपनीयता धोरणाला वेळोवेळी अद्यतन करू शकतो, म्हणून कृपया या पृष्ठाची तपासणी करा.
            `
            },
            dataCollection: {
                title: "आम्ही कोणती वैयक्तिक माहिती गोळा करतो",
                content: `
              https://bhoi.joodi.in वर नोंदणीच्या वेळी आम्ही खालील माहिती गोळा करतो:
              - तुमचे नाव
              - तुमचे वय
              - इतर वैयक्तिक तपशील (उदा., कुटुंब तपशील, आर्थिक तपशील)
              - संपर्क माहिती (ईमेल पत्ता, मोबाइल क्रमांक)
              - सध्याचे स्थान
              - इतर वापरकर्त्यांशी तुमच्या संवादाची माहिती
            `
            },
            dataUsage: {
                title: "माहितीचा वापर",
                content: `
              आम्ही तुमच्या माहितीचा उपयोग खालील कारणांसाठी करतो:
              - नोंदणीकृत वापरकर्त्यांमध्ये कॉल किंवा SMS द्वारे संवाद सुलभ करण्यासाठी.
              - अंतर्गत रेकॉर्ड ठेवण्यासाठी.
              - वय पात्रता सुनिश्चित करण्यासाठी (महिलांसाठी 18+, पुरुषांसाठी 21+).
              - नवीन वैशिष्ट्ये किंवा ऑफरबद्दल प्रचारात्मक ईमेल पाठवण्यासाठी, जर तुम्ही ऑप्ट-इन केले असेल.
            `
            },
            dataSharing: {
                title: "डेटा शेअरिंग",
                content: `
              तुमची संपर्क माहिती (ईमेल पत्ता, मोबाइल क्रमांक आणि स्थान) इतर नोंदणीकृत वापरकर्त्यांसह शेअर केली जाईल जेणेकरून कॉल किंवा SMS द्वारे संवाद होऊ शकेल. तुम्हाला तुमची माहिती शेअर करायची नसेल तर कृपया https://bhoi.joodi.in चा वापर करू नका.
              आम्ही तुमची वैयक्तिक माहिती तृतीय-पक्ष विपणन किंवा जाहिरात एजन्सींना विकत नाही किंवा शेअर करत नाही.
            `
            },
            security: {
                title: "सुरक्षा",
                content: `
              आम्ही तुमची माहिती सुरक्षित ठेवण्यासाठी वचनबद्ध आहोत. आम्ही तुमच्या डेटाचे संरक्षण करण्यासाठी वाजवी उपाययोजना करतो, परंतु पूर्ण सुरक्षिततेची हमी देऊ शकत नाही.
            `
            },
            dataDeletion: {
                title: "डेटा हटवण्याचे निर्देश",
                content: `
              https://bhoi.joodi.in वरून तुमचा डेटा हटवण्यासाठी:
              1. तुमच्या https://bhoi.joodi.in खात्यात लॉग इन करा.
              2. तुमच्या खाते तपशील पृष्ठावर जा.
              3. तुमचे खाते हटवण्याचा पर्याय निवडा.
            `
            },
            cookies: {
                title: "कुकीज",
                content: `
              https://bhoi.joodi.in तृतीय-पक्ष सेवांचा वापर करते जे तुमच्या भेटींबद्दल माहिती गोळा करण्यासाठी कुकीज वापरू शकतात. तुम्ही तुमच्या ब्राउझर सेटिंग्ज समायोजित करून कुकीज अक्षम करू शकता.
            `
            }
        }
    }
};

const TermsAndPrivacy = () => {
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    const t = translations[language];

    return (
        <div className="max-w-4xl md:mt-10 mx-auto  rounded-lg " >
            <h1 className="text-3xl font-bold text-center mb-6" > { t.title } </h1>

                < div className = "flex justify-center mb-6" >
                    <button
                onClick={ () => handleLanguageChange('en') }
    className = {`px-4 py-2 mx-2 rounded ${language === 'en' ? 'bg_primary text-white' : 'bg-gray-200'}`
}
              >
    English
    </button>
    < button
onClick = {() => handleLanguageChange('hi')}
            className={`px-4 py-2 mx-2 rounded ${language === 'hi' ? 'bg_primary text-white' : 'bg-gray-200'}`}
              >
    Hindi
    </button>
    < button
onClick = {() => handleLanguageChange('mr')}
            className={`px-4 py-2 mx-2 rounded ${language === 'mr' ? 'bg_primary text-white' : 'bg-gray-200'}`}
              >
    Marathi
    </button>
    </div>

    < h2 className = "text-2xl font-semibold mt-8 mb-4" > Terms of Use </h2>
{
    Object.keys(t.terms).map((section) => (
        <div key= { section } className = "mb-6" >
        <h3 className="text-xl font-medium mb-2" > { t.terms[section].title } </h3>
    < p className = "text-gray-700 whitespace-pre-line" > { t.terms[section].content } </p>
    </div>
    ))
}

<h2 className="text-2xl font-semibold " > Privacy Policy </h2>
{
    Object.keys(t.privacy).map((section) => (
        <div key= { section } className = "mb-6" >
        <h3 className="text-xl font-medium mb-2" > { t.privacy[section].title } </h3>
    < p className = "text-gray-700 whitespace-pre-line" > { t.privacy[section].content } </p>
    </div>
    ))
}
</div>

      );
    };

    export default TermsAndPrivacy;
