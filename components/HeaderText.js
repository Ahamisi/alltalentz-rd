import React from 'react'

const HeaderText = ({bold, variant,children,otherCSS }) => {
  return (
    <h3 className={`${bold ? 'font-bold' : 'font-normal'} ${variant == 'h1' ? 'text-[65px] leading-[80px] font-[700]' : (variant == 'h2' ? 'text-[65px] leading-[80px]' : 'text-[45px] leading-[60px]') } ${otherCSS} `}>
        {children}
    </h3>
  )
}

export default HeaderText
