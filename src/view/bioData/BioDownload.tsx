import { useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge } from '../../util/dateFormat';
import { MdOutlineFileDownload, MdOutlineVerifiedUser, MdVerified } from 'react-icons/md';
import { BioHeader } from '../../util/images.util';
import { FaLevelUpAlt } from 'react-icons/fa';
import { GoLink } from 'react-icons/go';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

import { Link } from "react-router-dom"; // if routing is internal

const ProfileCard = ({ profile }) => {
  const fullName = profile?.personalDetails?.fullName || "N/A";
  const photo = profile?.profilePhotos?.[0];
  const age = calculateAge(profile?.personalDetails?.dateOfBirth);
  const caste = profile?.religiousDetails?.caste || "N/A";
  const income = profile?.professionalDetails?.income || "0";

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
  const page2Ref = useRef(null);
  const cardRef = useRef(null);

  const profile = getMatrimony();
  const biodataUrl = `https://bmat.onrender.com/vlew-profile/${profile?._id}`;

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






  const Info = ({ label, value, className }) => (
    <div className={` ${className} flex  p-0   text-sm sm:text-base md:text-[15px] text-gray-700 font-medium`} >
      <span className="whitespace-nowrap ml-1 font-bold">{label} <span className=' mr-2'>:</span></span>
      <span className=" text-gray-900">{value || 'N/A'}</span>
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
          className="bg-white text-primary transition flex justify-center items-center rounded-md gap-2 px-4 py-2"
          onClick={downloadAsImage}
        >
          <MdOutlineFileDownload size={20} />
          <span>Download</span>
        </button>
      </div>

      <div id="biodata-card" className="">
        <ProfileCard profile={profile} />
      </div>


      <div ref={page1Ref} className="flex border-2 border-dashed border-red-500  md-w-full flex-col items-center gap-10 bg-white min-h-screen text-lg">
        {/* Page 1 */}
        {/* Download Button */}

        <div className="bg-white  w-full      shadow-md rounded-md">
          {/* Header Image */}
          <div className="text-center mb-4">
            <img className="w-full h-auto" src={BioHeader} alt="Biodata Header" />
          </div>

          {/* Personal Info Section */}
          <div className="flex flex-col mx-2 md:flex-row gap-6 mt-6">
            {/* Left Column - Info */}
            <div className="flex-1 space-y-4">
              {/* <Heading className=' ' text="Personal Info" /> */}
              <div className="grid grid-cols-4 sm:grid-cols-4  gap-2 gap-y-2">
                <Info className="col-span-4 text-start" label="Name" value={profile.personalDetails.fullName} />
                <Info className={'col-span-2'} label="Age" value={`${calculateAge(profile.personalDetails.dateOfBirth)}`} />
                <Info className={'col-span-2 text-start'} label="DOB" value={new Date(profile.personalDetails.dateOfBirth).toLocaleDateString()} />
                <Info className={'col-span-2'} label="Color" value={profile.personalDetails?.Complexion} />
                <Info className={'col-span-2'} label="Height" value={profile.personalDetails.height} />
                <Info className={'col-span-2'} label="Weight" value={profile.personalDetails.weight} />
                <Info className={'col-span-2'} label="Brother" value={profile.familyDetails?.brothers} />
                <Info className={'col-span-2'} label="Married Brother" value={profile.familyDetails?.marriedBrothers} />

                <Info className={'col-span-2'} label="Sisters" value={profile.familyDetails?.sisters} />
                <Info className={'col-span-2'} label="Married Sisters" value={profile.familyDetails?.marriedSisters} />

                <Info className={'col-span-4'} label="Father" value={profile.familyDetails?.fatherName} />
                {/* <Info label="Weight" value={profile.personalDetails.weight} /> */}
                <Info className={'col-span-4'} label="Mother" value={profile.familyDetails?.motherName} />
                <Info className={'col-span-2'} label="Caste" value={profile.religiousDetails.caste} />
                <Info className={'col-span-2'} label="Sub Caste" value={profile.religiousDetails.subCaste} />
                {/* <Info className={'col-span-2'} label="Religion" value={profile.religiousDetails.religion} /> */}
                <Info className={'col-span-4'} label="Occupation" value={profile.professionalDetails.occupation} />
                <Info className={'col-span-2'} label="Income" value={`₹${profile.professionalDetails.income}`} />
                <Info className={'col-span-2'} label="City" value={profile.contactDetails.presentAddress.city} />
                <Info className={'col-span-2'} label="State" value={profile.contactDetails.presentAddress.state} />
              </div>
            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex  justify-center md:justify-end">
              <div className=' flex flex-col items-center gap-2'>
                <b className='text-green-500'>MAT:{profile?.matId}</b>
                <img
                  src={profile?.profilePhotos?.[0]}
                  alt="Profile"
                  loading='lazy'
                  className="w-48 h-64 md:w-[240px] md:h-[320px] object-cover rounded-md border-2 border-pink-600 shadow-md"
                />
              </div>
            </div>
          </div>
        </div>


        {/* Page 2 */}
        <div
          className="bg-white px-3 w-full h-[100%]  shadow border border-gray-300 rounded-md"
        >
          <h2 className="text-xl font-semibold text-center text-pink-700 mb-6">जोडीदार निवड मार्गदर्शक</h2>

          <div className=" grid grid-cols-3 gap-4 my-2">
            <div className="col-span-1 text-right p-0 m-0 flex justify-end items-start">
              <div className="w-[80%]">
                <QRCode
                  value={biodataUrl}
                  className="!m-0 !p-0 "
                  style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
                />
              </div>
            </div>
            <p className="col-span-1 text-gray-700 text-[10px] leading-relaxed text-center md:text-left">
              वरील QR कोड स्कॅन करून सविस्तर प्रोफाइल पहा.<br />
              विवाहासाठी निर्णय घेण्याआधी संपूर्ण माहिती तपासा आणि घरच्यांचा सल्ला घ्या.
            </p>
            <div className="col-span-1 text-green-600 flex flex-col items-center text-center">
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
    </>
  );
}
