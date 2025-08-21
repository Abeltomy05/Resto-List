import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { Restaurant } from "@/utils/types/restaurant.type"
import { validateRestaurant } from "@/utils/validation/crud.validation"

interface RestaurantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (restaurant: { name: string; address: string; phone: string; email: string }) => Promise<void> | void
  restaurant?: Restaurant | null
  mode: "add" | "edit"
}

export function RestaurantModal({ isOpen, onClose, onSave, restaurant, mode }: RestaurantModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (mode === "edit" && restaurant) {
      setFormData({
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        email: restaurant.email,
      })
    } else {
      setFormData({ name: "", address: "", phone: "", email: "" })
    }
    setErrors({})
  }, [mode, restaurant, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleaned = {
      ...formData,
      phone: formData.phone.trim(),
      name: formData.name.trim(),
      address: formData.address.trim(),
      email: formData.email.trim(),
    }

    const result = validateRestaurant(cleaned)

    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    await onSave(result.value)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">{mode === "add" ? "Add New Restaurant" : "Edit Restaurant"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-black">Restaurant Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter restaurant name"
              className={`border-gray-300 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-black">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter restaurant address"
              className={`border-gray-300 ${errors.address ? "border-red-500" : ""}`}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="10-digit number"
              className={`border-gray-300 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              className={`border-gray-300 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800">
              {mode === "add" ? "Add Restaurant" : "Update Restaurant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
