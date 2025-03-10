import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  Home,
  Edit,
  List,
  Server,
  MessageSquareDot,
  LifeBuoy,
} from "lucide-react";
const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar component */}
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" link="/Dashboard" />
        <SidebarItem
          icon={<Edit size={20} />}
          text="Create Flashcard"
          link="/create"
        />
        <SidebarItem
          icon={<List size={20} />}
          text="Create Category"
          link="/category"
        />
        <SidebarItem
          icon={<List size={20} />}
          text="Create Subcategory"
          link="/subcategory"
        />
        <SidebarItem
          icon={<Server size={20} />}
          text="Manage Flashcards"
          link="/flashcardmanage"
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Edit size={20} />}
          text="Create Quiz"
          link="/quiz"
        />
        <SidebarItem
          icon={<List size={20} />}
          text="Create Category"
          link="/quizcategory"
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<MessageSquareDot size={20} />}
          text="Feedback"
          link="/Feedback"
        />
        
      </Sidebar>
      <div className="flex-grow overflow-auto px-4 py-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
