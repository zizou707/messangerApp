import { IconType } from "react-icons"

interface AuthSocialButtonProps {
  icon : IconType,
  onClick: () => void
}

const  AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
  return (
    <button
     type="button" 
     onClick={onClick}
     className="
     inline-flex
     w-full
     justify-center
     rounded-md
     bg-white
     px-4
     py-2
     text-gray-500
     shodow-sm
     ring-1
     ring-inset
     ring-gray-300
     hover : bg-gray-50
     focus: outline-offset-0
     "
   >
     <Icon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
   </button>
  )
}

export default AuthSocialButton