import { use, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge, formatDate } from '../../util/dateFormat';
import { MdOutlineFileDownload, MdOutlineVerifiedUser, MdVerified } from 'react-icons/md';
import { BioHeader } from '../../util/images.util';
import { FaLevelUpAlt, FaSpinner } from 'react-icons/fa';
import { GoLink } from 'react-icons/go';
import { toPng } from 'html-to-image';

import { formatCurrency } from '../../util/formatCurrency';
import { downloadAsImage } from '../../util/downloadAsImage';
import { formatAddress } from '../../util/commans';
import { useLocalization } from '../../hooks';
import Drawer from '../../components/Common/Drawer';
import PaymentQrCode from '../../components/Common/PaymentQrCode';

export const ProfileCard = ({ profile }) => {
  const labels = useLocalization('labels');
  const options = useLocalization('options');
  const fullName = profile?.personalDetails?.fullName || "N/A";
  const photo = profile?.profilePhotos?.[0];
  const age = calculateAge(profile?.personalDetails?.dateOfBirth);
  const caste = profile?.religiousDetails?.caste || "N/A";
  const subCaste = profile?.religiousDetails?.subCaste || "N/A";
  const income = formatCurrency(profile?.professionalDetails?.income || "0");

  const profileUrl = `https://yourdomain.com/memberQr/${profile?.matId}`;

  const shareText = encodeURIComponent(
    `Check out ${fullName}'s profile on our Matrimony App!\nAge: ${age}, Caste: ${caste}\nIncome: ₹${income}\nClick here: ${profileUrl}`
  );

  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  return (
    <a
      href={whatsappShareUrl}
      className="flex flex-col p-3 m-2 bg-white shadow-lg border border-gray-300 hover:shadow-xl rounded-2xl transition-transform transform hover:scale-105 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <img
            src={photo}
            alt={fullName}
            className="w-full h-full object-cover rounded-2xl border border-gray-400"
          />
          <span className="absolute inset-0 rounded-2xl border-2 border-gray-600 opacity-60" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800 truncate capitalize">{fullName}</h2>
            {profile?.isVerified && (
                <MdVerified className="text-green-500" size={20} />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {labels.age}: {age} | {labels.caste}:  {subCaste} {options?.religiousDetails?.caste[caste] } | {labels.income}: {income}
          </p>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            {income}
          </p>
        </div>


      </div>
    </a>
  );
};

// const PaymentQrCode = (profile) => {
//   // Replace with your actual UPI ID and name
//   const upiId = "yourupi@okaxis"; // <-- CHANGE THIS
//   const name = "Your Name"; // <-- CHANGE THIS
//   const amount = ""; // e.g., "500" or leave blank for user entry
//   const note = `Support Matrimony: Profile ${profile?.matId}`;
//   const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

//   return (
//     <div className="flex flex-col items-center mt-4 gap-2">
//       <h2 className="text-lg font-semibold text-gray-800">Support Our Free Matrimony Service</h2>
//       <QRCode value={upiUrl} size={128} />
//       <p className="text-sm text-gray-600 mt-2 text-center">
//         Scan to pay via UPI<br />
//         <span className="font-mono text-xs">{upiId}</span>
//       </p>
//       <div className='grid grid-cols-2 gap-2'>
//         <a
//           href={upiUrl}
//           className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Pay with UPI App
//         </a>
//         <a
//           href={`https://pay.google.com/gp/p/ui/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//         >
//           Pay with Google Pay
//         </a>
//         <a
//           href={`phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//         >
//           Pay with PhonePe
//         </a>
//         <a
//           href={`paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//         >
//           Pay with Paytm
//         </a>
//       </div>
//       <div className='w-full'>
//         <div id="alert-additional-content-3" className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50" role="alert">
//           <div className="flex items-center">
//             <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//             </svg>
//             <span className="sr-only">Info</span>
//             <h3 className="text-lg font-medium">This service is 100% free for all users.</h3>
//           </div>
//           <div className="mt-2 mb-4 text-sm">
//             We do not charge for registration, search, or contact. However, if you wish to support our server and maintenance costs, you can pay any amount you like.<br/>
//             <b>Even ₹30 (just 1 toffee per day!) helps us keep this service running for everyone.</b>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default function MatrimonyBioData() {
  const page1Ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const page2Ref = useRef(null);
  const cardRef = useRef(null);
  const labels = useLocalization('labels');
  const options = useLocalization('options');
  const [showPaymentQr, setShowPaymentQr] = useState(false);

  const profile = getMatrimony();
  const biodataUrl = `https://bmat.onrender.com/vlew-profile/${profile?._id}`;

  // const downloadAsImage = async () => {
  //   const pages = [page1Ref, page2Ref];

  //   for (let i = 0; i < pages.length; i++) {
  //     const canvas = await html2canvas(pages[i].current, {
  //       scale: 3,
  //       useCORS: true,
  //       backgroundColor: '#fff',
  //       windowWidth: 794
  //     });
  //     const image = canvas.toDataURL('image/png');
  //     const link = document.createElement('a');
  //     link.href = image;
  //     link.download = `biodata-page-${i + 1}.png`;
  //     link.click();
  //   }
  // };
  const handleShareCard = async () => {
    const cardElement = document.getElementById('biodata-card');
    if (!cardElement) return;

    try {
      // Clone and prepare the node
      const clone = cardElement.cloneNode(true);
      // Object.assign(clone.style, {
      //   position: 'absolute',
      //   left: '-9999px',
      //   top: '0',
      //   backgroundColor: 'white',
      //   padding: '16px',
      //   width: `${cardElement.offsetWidth}px`,
      //   height: `${cardElement.offsetHeight}px`,
      //   zIndex: '-1'
      // });

      document.body.appendChild(clone);

      await new Promise((r) => requestAnimationFrame(r));
      await document.fonts.ready;

      //@ts-ignore
      const dataUrl = await toPng(clone, {
        cacheBust: true,
        backgroundColor: 'white',
      });

      document.body.removeChild(clone);

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'biodata.png', { type: blob.type });

      const promotionLink = `https://yourdomain.com/memberQr/${profile?.matId}`;
      const shareText = `🧾 Check out this biodata from Matrimony App!\n\n🔗 ${promotionLink}`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Matrimony BioData',
          text: shareText,
          files: [file],
        });
      } else {
        // fallback: download image
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'biodata.png';
        a.click();

        alert(`Sharing not supported. Image downloaded.\nLink: ${promotionLink}`);
      }
    } catch (error) {
      console.error('❌ Error while sharing:', error);
    }
  };



  const handleDownload = () => {
    setShowPaymentQr(true);

    setTimeout(() => {
      downloadAsImage({
        setLoading,
        fileName: 'biodata.png',
        id: 'biodataPage'
      });
     
    }, 5000); // Delay to ensure the QR code is rendered
  };





  const Info = ({ label, value, className = '' }) => (
    <div
      className={`flex  text-[10px] md:text-[16px] text-gray-700 font-medium leading-5 md:leading-8 ${className}`}
    >
      <span className="whitespace-nowrap font-bold mr-1">
        {label} <span className="mr-2">:</span>
      </span>
      <span className="text-gray-900">{value || 'N/A'},</span>
    </div>
  );


  return (
    <>


      <div className=' flex justify-end gap-2 my-2'>
        <button
          className="bg-white text-primary transition flex justify-center items-center rounded-md gap-2 px-4 py-2"
          onClick={handleShareCard}
        >
          {/* <HiExternalLink size={20} /> */}
          {/* <FaLevelUpAlt size={20} /> */}
          <GoLink size={20} />
          <span>Shear</span>
        </button>
        <button
          disabled={loading}
          className="bg-white text-primary transition flex justify-center items-center rounded-md gap-2 px-4 py-2"
          onClick={handleDownload}
        >
          {!loading ? <MdOutlineFileDownload size={20} /> : <span className=' animate-spin'><FaSpinner size={20} /></span>}
          <span>Download</span>
        </button>
      </div>

      <div id="biodata-card" className="">
        <ProfileCard profile={profile} />
      </div>


      <div id='biodataPage' className="flex border-2 border-dashed border-red-500  md-w-full flex-col items-center  bg-white min-h-screen text-lg">
        {/* Page 1 */}
        {/* Download Button */}

        <div className="bg-white  w-full     ">
          {/* Header Image */}
          <div className="text-center mb-4">
            <img className="w-full h-auto" src={BioHeader} alt="Biodata Header" />
          </div>

          {/* Personal Info Section */}
          <div className="flex flex-row gap-2 mt-6 py-2 px-4">
            {/* Left Column - Info */}
            <div className="flex-1 space-y-4">
              {/* <Heading className=' ' text="Personal Info" /> */}
              <div className="grid grid-cols-4 p-0 m-0   ">
                <Info className="col-span-4 text-start" label={labels.fullName} value={profile.personalDetails.fullName} />
                <Info className={'col-span-4'} label={labels.age} value={`${calculateAge(profile.personalDetails.dateOfBirth)}`} />
                <Info className={'col-span-4 text-start'} label={labels.dob} value={formatDate(profile?.personalDetails?.dateOfBirth, { withTime: true })} />
                <Info className={'col-span-4'} label={labels.maritalStatus} value={options.personalDetails.maritalStatus[profile.personalDetails.maritalStatus]} />
                <Info className={'col-span-2'} label={labels.complexion} value={options.personalDetails.complexion[profile.personalDetails?.Complexion]} />

                <Info className={'col-span-2'} label={labels.weight} value={options.personalDetails.weight[profile.personalDetails.weight]} />
                <Info className={'col-span-4'} label={labels.height} value={options.personalDetails.height[profile.personalDetails.height]} />
                <Info className={'col-span-2'} label={labels.brothers} value={profile.familyDetails?.brothers} />
                <Info className={'col-span-2'} label={labels.marriedBrothers} value={profile.familyDetails?.marriedBrothers} />
                <Info className={'col-span-2'} label={labels.sisters} value={profile.familyDetails?.sisters} />
                <Info className={'col-span-2'} label={labels.marriedSisters} value={profile.familyDetails?.marriedSisters} />

                <Info className={'col-span-4'} label={labels.father} value={profile.familyDetails?.fatherName} />
                {/* <Info label="Weight" value={profile.personalDetails.weight} /> */}
                <Info className={'col-span-4'} label={labels.mother} value={profile.familyDetails?.motherName} />
                {/* <Info className={'col-span-2'} label="Caste" value={profile.religiousDetails.caste} /> */}
                <Info className={'col-span-4'} label={labels.caste} value={profile.religiousDetails.subCaste + ' (' + options?.religiousDetails?.caste[profile?.religiousDetails?.caste] + ')'} />
                {/* <Info className={'col-span-2'} label="Religion" value={profile.religiousDetails.religion} /> */}
                <Info className={'col-span-4'} label={labels.occupation} value={options.professionalDetails.occupation[profile.professionalDetails.occupation]} />
                <Info className={'col-span-4'} label={labels.jobType} value={options.professionalDetails.jobType[profile.professionalDetails.jobType]} />
                <Info className={'col-span-2'} label={labels.income} value={formatCurrency(profile.professionalDetails.income)} />

                {/* <Info className={'col-span-2'} label="City" value={profile.contactDetails.presentAddress.city} />
                <Info className={'col-span-2'} label="State" value={profile.contactDetails.presentAddress.state} /> */}
                <Info className={' col-span-4'} label={labels.presentAddress} value={formatAddress(profile.contactDetails.presentAddress)} />
              </div>

            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex  justify-center md:justify-end flo">
              <div className=' flex flex-col items-center gap-2'>
                <b className='text-green-500'>MAT:{profile?.matId}</b>
                <img
                  src={profile?.profilePhotos?.[0]}
                  alt="Profile"
                  className="w-28 h-34  md:w-[240px] md:h-[320px] object-cover rounded-md border-2 border-pink-600 shadow-md"
                />
              </div>
            </div>
          </div>
        </div>


        {/* Page 2 */}
        <div
          className="bg-white  py-4 w-full h-[100%]  shadow border border-gray-300 rounded-md"
        >
          <h2 className="text-xl font-semibold text-center text-pink-700 mb-6">जोडीदार निवड मार्गदर्शक</h2>

          <div className=" grid grid-cols-3 gap-4 my-2">
            {/* <div className="col-span-1 text-right p-0 m-0 flex justify-end items-start"> */}
            <div className="qr-code col-span-1  flex flex-col items-center text-center">
              <QRCode
                value={biodataUrl}
                className="!m-0 !p-0 "
              />
            </div>
            {/* </div> */}
            <p className="col-span-1 text-gray-700 text-[10px] leading-relaxed text-center md:text-left">
              वरील QR कोड स्कॅन करून सविस्तर प्रोफाइल पहा.<br />
              विवाहासाठी निर्णय घेण्याआधी संपूर्ण माहिती तपासा आणि घरच्यांचा सल्ला घ्या.
            </p>
            {profile?.isVerified && (
              <div className="Verified-icon col-span-1 text-green-600 flex flex-col items-center text-center">
                <MdOutlineVerifiedUser className=" text-green-600" />
                <p className="text-sm mt-1">Verified by Bhoi Matrimony</p>
              </div>
            )}
          </div>

          <div className="bg-pink-100 py-4 rounded shadow px-3">
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
            Generated on: {formatDate(new Date().toLocaleDateString(), { withTime: true })} | Powered by Vaishya Parinay
          </div>
        </div>


      </div>
       <Drawer
                      isOpen={showPaymentQr}
                      position="bottom"
                      padding="p-0"
                      widthClass="w-100"
                      className="rounded-t-lg h-[90vh]"
                      showCloseBtn={false}
        onClose={() => setShowPaymentQr(false)}
                  >
        <PaymentQrCode profile={profile} />
                  </Drawer>
      
    </>
  );


}



