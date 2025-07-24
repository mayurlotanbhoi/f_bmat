import { use, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge, formatDate } from '../../util/dateFormat';
import { MdLocationOn, MdOutlineFileDownload, MdOutlineVerifiedUser, MdPhone, MdVerified, MdWhatsapp } from 'react-icons/md';
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
  const cardRef = useRef(null);
  const labels = useLocalization('labels');
  const options = useLocalization('options');

  const fullName = profile?.personalDetails?.fullName || 'N/A';
  const photo = profile?.profilePhotos?.[0] || '/placeholder.jpg';
  const age = calculateAge(profile?.personalDetails?.dateOfBirth);
  const caste = profile?.religiousDetails?.caste || 'N/A';
  const subCaste = profile?.religiousDetails?.subCaste || 'N/A';
  const income = formatCurrency(profile?.professionalDetails?.income || '0');
  const location =
    formatAddress(profile?.contactDetails?.presentAddress) ||
    profile?.contactDetails?.presentAddress?.city ||
    'Not Specified';
  const phone = profile?.contactDetails?.mobileNumber;

  const profileUrl = `https://yourdomain.com/memberQr/${profile?.matId}`;

  const whatsappText = `🧑🏻‍💼 ${fullName}'s Profile on Bhoi Matrimony\n\n🗓 Age: ${age}\n🧬 Caste: ${subCaste}\n💰 Income: ₹${income}\n📍 Location: ${location}\n🔗 View Profile: ${profileUrl}`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank');
  };

  const handleCardImageShare = async () => {
    try {
      const dataUrl = await toPng(cardRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'profile.png', { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${fullName}'s Profile`,
          text: 'Check out this profile on Bhoi Matrimony',
          files: [file],
        });
      } else {
        alert('Image sharing is not supported on this device');
      }
    } catch (err) {
      console.error('Error sharing card image:', err);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col md:flex-row items-center gap-5 p-5 border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition hover:scale-[1.02] bg-white w-full max-w-3xl mx-auto"
    >
      {/* Profile Image */}
      <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-300 shadow-md">
        {/* <img src={photo} alt={fullName} className="object-cover w-full h-full" /> */}
        {profile?.isVerified && (
          <MdVerified className="absolute bottom-1 right-1 text-green-500 bg-white rounded-full p-0.5" size={20} />
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900 capitalize truncate">{fullName}</h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">ID: {profile?.matId}</span>
        </div>

        <p className="text-gray-700 text-sm mb-1">
          <strong>{labels.age}:</strong> {age} &nbsp;|&nbsp;
          <strong>{labels.caste}:</strong> {subCaste} {options?.religiousDetails?.caste?.[caste]} &nbsp;|&nbsp;
          <strong>{labels.income}:</strong> {income}
        </p>

        <p className="text-gray-600 text-sm flex items-center gap-1">
          <MdLocationOn size={20} className="text-gray-500" />
          {location}
        </p>

        {/* QR + Actions */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <QRCode
            value={profileUrl}
            size={64}
            className="border border-gray-300 p-1 rounded-md"
          />

          <div className="flex gap-2">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-100 px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <MdPhone size={16} /> Call
              </a>
            )}

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 border border-green-100 px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <MdWhatsapp size={16} /> WhatsApp
            </button>

            <button
              onClick={handleCardImageShare}
              className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-100 px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition"
            >
              📤 Share Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


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



