import React, { useEffect, useState } from 'react'
import { useLazyGetLikesQuery } from '../../features/biodata/biodataApi'

export default function SharedLinks() {
  const [getLikes, { data, isLoading }] = useLazyGetLikesQuery()
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null)

  useEffect(() => {
    getLikes('')
  }, [])

  const sharedList = data?.data?.[activeTab] || []

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
            {tab === 'received' ? 'Received' : 'Sent'}
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
            const profile = item.profileShared
            const viewed = item.isViewed
            const id = item._id
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
              <div
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

                {/* Expandable content with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><span className="font-medium">Gender:</span> {gender}</div>
                    <div><span className="font-medium">DOB:</span> {new Date(dateOfBirth).toLocaleDateString()}</div>
                    <div><span className="font-medium">Height:</span> {height}</div>
                    <div><span className="font-medium">Weight:</span> {weight}</div>
                    <div><span className="font-medium">Income:</span> ₹{income}</div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {isExpanded ? 'Hide Details' : 'Show More'}
                  </button>
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 text-sm px-4 py-1.5 rounded-lg"
                    onClick={() =>
                      window.open(`/matrimony/view-profile/${profile._id}`, '_blank')
                    }
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
