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
    <div className="min-h-screen bg-[#e8e2d9] flex justify-center font-serif text-[#2c2416]">
      {/* Mobile App Container */}
      <div 
        className="w-full max-w-md bg-[#f5f1eb] h-screen relative shadow-2xl overflow-hidden flex flex-col"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="flex-1 pb-20 overflow-y-auto scrollbar-none relative">
          <Outlet />
        </div>
        
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#8b7355]/20 pb-safe shadow-[0_-2px_12px_rgba(44,36,22,0.08)] z-50">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                    isActive ? "text-[#8b7355]" : "text-[#9b8b7e] hover:text-[#6b5d4f]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn("w-6 h-6", isActive ? "fill-[#8b7355]/20" : "")}
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
