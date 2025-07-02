import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge, formatDate } from '../../util/dateFormat';
import { MdOutlineFileDownload, MdOutlineVerifiedUser, MdVerified } from 'react-icons/md';
import { BioHeader } from '../../util/images.util';
import { FaLevelUpAlt, FaSpinner } from 'react-icons/fa';
import { GoLink } from 'react-icons/go';
import { toPng } from 'html-to-image';

import { Link } from "react-router-dom"; // if routing is internal
import { formatCurrency } from '../../util/formatCurrency';
import { downloadAsImage } from '../../util/downloadAsImage';

export const ProfileCard = ({ profile }) => {
  const fullName = profile?.personalDetails?.fullName || "N/A";
  const photo = profile?.profilePhotos?.[0];
  const age = calculateAge(profile?.personalDetails?.dateOfBirth);
  const caste = profile?.religiousDetails?.caste || "N/A";
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
            <h2 className="text-lg font-semibold text-gray-800 truncate">{fullName}</h2>
            <MdVerified className="text-green-500" size={20} />
          </div>
          <p className="text-sm text-gray-500 mt-1 truncate">
            Age: {age} | Caste: {caste}
          </p>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            ₹{income}
          </p>
        </div>


      </div>
    </a>
  );
};



export default function MatrimonyBioData() {
  const page1Ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const page2Ref = useRef(null);
  const cardRef = useRef(null);

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
    downloadAsImage({
      setLoading,
      fileName: 'biodata.png',
      id: 'biodataPage'
    });
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
          <div className="flex flex-row gap-2 mt-6 py-2 px-2">
            {/* Left Column - Info */}
            <div className="flex-1 space-y-4">
              {/* <Heading className=' ' text="Personal Info" /> */}
              <div className="grid grid-cols-4 p-0 m-0   ">
                <Info className="col-span-4 text-start" label="Name" value={profile.personalDetails.fullName} />
                <Info className={'col-span-4'} label="Age" value={`${calculateAge(profile.personalDetails.dateOfBirth)}`} />
                <Info className={'col-span-4 text-start'} label="DOB" value={formatDate(profile?.personalDetails?.dateOfBirth, { withTime: true })} />
                <Info className={'col-span-4'} label="Marrial Status" value={profile.personalDetails.maritalStatus} />
                <Info className={'col-span-2'} label="Color" value={profile.personalDetails?.Complexion} />

                <Info className={'col-span-2'} label="Weight" value={profile.personalDetails.weight} />
                <Info className={'col-span-4'} label="Height" value={profile.personalDetails.height} />
                <Info className={'col-span-2'} label="Brother" value={profile.familyDetails?.brothers} />
                <Info className={'col-span-2'} label="Married Brother" value={profile.familyDetails?.marriedBrothers} />
                <Info className={'col-span-2'} label="Sisters" value={profile.familyDetails?.sisters} />
                <Info className={'col-span-2'} label="Married Sisters" value={profile.familyDetails?.marriedSisters} />

                <Info className={'col-span-4'} label="Father" value={profile.familyDetails?.fatherName} />
                {/* <Info label="Weight" value={profile.personalDetails.weight} /> */}
                <Info className={'col-span-4'} label="Mother" value={profile.familyDetails?.motherName} />
                {/* <Info className={'col-span-2'} label="Caste" value={profile.religiousDetails.caste} /> */}
                <Info className={'col-span-4'} label="Sub Caste" value={profile.religiousDetails.subCaste + ' (' + profile.religiousDetails.caste + ')'} />
                {/* <Info className={'col-span-2'} label="Religion" value={profile.religiousDetails.religion} /> */}
                <Info className={'col-span-4'} label="Occupation" value={profile.professionalDetails.occupation} />
                <Info className={'col-span-2'} label="Income" value={formatCurrency(profile.professionalDetails.income)} />
                <Info className={'col-span-4'} label="Address" value={profile.contactDetails.presentAddress.city + '-' + profile.contactDetails.presentAddress.state} />

                {/* <Info className={'col-span-2'} label="City" value={profile.contactDetails.presentAddress.city} />
                <Info className={'col-span-2'} label="State" value={profile.contactDetails.presentAddress.state} /> */}
              </div>
            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex  justify-center md:justify-end flo">
              <div className=' flex flex-col items-center gap-2'>
                <b className='text-green-500'>MAT:{profile?.matId}</b>
                <img
                  src={profile?.profilePhotos?.[0]}
                  alt="Profile"
                  className="w-28 h-34 min:h-34 md:w-[240px] md:h-[320px] object-cover rounded-md border-2 border-pink-600 shadow-md"
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
            <div className="Verified-icon col-span-1 text-green-600 flex flex-col items-center text-center">
              <MdOutlineVerifiedUser className=" text-green-600" />
              <p className="text-sm mt-1">Verified by Bhoi Matrimony</p>
            </div>
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
    </>
  );
}
