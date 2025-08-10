import React, { useEffect, useState } from 'react'
import { useLazyGetLikesQuery } from '../../features/biodata/biodataApi'
import { Link, useLoaderData } from 'react-router-dom'
import { useLocalization } from '../../hooks'
import NoData from '../../components/Common/notFound'

export default function SharedLinks() {
  const [getLikes, { data, isLoading }] = useLazyGetLikesQuery()
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null)
  const sendreciveLocal = useLocalization('liks')

  useEffect(() => {
    getLikes('')
  }, [])

  const sharedList = data?.data?.[activeTab] || []

  if(sharedList?.length === 0) {
    return <NoData />
  }

  const toggleExpand = (id: string) => {
    setExpandedIndex(expandedIndex === id ? null : id)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex  justify-center space-x-4 bg-white border-b mb-4 ">
        {['received', 'sent'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'received' | 'sent')}
            className={`px-5 py-2 w-full font-medium text-sm transition-all duration-200 shadow-sm
        ${activeTab === tab
                ? 'bg_primary text-white'
                : ' bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-700'
              }`}
          >
            {tab === 'received' ? sendreciveLocal.recivedBio : sendreciveLocal.sendedBio}
          </button>
        ))}
      </div>


      {/* Loading or No Data */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : sharedList.length === 0 ? (
        <div className="text-center text-gray-500">No {activeTab} biodatas found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedList.map((item: any) => {
            const profile = item?.profileShared
            const viewed = item?.isViewed
            const id = item?._id
            const isExpanded = expandedIndex === id

            const {
              fullName,
              maritalStatus,
              gender,
              dateOfBirth,
              height,
              weight,
            } = profile.personalDetails || {}

            const photo = profile.profilePhotos?.[0]
            const city = profile.contactDetails.presentAddress?.city
            const state = profile.contactDetails.presentAddress?.state
            const occupation = profile.professionalDetails.occupation
            const income = profile.professionalDetails.income


            return (
              <Link to={`/vlew-profile/${item?.profileShared?._id
                }`}
                key={id}
                className="relative bg-white rounded-xl shadow hover:shadow-md p-4 transition border border-gray-100"
              >
                {/* Viewed Badge */}
                {viewed && (
                  <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full animate-pulse">
                    Viewed
                  </span>
                )}

                {/* Top Section */}
                <div className="flex items-center space-x-4">
                  <img
                    src={photo}
                    alt={fullName}
                    className="w-16 h-16 object-cover rounded-full border"
                  />
                  <div>
                    <div className="font-semibold text-lg">{fullName}</div>
                    <div className="text-sm text-gray-600">
                      {maritalStatus} | {occupation}
                    </div>
                    <div className="text-sm text-gray-500">
                      {city}, {state}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
