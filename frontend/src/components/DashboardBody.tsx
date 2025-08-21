import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Restaurant } from "@/utils/types/restaurant.type"
import { Plus, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react"

interface DashboardBodyProps {
  userName: string
  restaurants: Restaurant[]
  onAddRestaurant: () => void
  onEditRestaurant: (restaurant: Restaurant) => void
  onDeleteRestaurant: (id: number) => void
}

export function DashboardBody({
  userName,
  restaurants,
  onAddRestaurant,
  onEditRestaurant,
  onDeleteRestaurant,
}: DashboardBodyProps) {
  return (
    <main className="flex-1 bg-gray-50 p-6 mx-30">
      {/* Hero Section */}
      <div className="mb-8">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Welcome back, {userName.toUpperCase()}!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-black">{restaurants.length}</div>
              <div className="text-gray-600">Restaurant{restaurants.length !== 1 ? "s" : ""} available</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Management Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Your Restaurants</h2>
          <Button onClick={onAddRestaurant} className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Restaurant
          </Button>
        </div>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-black font-semibold">Name</TableHead>
                  <TableHead className="text-black font-semibold">Address</TableHead>
                  <TableHead className="text-black font-semibold">Phone</TableHead>
                  <TableHead className="text-black font-semibold">Email</TableHead>
                  <TableHead className="text-black font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restaurants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No restaurants found. Add your first restaurant to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id} className="border-gray-200">
                      <TableCell className="font-medium text-black">{restaurant.name}</TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {restaurant.address}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {restaurant.phone}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {restaurant.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditRestaurant(restaurant)}
                            className="border-gray-300 text-gray-600 hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDeleteRestaurant(restaurant.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
