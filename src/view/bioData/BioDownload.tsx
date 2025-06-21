import { useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge } from '../../util/dateFormat';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { BioHeader } from '../../util/images.util';
import Heading from '../../components/Headings/Heading';

export default function MatrimonyBioData() {
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);

  const profile = getMatrimony();
  const biodataUrl = `https://yourapp.com/memberQr/${profile?.matId}`;


  const downloadAsImage = async () => {
    const pages = [page1Ref, page2Ref];

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i].current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#fff',
        windowWidth: 794
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `biodata-page-${i + 1}.png`;
      link.click();
    }
  };

  const Info = ({ label, value }) => (
    <div className=" flex  p-0 justify-start  text-sm sm:text-base md:text-[15px] text-gray-700 font-medium">
      <span className="whitespace-nowrap ml-1 font-bold">{label}:</span>
      <span className="text-right text-gray-900">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div ref={page1Ref} className="flex w-screen md-w-full flex-col items-center gap-10 bg-white min-h-screen text-lg">
      {/* Page 1 */}
      {/* Download Button */}
      <button
        className="bg-blue-600 text-white hover:bg-blue-700 transition"
        onClick={downloadAsImage}
      >
        Download Both Pages
      </button>
      <div className="bg-white   mx-auto    shadow-md rounded-md">
        {/* Header Image */}
        <div className="text-center mb-4">
          <img className="w-full h-auto" src={BioHeader} alt="Biodata Header" />
        </div>

        {/* Personal Info Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Column - Info */}
          <div className="flex-1 space-y-4">
            <Heading text="Personal Info" />
            <div className="grid grid-cols-2 sm:grid-cols-2  gap-2 gap-y-2">
              <Info label="Name" value={profile.personalDetails.fullName} />
              <Info label="DOB" value={new Date(profile.personalDetails.dateOfBirth).toLocaleDateString()} />
              <Info label="Age" value={`${calculateAge(profile.personalDetails.dateOfBirth)} years`} />
              <Info label="Color" value={profile.personalDetails?.Complexion} />
              <Info label="Height" value={profile.personalDetails.height} />
              <Info label="Weight" value={profile.personalDetails.weight} />
              <Info label="Brother" value={profile.familyDetails?.brothers} />
              <Info label="Sisters" value={profile.familyDetails?.sisters} />
              <Info label="Father" value={profile.familyDetails?.fatherName} />
              {/* <Info label="Weight" value={profile.personalDetails.weight} /> */}
              <Info label="Mother" value={profile.familyDetails?.motherName} />
              <Info label="Caste" value={profile.religiousDetails.caste} />
              <Info label="Sub Caste" value={profile.religiousDetails.subCaste} />
              <Info label="Religion" value={profile.religiousDetails.religion} />
              <Info label="Occupation" value={profile.professionalDetails.occupation} />
              <Info label="Income" value={`₹${profile.professionalDetails.income}`} />
              <Info label="City" value={profile.contactDetails.presentAddress.city} />
              <Info label="State" value={profile.contactDetails.presentAddress.state} />
            </div>
          </div>

          {/* Right Column - Profile Photo */}
          <div className="flex justify-center md:justify-end">
            <img
              src={profile?.profilePhotos?.[0]}
              alt="Profile"
              loading='lazy'
              className="w-48 h-64 md:w-[240px] md:h-[320px] object-cover rounded-md border-2 border-pink-600 shadow-md"
            />
          </div>
        </div>
      </div>


      {/* Page 2 */}
      <div
        className="bg-white w-screen md:w-[720px] h-[100%] p-6 shadow border border-gray-300 rounded-md"
      >
        <h2 className="text-xl font-semibold text-center text-pink-700 mb-6">जोडीदार निवड मार्गदर्शक</h2>

        <div className="flex  md:flex-row justify-between items-center gap-6 mb-8">
          <div className="w-[180px]">
            <QRCode className=' bg-red-400' value={biodataUrl} style={{ width: '80%', height: 'auto' }} />
          </div>
          <p className="text-gray-700 text-[10px] leading-relaxed text-center md:text-left">
            वरील QR कोड स्कॅन करून सविस्तर प्रोफाइल पहा.<br />
            विवाहासाठी निर्णय घेण्याआधी संपूर्ण माहिती तपासा आणि घरच्यांचा सल्ला घ्या.
          </p>
          <div className="w-[180px] text-green-600 flex flex-col items-center text-center">
            <MdOutlineVerifiedUser className=" text-green-600" style={{ width: '50%', height: 'auto' }} />
            <p className="text-sm mt-1">Verified by Bhoi Matrimony</p>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-lg font-bold text-red-700 mb-3">जीवनसाथी निवडताना लक्षात ठेवा:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
            <li>स्वभाव, विचारसरणी आणि समजूतदारपणा महत्त्वाचा आहे.</li>
            <li>कुटुंबातील वडीलधाऱ्यांचे अनुभव विचारात घ्या.</li>
            <li>शिक्षण, नोकरी व आरोग्य महत्त्वाचे घटक आहेत.</li>
            <li>पैशाऐवजी सुसंस्कार व सुसंवाद बघा.</li>
            <li>धार्मिक, सामाजिक मूल्यांची जाणीव असलेली व्यक्ती निवडा.</li>
            <li>प्रेम, विश्वास आणि सहकार्याचा पाया मजबूत असावा.</li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10">
          Generated on: {new Date().toLocaleDateString()} | Powered by Vaishya Parinay
        </div>
      </div>


    </div>
  );
}
