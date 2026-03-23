import { Outlet, NavLink } from "react-router-dom";
import { Home, Stethoscope, BookOpen, Library, User } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "首页" },
  { path: "/diagnosis", icon: Stethoscope, label: "辨证" },
  { path: "/heritage", icon: BookOpen, label: "传承" },
  { path: "/classics", icon: Library, label: "古籍" },
  { path: "/profile", icon: User, label: "我的" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#EAEAEA] flex justify-center font-sans text-[#333333]">
      {/* Mobile App Container */}
      <div 
        className="w-full max-w-md bg-[#F8F9F5] h-screen relative shadow-2xl overflow-hidden flex flex-col"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="flex-1 pb-20 overflow-y-auto scrollbar-none relative">
          <Outlet />
        </div>
        
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#B8D8C8]/40 pb-safe shadow-[0_-2px_12px_rgba(45,90,74,0.08)] z-50">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                    isActive ? "text-[#2D5A4A]" : "text-[#B8D8C8] hover:text-[#2D5A4A]/70"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn("w-6 h-6", isActive ? "fill-[#E8F5F0]" : "")}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-[10px] font-medium tracking-wider">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
