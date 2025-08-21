import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/Header"
import { DashboardBody } from "@/components/DashboardBody"
import { RestaurantModal } from "@/components/DashboardModal"
import type { Restaurant } from "@/utils/types/restaurant.type"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Service } from "@/services/service"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { logout } from "@/store/slices/userSlice"
import { ConfirmModal } from "@/components/ConfirmModal"


export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const userName = useSelector((state: RootState) => state.user.user?.username);
  const dispatch = useDispatch()

    useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await Service.getRestaurants()
        if (res.success) {
          setRestaurants(res.data) 
        } else {
          toast.error(res.message || "Failed to fetch restaurants")
        }
      } catch (error) {
        console.log("Fetch Error:", error)
        toast.error("Something went wrong while fetching restaurants")
      }
    }

    fetchRestaurants()
  }, [])

  const handleLogout = async() => {
    try {
      const res = await Service.logout()
      if(res.success){
        toast.success("Logout Success");
        dispatch(logout())
      }else{
        toast.error(res.message || "Logout Failed");
      }

    } catch (error) {
      toast.error("Logout Failed");
      console.log("Logout Error",error);
    }
  }

  const handleAddRestaurant = () => {
    setModalMode("add")
    setSelectedRestaurant(null)
    setIsModalOpen(true)
  }

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setModalMode("edit")
    setSelectedRestaurant(restaurant)
    setIsModalOpen(true)
  }

  const handleDeleteRestaurant = (id: number) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteRestaurant = async () => {
    if (!deleteId) return
    try {
      const res = await Service.deleteRestaurant(deleteId)
      if (res.success) {
        toast.success("Restaurant deleted successfully.")
        setRestaurants(restaurants.filter(r => r.id !== deleteId))
      } else {
        toast.error(res.message || "Failed to delete restaurant.")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete restaurant.")
    } finally {
      setIsDeleteModalOpen(false)
      setDeleteId(null)
    }
  }

  const handleSaveRestaurant = async (restaurantData: Omit<Restaurant, "id"> | Restaurant) => {
    try {
      let response;

      if (modalMode === "add") {

        response = await Service.addRestaurant(restaurantData as Omit<Restaurant, "id">);
      } else if (modalMode === "edit" && selectedRestaurant) {

        response = await Service.editRestaurant(selectedRestaurant.id, restaurantData as Omit<Restaurant, "id">);
      }

      if (!response?.success) {
        toast.error(response?.message || "Failed to save restaurant. Please try again.");
        return;
      }

      toast.success(
        modalMode === "add" ? "Restaurant added successfully." : "Restaurant updated successfully."
      );

      if (modalMode === "add") {
        setRestaurants([...restaurants, { ...(restaurantData as Restaurant), id: response.data.id }]);
      } else if (modalMode === "edit" && selectedRestaurant) {
        setRestaurants(
          restaurants.map(r => 
            r.id === selectedRestaurant.id ? { ...selectedRestaurant, ...(restaurantData as Restaurant) } : r
          )
        );
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to save restaurant. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader onLogout={() => setIsLogoutModalOpen(true)} />

      <DashboardBody
        userName={userName!}
        restaurants={restaurants}
        onAddRestaurant={handleAddRestaurant}
        onEditRestaurant={handleEditRestaurant}
        onDeleteRestaurant={handleDeleteRestaurant}
      />

      <RestaurantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRestaurant}
        restaurant={selectedRestaurant}
        mode={modalMode}
      />

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteRestaurant}
        title="Delete Confirmation"
        description="Are you sure you want to delete this restaurant? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}
