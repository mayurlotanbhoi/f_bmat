import {  useRef, useState } from 'react';
import QRCode from 'react-qr-code';


import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge, formatDate } from '../../util/dateFormat';
import { MdOutlineFileDownload, MdOutlineVerifiedUser, MdPhone, MdShare, MdVerified, MdVerifiedUser, MdWhatsapp } from 'react-icons/md';
import { BioHeader, couple, ganpati, logo_xl, verified } from '../../util/images.util';
import { FaEdit, FaLevelUpAlt, FaSpinner } from 'react-icons/fa';
import { GoLink } from 'react-icons/go';
import { toPng } from 'html-to-image';
import { formatCurrency } from '../../util/formatCurrency';
import { downloadAsImage } from '../../util/downloadAsImage';
import { formatAddress } from '../../util/commans';
import { useLocalization } from '../../hooks';
import Drawer from '../../components/Common/Drawer';
import PaymentQrCode from '../../components/Common/PaymentQrCode';
import Modal from '../../components/Common/Modal';
import { FiCopy, FiCheck, FiShare2 } from "react-icons/fi";


import {  MdInsertDriveFile } from 'react-icons/md';
import { shareElementAsImage } from '../../util';
import { useTranslation } from 'react-i18next';
import { BioDataHeader } from './BioDataHeader';
import { qrScanLink } from '../../constant';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';


export const ProfileCard = ({ profile }) => {
  const cardRef = useRef(null);
  const labels = useLocalization('labels');
  const options = useLocalization('options');
  const fullName = profile?.personalDetails?.fullName || 'N/A';
  const photo = profile?.profilePhotos?.[0] || '/placeholder.jpg';
  const age = calculateAge(profile?.personalDetails?.dateOfBirth);
  const dob = formatDate(profile?.personalDetails?.dateOfBirth)
  const caste = profile?.religiousDetails?.caste;
  const subCaste = profile?.religiousDetails?.subCaste;
  const income = profile?.professionalDetails?.income;
  console.log('profile', profile?.professionalDetails?.income);
  const jobType = profile?.professionalDetails?.jobType;
  const location = formatAddress(profile?.contactDetails?.presentAddress) || profile?.contactDetails?.presentAddress?.city;
  const profileUrl = `${qrScanLink}/${profile?._id}`;

  return (
    <div
      ref={cardRef}
      id="biodata-card"
      className="relative w-full  mx-auto bg-white rounded-xl shadow-lg border p-4 flex flex-col sm:flex-row gap-4"
    >
      {/* Verified Badge */}
      {profile?.isVerified && (
        <div className="flex items-center gap-1 absolute top-2 right-2 px-2 py-1  text-white text-[10px] font-semibold rounded-full backdrop-blur-sm z-10">
          <img className="w-20 h-auto" src={verified} alt="Verified" loading='lazy' />
        </div>
      )}

      {/* Photo & QR */}
      <div className="w-full sm:w-1/3 flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-lg overflow-hidden border">
          <img
            src={photo}
            alt={fullName}
            crossOrigin="anonymous"
            className="w-full h-full object-fill"
            loading='lazy'
          />
        </div>
        <span className="text-xs   rounded font-semibold">
          MAT: {profile?.matId}
        </span>
        <QRCode
          value={profileUrl}
          size={64}
          className="bg-white  rounded border"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between text-sm text-gray-700">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900 capitalize">
            {fullName}
          </h2>

          {age && (
            <p>
              <strong>{labels.age}:</strong>  {age}
            </p>
          )}

          {dob && (
            <p>
              <strong>{labels.dob}:</strong> {dob}
            </p>
          )}

          {(subCaste || caste) && (
            <p>
              <strong>{labels.caste}:</strong>{' '}
              {[subCaste, options?.religiousDetails?.caste?.[caste]]
                .filter(Boolean)
                .join(', ')}
            </p>
          )}

          {(jobType || income) && (
            <p>
              {jobType && (
                <>
                  <strong>{labels.jobType}:</strong>{' '}
                  {options?.professionalDetails?.jobType?.[jobType]}
                </>
              )}
              {jobType && income && <span className="px-1">|</span>}
              {income && (
                <>
                  <strong>{labels.income}:</strong> {formatCurrency(income)}
                </>
              )}
            </p>
          )}

          {location && (
            <p className=" gap-1 text-sm text-gray-600">
              <strong className=''>{labels.presentAddress}: </strong>
              {location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};



export const ShareModalContent = ({ onClose, onShareCard, onShareFull  }) => {
  return (
    <div >
      {/* Close Button */}
      {/* Heading */}
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900">📤 Share This Profile</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        You can share a card-style preview or the full biodata as an image with your contacts.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onShareCard}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition"
        >
          <MdShare size={20} /> Share Card View
        </button>

        <button
          onClick={onShareFull}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg_primary hover:opacity-70 text-white font-semibold transition"
        >
          <MdInsertDriveFile size={20} /> Share Full Biodata
        </button>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-400 mt-6 text-center">
        Sharing uses your device's native share or downloads the image if not supported.
      </p>
    </div>
  );
};



export function ShareBiodata({ biodataUrl, profile }) {
  const [copied, setCopied] = useState(false);
  const options = useLocalization('options');
  const labels = useLocalization('labels');



  const handleCopy = () => {
    navigator.clipboard.writeText(biodataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="flex flex-col items-center gap-3 my-4 bg-white p-5 rounded-2xl shadow-lg border border-gray-100   w-full mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FiShare2 className="text-blue-500 text-xl" />
        <span className="text-sm font-medium text-gray-600">
          Share your profile link
        </span>
      </div>

      {/* URL & Actions */}
      <div className="flex items-center gap-3 w-full bg-gray-50 p-3 rounded-xl border border-gray-200">
        {/* URL Text */}
        <span className="text-gray-800 font-medium truncate flex-1 text-sm">
          {biodataUrl}
        </span>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm"
        >
          {copied ? <FiCheck /> : <FiCopy />}
          {copied ? "Copied" : "Copy"}
        </button>

        {/* Share Button */}
        <ShareButton
          shareMessage={`📜 Biodata of ${profile?.personalDetails?.fullName}

👤 ${labels.fullName}: ${profile?.personalDetails?.fullName || "N/A"}
🎂 ${labels.age}: ${calculateAge(profile?.personalDetails?.dateOfBirth) || "N/A"} years
🕉️ ${labels.caste}: ${profile?.religiousDetails?.subCaste + ' (' + options?.religiousDetails?.caste[profile?.religiousDetails?.caste] + ')'}
📍 ${labels.presentAddress}: ${profile?.contactDetails?.presentAddress?.city || "N/A"}, ${profile?.contactDetails?.presentAddress?.state || ""}
💼 ${labels.occupation}: ${options?.professionalDetails?.occupation[profile?.professionalDetails?.occupation] || "N/A"}
🎓 ${labels.qualification}: ${options?.educationDetails?.highestQualification[profile?.educationDetails?.highestQualification] || "N/A"}

🔗 View Full Biodata: ${biodataUrl}

💖 Find your perfect match on Our Matrimony Platform!`}
          title={`Biodata of ${profile?.personalDetails?.fullName}`}
          url={biodataUrl}
          className="flex items-center text-sm justify-center gap-2 px-5 py-2 bg_primary text-white font-bold rounded-lg"
          image="https://miro.medium.com/v2/1*SdXRP8f2Lhin89Tht_GRIA.jpeg"
        />

      </div>

      {/* Optional small promo text */}
      <p className="text-xs text-gray-400 text-center">
        Share your biodata easily with family, relatives, or on social media.
      </p>
    </div>

  );
}



export default function MatrimonyBioData() {
  const page1Ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const page2Ref = useRef(null);
  const cardRef = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const labels = useLocalization('labels');
  const options = useLocalization('options');
  const { t } = useTranslation();
  const [showPaymentQr, setShowPaymentQr] = useState(false);
  const profile = getMatrimony();
  const biodataUrl = `${qrScanLink}/${profile?._id}`;


  const handleDownload = () => {
    setShowPaymentQr(true);
    setTimeout(() => {
      downloadAsImage({
        setLoading,
        fileName: `${profile?.personalDetails?.fullName}-Biodata.png`,
        id: 'biodataPage'
      });
     
    }, 5000);
  };





  const Info = ({ label, value, className = '' }) => (
    <div
      className={`flex  text-[10px] md:text-[17px] text-gray-700 font-medium leading-5 md:leading-8 ${className}`}
    >
      <span className="whitespace-nowrap font-bold mr-1">
        {label} <span className="mr-2">:</span>
      </span>
      <span className="text-gray-900">{value || 'N/A'},</span>
    </div>
  );


  return (
    <>


      <div className=' flex justify-center md:justify-end gap-2 my-2'>

        <Link
          to='/complet-profile'
          className="bg-white text-primary transition flex justify-center items-center rounded-md gap-2 px-4 py-2"
        >
          {/* <HiExternalLink size={20} /> */}
          {/* <FaLevelUpAlt size={20} /> */}
          <CiEdit size={20} />
         
          <span>Edit</span>
        </Link>
        <button
          className="bg-white text-primary transition flex justify-center items-center rounded-md gap-2 px-4 py-2"
          onClick={() => setShowShareModal(true)}
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

      

      <ShareBiodata biodataUrl={biodataUrl} profile={profile}  />

      <div id="biodata-card" className="">
        <ProfileCard profile={profile} />
        
      </div>


      <div id='biodataPage' className="flex border-2 mt-10 border-dashed border-red-500  md-w-full flex-col items-center  bg-white min-h-screen text-lg relative">

        {profile?.isVerified && (
          <div
            className="scale-75 md:scale-100 flex items-center  absolute top-[6.5rem] md:top-[11rem] left-0 px-2 py-[2px]  font-semibold rounded-full"
            style={{
              lineHeight: "1.2",
              whiteSpace: "nowrap"
            }}
          >
            <img className="w-20 h-auto" src={verified} alt="Verified" loading='lazy' />
          </div>
        )}

        {/* Page 1 */}
        {/* Download Button */}

        <div className="bg-white  w-full     ">
          {/* Header Image */}
          <BioDataHeader />



          {/* Personal Info Section */}
          <div className=" grid grid-cols-12 py-8 px-2 md:px-4">
            
            {/* Left Column - Info */}
            <div className="flex-1 space-y-4 col-span-8 sm:col-span-7 ">
              
             
              {/* <Heading className=' ' text="Personal Info" /> */}
              <div className="grid grid-cols-4 p-0 m-0    ">

                <Info className="col-span-4 text-start" label={labels.fullName} value={profile.personalDetails.fullName} />
                <Info className={'col-span-4'} label={labels.age} value={`${calculateAge(profile.personalDetails.dateOfBirth)}`} />
                <Info className={'col-span-4 text-start'} label={labels.dob} value={formatDate(profile?.personalDetails?.dateOfBirth, { withTime: true })} />
                <Info className={'col-span-4'} label={labels.maritalStatus} value={options.personalDetails.maritalStatus[profile.personalDetails.maritalStatus]} />
                <Info className={'col-span-4'} label={labels.height} value={options.personalDetails.height[profile.personalDetails.height]} />
                <Info className={'col-span-2'} label={labels.complexion} value={options.personalDetails.complexion[profile.personalDetails?.complexion]} />

                <Info className={'col-span-2'} label={labels.weight} value={options.personalDetails.weight[profile.personalDetails.weight]} />
                <Info className={'col-span-2'} label={labels.brothers} value={profile.familyDetails?.brothers} />
                <Info className={'col-span-2'} label={labels.marriedBrothers} value={profile.familyDetails?.marriedBrothers} />
                <Info className={'col-span-2'} label={labels.sisters} value={profile.familyDetails?.sisters} />
                <Info className={'col-span-2'} label={labels.marriedSisters} value={profile.familyDetails?.marriedSisters} />

                <Info className={'col-span-4'} label={labels.father} value={profile.familyDetails?.fatherName} />
                <Info className={'col-span-4'} label={labels.fatherOccupation} value={options.familyDetails.fatherOccupation[profile.familyDetails.fatherOccupation]} />
                {/* <Info label="Weight" value={profile.personalDetails.weight} /> */}
                <Info className={'col-span-4'} label={labels.mother} value={profile.familyDetails?.motherName} />
                <Info className={'col-span-4'} label={labels.motherOccupation} value={options.familyDetails.motherOccupation[profile.familyDetails.motherOccupation]} />
                {/* <Info className={'col-span-2'} label="Caste" value={profile.religiousDetails.caste} /> */}
                <Info className={'col-span-4'} label={labels.caste} value={profile.religiousDetails.subCaste + ' (' + options?.religiousDetails?.caste[profile?.religiousDetails?.caste] + ')'} />
                {/* <Info className={'col-span-2'} label="Religion" value={profile.religiousDetails.religion} /> */}
                <Info className={'col-span-4'} label={labels.occupation} value={options.professionalDetails.occupation[profile.professionalDetails.occupation]} />
                <Info className={'col-span-4 md:col-span-2'} label={labels.jobType} value={options.professionalDetails.jobType[profile.professionalDetails.jobType]} />
                <Info className={'col-span-2'} label={labels.income} value={formatCurrency(profile.professionalDetails.income)} />
                <Info className={'col-span-4'} label={labels.phone} value={`${profile?.contactDetails?.
                  mobileNo}, ${profile?.contactDetails?.whatsappNo}`} />


                {/* <Info className={'col-span-2'} label="City" value={profile.contactDetails.presentAddress.city} />
                <Info className={'col-span-2'} label="State" value={profile.contactDetails.presentAddress.state} /> */}
                <Info className={' col-span-4 '} label={labels.presentAddress} value={formatAddress(profile.contactDetails.presentAddress)} />

                <Info className={' col-span-4 '} label={labels.permanentAddress} value={formatAddress(profile.contactDetails.permanentAddress)} />
              </div>

            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex col-span-4 sm:col-span-5   justify-center md:justify-end ">
              <div className=' flex flex-col items-center gap-2 relative'>
                
                <b className='text-primary'>MAT:{profile?.matId}</b>
                <img
                  src={profile?.profilePhotos?.[0]}
                  alt="Profile"
                  loading='lazy'
                  
                  className=" min-h-[150px]  w-[100%] md:h-[480px] object-cover rounded-md border-2 border-pink-600 shadow-md"
                />
                <div className="qr-code  gap-2   flex items-center text-center">
                  <div className=''>
                  <QRCode
                    value={biodataUrl}
                    className="!m-0 !p-0 "
                  />
                  </div>
                 
                </div>
                <small className="col-span-1 max-w-20 md:max-w-full  flex flex-col items-center text-[10px] text-center leading-3">{labels.scan}</small>
              </div>
            </div>
          </div>
        </div>


        {/* Page 2 */}
        {/* <div className="bg-white w-full py-6  rounded-lg shadow-md border ">
          <h2 className="text-2xl font-bold text-center text-pink-700 mb-5">
            {t('guide.title')}
          </h2>

          <div className="bg-pink-50 p-4 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold text-red-700 mb-3">
              {t('guide.sectionTitle')}
            </h3>

            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>{t(`guide.point${i + 1}`)}</li>
              ))}
            </ul>
          </div>

          <div className="text-center text-xs text-gray-400 mt-8">
            {t('guide.generated')} {formatDate(new Date().toLocaleString())} | {t('guide.poweredBy')}
          </div>
        </div> */}

        <footer
          className="text-[10px]  text-gray-700 font-medium leading-4 mt-3  border-t border-gray-200"
          aria-label="Disclaimer for bio-data download"
        >
          <div className="max-w-7xl mx-auto px-4">
            <p className="mb-2">
              <strong>{t('bioDataFooter.disclaimerTitle', 'Disclaimer')}:</strong>{' '}
              {t('bioDataFooter.disclaimer')}
            </p>
          </div>
        </footer>

        <div className="text-center text-xs mb-2 text-gray-400 ">
          {t('guide.generated')} {formatDate(new Date())} | {t('guide.poweredBy')}
        </div>

      </div>
       <Drawer
                      isOpen={showPaymentQr}
                      position="bottom"
                      padding="p-0"
                      widthClass="w-100"
                      className="rounded-t-lg h-[100vh]"
                      showCloseBtn={true}
        onClose={() => setShowPaymentQr(false)}
                  >
        <PaymentQrCode profile={profile} />
                  </Drawer>

      <Modal isOpen={showShareModal} onClose={() => setShowShareModal(false)} >
        <ShareModalContent
          onClose={() => setShowShareModal(false)}
          onShareCard={() =>
            // For WhatsApp - shorter text mode
            shareElementAsImage('biodata-card', {
              filename: 'matrimony-card.png',
              shareTitle: `${profile?.personalDetails?.fullName}'s Profile`,
              shareText: `👤 ${profile?.personalDetails?.fullName}\n📍 ${profile?.contactDetails?.presentAddress?.city}\n💌 Interested families welcome!`,
              promotionUrl: biodataUrl,
              shortTextMode: true, // This makes it WhatsApp friendly
              onComplete: () => {
                setShowShareModal(false);
                setShowPaymentQr(true);
              },
              isWidemode: true
            })


          }
          onShareFull={() =>
            shareElementAsImage('biodataPage', {
              filename: `${profile?.personalDetails?.fullName}-Biodata.png`,
              shareTitle: `${profile?.personalDetails?.fullName}'s Full Biodata`,
              shareText: `🧾 Full Matrimony Biodata of ${profile?.personalDetails?.fullName}`,
              onComplete: () => { setShowShareModal(false); setShowPaymentQr(true) }, promotionUrl: biodataUrl,
            })
          }
        />
      </Modal>
      
    </>
  );


}

// ShareButton.jsx

interface ShareButtonProps {
  buttonText?: string;   // बटन का टेक्स्ट (डिफ़ॉल्ट: "Share")
  icon?: React.ReactNode; // कोई भी React आइकन या एलिमेंट
  shareMessage?: string;  // शेयर करते समय दिखने वाला मैसेज
  url?: string;           // शेयर करने का लिंक
  title?: string;         // शेयर का टाइटल
  image?: string;         // प्रीव्यू इमेज
  className?: string;     // एक्स्ट्रा CSS क्लास
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  buttonText = "Share",
  icon,
  shareMessage = "",
  url,
  title = "Share",
  image,
  className = "",
}) =>  {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        const shareData = {
          title,
          text: `${shareMessage} ${shareUrl}`, // Combine message + URL
        };
        // Try adding image if supported
        if (image && navigator.canShare && navigator.canShare({ files: [] })) {
          const response = await fetch(image);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: blob.type });
          //@ts-ignore
          shareData.files = [file];
        }

        await navigator.share(shareData);
      } catch (error) {
        console.error("Share cancelled or failed:", error);
      }
    } else if (/Mobi|Android/i.test(navigator.userAgent)) {
      // WhatsApp fallback for mobile
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `${shareMessage} ${shareUrl}`
        )}`,
        "_blank"
      );
    } else {
      // Desktop fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
        alert("Link & message copied to clipboard!");
      } catch {
        alert("Could not copy link.");
      }
    }
  };

  return (
    <button onClick={handleShare} className={className}>
      {icon ||  <FiShare2 className="text-lg" />}
      {buttonText}
    </button>
  );
};


// export default ShareButton;




