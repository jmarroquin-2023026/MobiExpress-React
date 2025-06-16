import React from 'react'
import { Outlet } from 'react-router-dom'

export const DashboardContent = ({categories=[],getCategories}) => {
  return (
    <div>
      <Outlet context={{categories,getCategories}}/>
    </div>
  )
}

