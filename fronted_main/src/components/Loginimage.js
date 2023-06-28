import React from 'react'

const Loginimage = ({src}) => {
  return (
    <div className="right_data mt-5" style={{ width: "100%" }}>
    <div className="sign_img mt-5">
      <img src={src} style={{ maxWidth: 400 }} alt="" />
    </div>
  </div>
  )
}

export default Loginimage

