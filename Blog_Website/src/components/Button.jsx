import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    clasName = '',
    ...props
// FIXME: classname spelling is wrong
}) {
  return (
<button className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${clasName}`}
{...props}>
    {children}
</button>  
)
}

export default Button