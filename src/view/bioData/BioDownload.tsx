import {  useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { calculateAge, formatDate } from '../../util/dateFormat';
import { MdOutlineFileDownload, MdOutlineVerifiedUser, MdPhone, MdShare, MdVerified, MdWhatsapp } from 'react-icons/md';
import { BioHeader, couple, ganpati, logo_xl } from '../../util/images.util';
import { FaLevelUpAlt, FaSpinner } from 'react-icons/fa';
import { GoLink } from 'react-icons/go';
import { toPng } from 'html-to-image';
import { formatCurrency } from '../../util/formatCurrency';
import { downloadAsImage } from '../../util/downloadAsImage';
import { formatAddress } from '../../util/commans';
import { useLocalization } from '../../hooks';
import Drawer from '../../components/Common/Drawer';
import PaymentQrCode from '../../components/Common/PaymentQrCode';
import Modal from '../../components/Common/Modal';

import {  MdInsertDriveFile } from 'react-icons/md';
import { shareElementAsImage } from '../../util';
import { useTranslation } from 'react-i18next';
import { BioDataHeader } from './BioDataHeader';
import { qrScanLink } from '../../constant';


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
        <div className="flex items-center gap-1 absolute top-2 right-2 px-2 py-1 bg-black/40 text-white text-[10px] font-semibold rounded-full backdrop-blur-sm z-10">
          <MdVerified className="text-green-400" size={16} />
          Verified
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
              <strong>{labels.dob}:</strong> {age}
            </p>
          )}

          {dob && (
            <p>
              <strong>{labels.age}:</strong> {dob}
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
        fileName: 'biodata.png',
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


      <div className=' flex justify-end gap-2 my-2'>
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

      <div id="biodata-card" className="">
        <ProfileCard profile={profile} />
        
      </div>


      <div id='biodataPage' className="flex border-2 mt-10 border-dashed border-red-500  md-w-full flex-col items-center  bg-white min-h-screen text-lg">
        {/* Page 1 */}
        {/* Download Button */}

        <div className="bg-white  w-full     ">
          {/* Header Image */}
          <BioDataHeader />
          {/* <div className="bg-white w-full shadow-[0_4px_10px_-2px_rgba(0,0,0,0.2)]">
            <div className="relative text-center flex justify-between items-center py-4 px-4 bio_header h-52">

              <img className="w-[70px] md:w-[120px]" src={logo_xl} alt="Biodata Logo" />

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-wide">
                  Bhoi Samaj Vivah Munch
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  एक विश्वासार्ह व सुरक्षित विवाह जुळवणी मंच
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Empowering Bhoi Community for Meaningful Marriages
                </p>
              </div>

              <img className="w-[70px] md:w-[120px]" src={couple} alt="Couple Icon" />


              <img
                className="w-[40px] md:w-[60px] absolute bottom-[-25px] left-1/2 transform -translate-x-1/2"
                src={ganpati}
                alt="Ganpati Icon"
              />
            </div>
          </div> */}



          {/* Personal Info Section */}
          <div className="flex flex-row gap-2 mt-6 py-2   px-4">
            
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
                <Info className={'col-span-4 md:col-span-2'} label={labels.jobType} value={options.professionalDetails.jobType[profile.professionalDetails.jobType]} />
                <Info className={'col-span-2'} label={labels.income} value={formatCurrency(profile.professionalDetails.income)} />

                {/* <Info className={'col-span-2'} label="City" value={profile.contactDetails.presentAddress.city} />
                <Info className={'col-span-2'} label="State" value={profile.contactDetails.presentAddress.state} /> */}
                <Info className={' col-span-4'} label={labels.presentAddress} value={formatAddress(profile.contactDetails.presentAddress)} />
              </div>

            </div>

            {/* Right Column - Profile Photo */}
            <div className="flex  justify-center md:justify-end ">
              <div className=' flex flex-col items-center gap-2 relative'>
                <b className='text-green-500'>MAT:{profile?.matId}</b>
                <img
                  src={profile?.profilePhotos?.[0]}
                  alt="Profile"
                  className="w-28 min-h-[150px]  md:w-[240px] md:h-[320px] object-cover rounded-md border-2 border-pink-600 shadow-md"
                />
                <div className="qr-code  gap-2   flex items-center text-center">
                  <div className=''>
                  <QRCode
                    value={biodataUrl}
                    className="!m-0 !p-0 "
                  />
                  {/* <small className="text-xs leading-3 my-2">Scan this QR code to view your profile</small> */}
                  </div>
                  {profile?.isVerified && (
                    <div className=" text-green-500  flex  flex-col items-center justify-center">
                      {/* <MdVerified className="text-green-500" /> */}
                      <MdOutlineVerifiedUser  />
                      <small>Verified</small>
                    </div>
                  )}
                </div>
                <small className="col-span-1 max-w-20 md:max-w-full  flex flex-col items-center text-xs leading-3">{labels.scan}</small>
              </div>
            </div>
          </div>
        </div>


        {/* Page 2 */}
        <div className="bg-white w-full py-6  rounded-lg shadow-md border ">
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
              filename: 'biodata-full.png',
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



