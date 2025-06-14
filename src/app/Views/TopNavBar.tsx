import { Bell, PersonStandingIcon} from "lucide-react";
import { useState } from "react";

const TopNavbar = () => {

  const [isNotificationTabOpen, setIsNotificationTabOpen] = 
useState(false);
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(false);

  function NotificationClick(){
    console.log("Notifications")

    setIsNotificationTabOpen(!isNotificationTabOpen)
    setIsProfileTabOpen(false)

  }

  function handleProfileClick(){
      setIsProfileTabOpen(!isProfileTabOpen)
    /* if(isProfileTabOPen == true){
        setProfile(true)
        setNotificationTab(false)

    }
    else{
      setProfile(false)

    }
 */
  }

  return (
    <nav className="sticky top-0 left-0 w-full h-14 bg-white border-b 
border-gray-200 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 
max-w-4xl mx-auto">
        {/* Notification icon on the left */}
        <button className="p-2 rounded-lg hover:bg-gray-100 
transition-colors duration-200 relative" onClick={NotificationClick}>
          <Bell size={20} className="text-gray-600" />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 
rounded-full border-2 border-white"></span>
        </button>
        
        {/* Circled T on the right */}
        <button className="w-8 h-8 bg-blue-500 rounded-full flex 
items-center justify-center hover:bg-blue-600 transition-colors 
duration-200" onClick={handleProfileClick}>
          <span className="text-white font-semibold text-sm">T</span>
        </button>
      </div>

      {
        isNotificationTabOpen && (
          <div className="text-black h-3.5 w-2.5 left-0 top-0.5"> 

          <div className="flex text-black">
           <PersonStandingIcon size={20} className="h-2 w-1 text-black 
bg-amber-200"/>
           <h2>Notification</h2>
          </div>



          </div>
        )
      }

      {
        isProfileTabOpen && (
          <div className="text-black h-3.5 w-2.5 left-0 top-0.5"> 

          <div className="flex text-black">
           <PersonStandingIcon size={20} className="h-2 w-1 text-black 
bg-amber-200"/>
           <h2>Profile</h2>
          </div>



          </div>
        )
      }

    </nav>
  );
};

export default TopNavbar;
