import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'

interface DashboardHeaderProps {
  onLogout: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-20 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <span className="text-xl font-semibold text-black">estaurantHub</span>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="flex items-center gap-2 border-black text-black hover:bg-black hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
