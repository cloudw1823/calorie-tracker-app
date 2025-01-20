import { FoodInfo } from '@/lib/types'
interface FoodInfoCardProps {
    title: string
    foodList: FoodInfo[]
    unit?: string
}

export default function FoodInfoCard({
    title,
    foodList,
    unit,
}: FoodInfoCardProps) {
    return (
        <div
            className={`relative p-4 rounded-lg bg-white border-gray-100 shadow-md`}
        >
            <h2 className="text-lg font-semibold text-main-key-color1">
                {title}
            </h2>
            <h2 className="text-lg font-semibold text-gray-400">
                {foodList.map((item) => item.foodName).join(',')}
            </h2>
            <div className="text-xl font-bold text-gray-900 flex items-baseline">
                <span>
                    {foodList.reduce((sum, item) => {
                        return sum + item.calories * item.count
                    }, 0)}
                </span>
                {unit && (
                    <span className="ml-1 text-sm text-gray-500">{unit}</span>
                )}
            </div>
        </div>
    )
}
