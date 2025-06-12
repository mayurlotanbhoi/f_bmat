import { useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge } from '../../util/dateFormat';

const MatrimonyBioData = () => {
  const pageRef = useRef(null);
  const profile = getMatrimony();
  const biodataUrl = `https://yourapp.com/memberQr/${profile.matId}`;

  const downloadAsImage = async () => {
    const canvas = await html2canvas(pageRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 700
    });

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'biodata.png';
    link.click();
  };

  const Info = ({ label, value }) => (
    <div className="flex gap-2">
      <div className="w-[120px] text-gray-600 font-medium text-right">{label}:</div>
      <div className="text-gray-900 font-medium">{value}</div>
    </div>
  );

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      <div
        ref={pageRef}
        className="bg-white w-[794px] min-h-[1123px] p-6 shadow-xl text-[13px] leading-tight border border-gray-300 rounded-md"
        style={{ fontFamily: 'Segoe UI, sans-serif' }}
      >
        <div className="flex justify-between items-start border-b-2 border-indigo-700 pb-3 mb-4">
          <div className="flex flex-col items-start">
            <img src="/logo.png" className="h-16 w-auto mb-1" alt="Matrimony Logo" />
            <div className="bg-yellow-400 text-red-800 px-2 py-1 rounded text-xs font-bold">
              शुभ विवाह
            </div>
          </div>
          <div className="text-center flex-1 mt-2">
            <h1 className="text-2xl font-bold text-indigo-900 font-serif">
              जीवन परिचय - Bio Data
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-red-500 mx-auto mt-1 rounded-full"></div>
          </div>
          <div className="relative">
            <div className="border-2 border-indigo-300 rounded p-1 shadow-md">
              <img
                src={profile?.verificationImage || profile?.profilePhotos?.[0] || "/placeholder.jpg"}
                className="h-28 w-24 object-cover rounded"
                alt="Candidate Profile"
                //@ts-ignore
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-700 text-white text-[10px] px-2 py-0.5 rounded-full">
              {profile?.id ? `ID: ${profile.id}` : "Prospective Match"}
            </div>
          </div>
        </div>

        <h2 className="text-center font-bold text-lg text-purple-600 mb-4">परिचय पत्र</h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 text-start grid grid-cols-1 gap-y-2">
            <Info label="पूर्ण नाव" value={profile.personalDetails.fullName} />
            <Info label="जन्म तारीख" value={new Date(profile.personalDetails.dateOfBirth).toLocaleDateString()} />
            <Info label="वय" value={`${calculateAge(profile.personalDetails.dateOfBirth)} years`} />
            <Info label="उंची" value={profile.personalDetails.height} />
            <Info label="वजन" value={profile.personalDetails.weight} />
            <Info label="रक्त गट" value={profile.personalDetails.bloodGroup} />
            <Info label="शारीरिक अडचण" value={profile.personalDetails.disability} />
            <Info label="धर्म" value={profile.religiousDetails.religion} />
            <Info label="जात" value={profile.religiousDetails.caste} />
            <Info label="उपजात" value={profile.religiousDetails.subCaste} />
            <Info label="गाव" value={profile.contactDetails.presentAddress.city} />
            <Info label="राज्य" value={profile.contactDetails.presentAddress.state} />
            <Info label="देश" value={profile.contactDetails.presentAddress.country} />
          </div>

          <div className="flex justify-center items-start">
            <img
              src={profile?.profilePhotos?.[0]}
              className="w-40 h-56 object-cover rounded-md border border-gray-300 shadow"
              alt="Profile"
            />
          </div>
        </div>

        <hr className="border-t border-dashed border-gray-400 my-6" />

        <div>
          <h2 className="text-center text-xl font-bold text-purple-600">पात्र निवड करण्यासाठी संकेतस्थळ</h2>

          <div className="flex flex-col md:flex-row my-6 items-center gap-6">
            <div className="w-[200px]">
              <QRCode value={biodataUrl} style={{ width: '100%', height: 'auto' }} />
            </div>
            <p className="text-gray-700 text-center md:text-left text-sm">
              या QR कोड द्वारे संपूर्ण प्रोफाइल पहा आणि उमेदवाराची माहिती तपासा.
              योग्य जोडीदार निवडण्यासाठी सर्व माहिती काळजीपूर्वक वाचा.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-red-600 mb-2">योग्य जोडीदार निवडण्यासाठी काही महत्त्वाचे मुद्दे:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm">
              <li>उमेदवाराचा स्वभाव सौम्य, प्रेमळ आणि संयमी आहे का?</li>
              <li>कुटुंबाचे वर्तन आणि पार्श्वभूमी चांगली आहे का?</li>
              <li>फक्त संपत्ती आणि पैशावर आधारित निर्णय घेऊ नका.</li>
              <li>शिक्षण, नोकरी आणि आयुष्याकडे बघण्याची दृष्टी तपासा.</li>
              <li>धार्मिक, सामाजिक आणि सांस्कृतिक मूल्ये विचारात घ्या.</li>
              <li>आरोग्याची माहिती मिळवा.</li>
              <li>भावनिक स्थैर्य आणि जबाबदारी असलेली व्यक्ती निवडा.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
            onClick={downloadAsImage}
          >
            डाउनलोड इमेज
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyBioData;
